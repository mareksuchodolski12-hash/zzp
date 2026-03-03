import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { triggerDeployment } from '@/lib/deployments';

const DeploymentSchema = z.object({
  orderId: z.string().uuid(),
  template: z.enum(['business', 'freelancer', 'portfolio']),
  domain: z.string().min(3),
  clientData: z.object({
    businessName: z.string(),
    fullName: z.string(),
    email: z.string().email(),
    phone: z.string(),
    description: z.string().optional(),
  }),
});

export async function POST(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.INTERNAL_API_SECRET}`) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const data = DeploymentSchema.parse(body);

    const deployment = await triggerDeployment(data);

    return NextResponse.json({ success: true, deployment }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, errors: error.flatten().fieldErrors },
        { status: 400 },
      );
    }
    console.error('[POST /api/deployments]', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.INTERNAL_API_SECRET}`) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const orderId = searchParams.get('orderId');

  if (!orderId) {
    return NextResponse.json({ success: false, message: 'Missing orderId' }, { status: 400 });
  }

  try {
    const { getDeploymentByOrderId } = await import('@/lib/deployments');
    const deployment = await getDeploymentByOrderId(orderId);

    return NextResponse.json({ success: true, deployment });
  } catch (error) {
    console.error('[GET /api/deployments]', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}
