import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { triggerDeployment } from '@/lib/deployments';
import { resolveModeratorToken } from '@/lib/utils';

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

const AUTH_FAILURE_WINDOW_MS = 60_000;
const AUTH_FAILURE_MAX_LOGS_PER_WINDOW = 5;
let authFailureWindowStart = 0;
let authFailureLogCount = 0;

function logAuthFailure(request: NextRequest, method: 'POST' | 'GET') {
  const now = Date.now();
  if (now - authFailureWindowStart > AUTH_FAILURE_WINDOW_MS) {
    authFailureWindowStart = now;
    authFailureLogCount = 0;
  }
  if (authFailureLogCount < AUTH_FAILURE_MAX_LOGS_PER_WINDOW) {
    authFailureLogCount += 1;
    console.warn(`[${method} /api/deployments] Unauthorized access attempt`, {
      ip: request.headers.get('x-forwarded-for') ?? 'unknown',
      userAgent: request.headers.get('user-agent') ?? 'unknown',
    });
  }
}

export async function POST(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  let moderatorToken: string;
  try {
    moderatorToken = resolveModeratorToken();
  } catch (error) {
    console.error('[POST /api/deployments] Missing moderator token configuration', error);
    return NextResponse.json({ success: false, message: 'Service temporarily unavailable' }, { status: 503 });
  }
  if (authHeader !== `Bearer ${moderatorToken}`) {
    logAuthFailure(request, 'POST');
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
  let moderatorToken: string;
  try {
    moderatorToken = resolveModeratorToken();
  } catch (error) {
    console.error('[GET /api/deployments] Missing moderator token configuration', error);
    return NextResponse.json({ success: false, message: 'Service temporarily unavailable' }, { status: 503 });
  }
  if (authHeader !== `Bearer ${moderatorToken}`) {
    logAuthFailure(request, 'GET');
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
