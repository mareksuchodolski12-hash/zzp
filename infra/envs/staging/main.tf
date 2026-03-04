terraform {
  required_version = ">= 1.7.0"
  backend "s3" {
    bucket  = "zzp-terraform-state"
    key     = "staging/terraform.tfstate"
    region  = "eu-west-1"
    encrypt = true
  }
}

variable "vercel_api_token" {
  type      = string
  sensitive = true
}
variable "cloudflare_api_token" {
  type      = string
  sensitive = true
}
variable "cloudflare_zone_id" {
  type = string
}
variable "neon_api_key" {
  type      = string
  sensitive = true
}
variable "grafana_cloud_api_key" {
  type      = string
  sensitive = true
}
variable "grafana_cloud_org" {
  type = string
}
variable "age_public_keys" {
  type = list(string)
}

module "vercel" {
  source           = "../../modules/vercel"
  vercel_api_token = var.vercel_api_token
  project_name     = "zzp-web-staging"
  environment_variables = {
    NODE_ENV = "staging"
  }
}

module "cloudflare" {
  source               = "../../modules/cloudflare"
  cloudflare_api_token = var.cloudflare_api_token
  zone_id              = var.cloudflare_zone_id
  domain               = "staging.zzp-platform.nl"
}

module "neon" {
  source        = "../../modules/neon"
  neon_api_key  = var.neon_api_key
  project_name  = "zzp-staging"
  region        = "aws-eu-west-1"
  database_name = "zzp_staging"
}

module "grafana" {
  source                = "../../modules/grafana"
  grafana_cloud_api_key = var.grafana_cloud_api_key
  grafana_cloud_org     = var.grafana_cloud_org
  stack_name            = "zzp-staging"
}

module "sops" {
  source          = "../../modules/sops"
  age_public_keys = var.age_public_keys
  project_name    = "zzp-staging"
}
