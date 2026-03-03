terraform {
  required_version = ">= 1.7.0"
  required_providers {
    http = {
      source  = "hashicorp/http"
      version = "~> 3.4"
    }
  }
}

variable "neon_api_key" {
  description = "Neon API key"
  type        = string
  sensitive   = true
}

variable "project_name" {
  description = "Neon project name"
  type        = string
}

variable "region" {
  description = "Neon region"
  type        = string
  default     = "aws-eu-west-1"
}

variable "database_name" {
  description = "PostgreSQL database name"
  type        = string
  default     = "zzp"
}

# Neon does not have an official Terraform provider yet.
# We use the REST API via null_resource with local-exec.
resource "terraform_data" "neon_project" {
  input = {
    api_key      = var.neon_api_key
    project_name = var.project_name
    region       = var.region
    db_name      = var.database_name
  }

  provisioner "local-exec" {
    command = <<-EOT
      curl -sf -X POST "https://console.neon.tech/api/v2/projects" \
        -H "Authorization: Bearer ${var.neon_api_key}" \
        -H "Content-Type: application/json" \
        -d '{
          "project": {
            "name": "${var.project_name}",
            "region_id": "${var.region}",
            "pg_version": 16
          }
        }' > /tmp/neon_project_${var.project_name}.json
    EOT
  }
}

output "project_name" {
  value = var.project_name
}
