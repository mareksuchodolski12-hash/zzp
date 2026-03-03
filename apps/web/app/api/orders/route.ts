import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createOrder } from '@/lib/orders';

const CreateOrderSchema = z.object({
  plan: z.enum(['starter', 'professional', 'business']),
  template: z.enum(['business', 'freelancer', 'portfolio']),
  businessName: z.string().min(2).max(100),
  fullName: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().min(10).max(20),
  domain: z.string().min(3).max(100),
  description: z.string().max(1000).optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = CreateOrderSchema.parse(body);

    const order = await createOrder(data);

    return NextResponse.json(
      { success: true, orderId: order.id, paymentUrl: order.paymentUrl },
      { status: 201 },
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, errors: error.flatten().fieldErrors },
        { status: 400 },
      );
    }
    console.error('[POST /api/orders]', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ success: false, message: 'Missing order id' }, { status: 400 });
  }

  try {
    const { getOrder } = await import('@/lib/orders');
    const order = await getOrder(id);

    if (!order) {
      return NextResponse.json({ success: false, message: 'Order not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, order });
  } catch (error) {
    console.error('[GET /api/orders]', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}
