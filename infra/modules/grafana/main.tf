terraform {
  required_version = ">= 1.7.0"
  required_providers {
    grafana = {
      source  = "grafana/grafana"
      version = "~> 3.7"
    }
  }
}

variable "grafana_cloud_api_key" {
  description = "Grafana Cloud API key"
  type        = string
  sensitive   = true
}

variable "grafana_cloud_org" {
  description = "Grafana Cloud organisation slug"
  type        = string
}

variable "stack_name" {
  description = "Grafana Cloud stack name"
  type        = string
}

provider "grafana" {
  cloud_api_key = var.grafana_cloud_api_key
}

resource "grafana_cloud_stack" "this" {
  name        = var.stack_name
  slug        = var.stack_name
  region_slug = "eu"
}

output "grafana_url" {
  value = grafana_cloud_stack.this.url
}

output "stack_id" {
  value = grafana_cloud_stack.this.id
}
