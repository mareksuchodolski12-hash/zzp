import { NextRequest, NextResponse } from 'next/server';
import { processMollieWebhook } from '@/lib/payments';

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const params = new URLSearchParams(body);
    const paymentId = params.get('id');

    if (!paymentId) {
      return NextResponse.json({ success: false, message: 'Missing payment id' }, { status: 400 });
    }

    await processMollieWebhook(paymentId);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[POST /api/payments/webhook]', error);
    // Return 200 to prevent Mollie from retrying on non-critical errors
    return NextResponse.json({ success: false, message: 'Webhook processing failed' });
  }
}
