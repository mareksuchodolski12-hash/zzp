export type OrderPlan = 'starter' | 'professional' | 'business';
export type TemplateType = 'business' | 'freelancer' | 'portfolio';
export type OrderStatus =
  | 'pending'
  | 'paid'
  | 'provisioning'
  | 'deployed'
  | 'failed'
  | 'refunded';

export interface CreateOrderInput {
  plan: OrderPlan;
  template: TemplateType;
  businessName: string;
  fullName: string;
  email: string;
  phone: string;
  domain: string;
  description?: string;
}

export interface Order {
  id: string;
  plan: OrderPlan;
  template: TemplateType;
  businessName: string;
  fullName: string;
  email: string;
  phone: string;
  domain: string;
  description?: string;
  status: OrderStatus;
  paymentId?: string;
  paymentUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

const PLAN_PRICES: Record<OrderPlan, number> = {
  starter: 29900,
  professional: 49900,
  business: 79900,
};

export async function createOrder(input: CreateOrderInput): Promise<Order> {
  const price = PLAN_PRICES[input.plan];

  // Create payment via Mollie
  const payment = await createMolliePayment({
    amount: { value: (price / 100).toFixed(2), currency: 'EUR' },
    description: `ZZP Website - ${input.plan} plan - ${input.businessName}`,
    redirectUrl: `${process.env.NEXT_PUBLIC_APP_URL}/order/success`,
    webhookUrl: `${process.env.NEXT_PUBLIC_APP_URL}/api/payments/webhook`,
    metadata: {
      plan: input.plan,
      template: input.template,
      businessName: input.businessName,
      email: input.email,
      domain: input.domain,
    },
  });

  const order: Order = {
    id: payment.metadata?.orderId ?? crypto.randomUUID(),
    ...input,
    status: 'pending',
    paymentId: payment.id,
    paymentUrl: payment._links.checkout.href,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  // Persist to database
  await persistOrder(order);

  return order;
}

export async function getOrder(id: string): Promise<Order | null> {
  return fetchOrderFromDb(id);
}

export async function updateOrderStatus(id: string, status: OrderStatus): Promise<void> {
  await updateOrderInDb(id, { status, updatedAt: new Date() });
}

// ---------------------------------------------------------------------------
// Mollie integration helpers
// ---------------------------------------------------------------------------

interface MolliePaymentInput {
  amount: { value: string; currency: string };
  description: string;
  redirectUrl: string;
  webhookUrl: string;
  metadata: Record<string, string>;
}

interface MolliePayment {
  id: string;
  status: string;
  metadata?: Record<string, string>;
  _links: { checkout: { href: string } };
}

async function createMolliePayment(input: MolliePaymentInput): Promise<MolliePayment> {
  const response = await fetch('https://api.mollie.com/v2/payments', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.MOLLIE_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Mollie API error: ${error}`);
  }

  return response.json();
}

export async function getMolliePayment(paymentId: string): Promise<MolliePayment> {
  const response = await fetch(`https://api.mollie.com/v2/payments/${paymentId}`, {
    headers: {
      Authorization: `Bearer ${process.env.MOLLIE_API_KEY}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch Mollie payment ${paymentId}`);
  }

  return response.json();
}

// ---------------------------------------------------------------------------
// Database helpers (uses Neon/Supabase via environment DATABASE_URL)
// ---------------------------------------------------------------------------

async function persistOrder(order: Order): Promise<void> {
  const { neon } = await import('@neondatabase/serverless');
  const sql = neon(process.env.DATABASE_URL!);

  await sql`
    INSERT INTO orders (
      id, plan, template, business_name, full_name, email, phone,
      domain, description, status, payment_id, payment_url, created_at, updated_at
    ) VALUES (
      ${order.id}, ${order.plan}, ${order.template}, ${order.businessName},
      ${order.fullName}, ${order.email}, ${order.phone}, ${order.domain},
      ${order.description ?? null}, ${order.status}, ${order.paymentId ?? null},
      ${order.paymentUrl ?? null}, ${order.createdAt.toISOString()},
      ${order.updatedAt.toISOString()}
    )
  `;
}

async function fetchOrderFromDb(id: string): Promise<Order | null> {
  const { neon } = await import('@neondatabase/serverless');
  const sql = neon(process.env.DATABASE_URL!);

  const rows = await sql`SELECT * FROM orders WHERE id = ${id} LIMIT 1`;

  if (!rows.length) return null;

  const row = rows[0];
  return {
    id: row.id,
    plan: row.plan,
    template: row.template,
    businessName: row.business_name,
    fullName: row.full_name,
    email: row.email,
    phone: row.phone,
    domain: row.domain,
    description: row.description,
    status: row.status,
    paymentId: row.payment_id,
    paymentUrl: row.payment_url,
    createdAt: new Date(row.created_at),
    updatedAt: new Date(row.updated_at),
  };
}

async function updateOrderInDb(id: string, updates: Partial<Order>): Promise<void> {
  const { neon } = await import('@neondatabase/serverless');
  const sql = neon(process.env.DATABASE_URL!);

  await sql`
    UPDATE orders SET
      status = ${updates.status ?? null},
      updated_at = ${updates.updatedAt?.toISOString() ?? new Date().toISOString()}
    WHERE id = ${id}
  `;
}
