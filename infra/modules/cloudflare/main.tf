terraform {
  required_version = ">= 1.7.0"
  required_providers {
    cloudflare = {
      source  = "cloudflare/cloudflare"
      version = "~> 4.49"
    }
  }
}

variable "cloudflare_api_token" {
  description = "Cloudflare API token"
  type        = string
  sensitive   = true
}

variable "zone_id" {
  description = "Cloudflare zone ID"
  type        = string
}

variable "domain" {
  description = "Domain name"
  type        = string
}

variable "vercel_cname_target" {
  description = "CNAME target for Vercel"
  type        = string
  default     = "cname.vercel-dns.com"
}

provider "cloudflare" {
  api_token = var.cloudflare_api_token
}

resource "cloudflare_record" "root" {
  zone_id = var.zone_id
  name    = "@"
  value   = var.vercel_cname_target
  type    = "CNAME"
  proxied = true
}

resource "cloudflare_record" "www" {
  zone_id = var.zone_id
  name    = "www"
  value   = var.vercel_cname_target
  type    = "CNAME"
  proxied = true
}

# Enable HTTPS always redirect
resource "cloudflare_zone_settings_override" "ssl" {
  zone_id = var.zone_id
  settings {
    ssl                      = "full"
    always_use_https         = "on"
    min_tls_version          = "1.2"
    automatic_https_rewrites = "on"
    opportunistic_encryption = "on"
  }
}

output "domain" {
  value = var.domain
}

output "nameservers" {
  value = cloudflare_zone_settings_override.ssl.id
}
