-- ZZP Platform Database Schema
-- Run this migration once to set up the initial database structure

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  plan          VARCHAR(20)  NOT NULL CHECK (plan IN ('starter', 'professional', 'business')),
  template      VARCHAR(20)  NOT NULL CHECK (template IN ('business', 'freelancer', 'portfolio')),
  business_name VARCHAR(100) NOT NULL,
  full_name     VARCHAR(100) NOT NULL,
  email         VARCHAR(254) NOT NULL,
  phone         VARCHAR(20)  NOT NULL,
  domain        VARCHAR(100) NOT NULL,
  description   TEXT,
  status        VARCHAR(20)  NOT NULL DEFAULT 'pending'
                  CHECK (status IN ('pending', 'paid', 'provisioning', 'deployed', 'failed', 'refunded')),
  payment_id    VARCHAR(100),
  payment_url   TEXT,
  created_at    TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS orders_status_idx ON orders(status);
CREATE INDEX IF NOT EXISTS orders_email_idx ON orders(email);
CREATE INDEX IF NOT EXISTS orders_payment_id_idx ON orders(payment_id);

-- Deployments table
CREATE TABLE IF NOT EXISTS deployments (
  id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id              UUID        NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  vercel_project_id     VARCHAR(100),
  vercel_deployment_id  VARCHAR(100),
  url                   TEXT,
  status                VARCHAR(20) NOT NULL DEFAULT 'queued'
                          CHECK (status IN ('queued', 'building', 'ready', 'error')),
  created_at            TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at            TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS deployments_order_id_idx ON deployments(order_id);
CREATE INDEX IF NOT EXISTS deployments_status_idx ON deployments(status);

-- Auto-update updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS orders_updated_at ON orders;
CREATE TRIGGER orders_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS deployments_updated_at ON deployments;
CREATE TRIGGER deployments_updated_at
  BEFORE UPDATE ON deployments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
