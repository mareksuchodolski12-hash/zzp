import { beforeEach, describe, expect, it, vi } from 'vitest';
import { processMollieWebhook } from '../lib/payments';

const { getMolliePaymentMock, updateOrderStatusMock, getOrderMock } = vi.hoisted(() => ({
  getMolliePaymentMock: vi.fn(),
  updateOrderStatusMock: vi.fn(),
  getOrderMock: vi.fn(),
}));

vi.mock('../lib/orders', () => ({
  getMolliePayment: getMolliePaymentMock,
  updateOrderStatus: updateOrderStatusMock,
  getOrder: getOrderMock,
}));

describe('processMollieWebhook', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    process.env.NEXT_PUBLIC_APP_URL = 'https://example.com';
    process.env.INTERNAL_API_SECRET = 'secret-token';
  });

  it('sends full deployment payload for paid orders', async () => {
    getMolliePaymentMock.mockResolvedValue({
      status: 'paid',
      metadata: { orderId: 'f5c33f7e-a32e-42ce-bf92-f6d9d66f8f5b' },
    });
    getOrderMock.mockResolvedValue({
      id: 'f5c33f7e-a32e-42ce-bf92-f6d9d66f8f5b',
      template: 'business',
      domain: 'acme.nl',
      businessName: 'Acme',
      fullName: 'Jan Jansen',
      email: 'jan@acme.nl',
      phone: '+31612345678',
      description: 'Consultancy',
    });
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
      }),
    );

    await processMollieWebhook('tr_test');

    expect(updateOrderStatusMock).toHaveBeenCalledWith('f5c33f7e-a32e-42ce-bf92-f6d9d66f8f5b', 'paid');
    expect(fetch).toHaveBeenCalledWith(
      'https://example.com/api/deployments',
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({
          Authorization: 'Bearer secret-token',
        }),
        body: JSON.stringify({
          orderId: 'f5c33f7e-a32e-42ce-bf92-f6d9d66f8f5b',
          template: 'business',
          domain: 'acme.nl',
          clientData: {
            businessName: 'Acme',
            fullName: 'Jan Jansen',
            email: 'jan@acme.nl',
            phone: '+31612345678',
            description: 'Consultancy',
          },
        }),
      }),
    );
  });

  it('throws when order cannot be loaded for provisioning', async () => {
    getMolliePaymentMock.mockResolvedValue({
      status: 'paid',
      metadata: { orderId: 'f5c33f7e-a32e-42ce-bf92-f6d9d66f8f5b' },
    });
    getOrderMock.mockResolvedValue(null);
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
      }),
    );

    await expect(processMollieWebhook('tr_test')).rejects.toThrow(
      'Order f5c33f7e-a32e-42ce-bf92-f6d9d66f8f5b not found',
    );
  });
});
