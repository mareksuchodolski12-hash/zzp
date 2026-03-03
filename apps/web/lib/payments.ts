import { getMolliePayment, getOrder, updateOrderStatus } from './orders';

export async function processMollieWebhook(paymentId: string): Promise<void> {
  const payment = await getMolliePayment(paymentId);

  const orderId = payment.metadata?.orderId;
  if (!orderId) {
    console.warn(`[webhook] Payment ${paymentId} has no orderId in metadata`);
    return;
  }

  switch (payment.status) {
    case 'paid': {
      await updateOrderStatus(orderId, 'paid');
      // Trigger provisioning workflow
      await triggerProvisioning(orderId);
      break;
    }
    case 'failed':
    case 'canceled':
    case 'expired': {
      await updateOrderStatus(orderId, 'failed');
      break;
    }
    case 'refunded': {
      await updateOrderStatus(orderId, 'refunded');
      break;
    }
    default:
      break;
  }
}

async function triggerProvisioning(orderId: string): Promise<void> {
  const order = await getOrder(orderId);
  if (!order) {
    throw new Error(`Order ${orderId} not found`);
  }

  const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/deployments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.INTERNAL_API_SECRET}`,
    },
    body: JSON.stringify({
      orderId,
      template: order.template,
      domain: order.domain,
      clientData: {
        businessName: order.businessName,
        fullName: order.fullName,
        email: order.email,
        phone: order.phone,
        description: order.description,
      },
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to trigger provisioning for order ${orderId}: ${error}`);
  }
}
