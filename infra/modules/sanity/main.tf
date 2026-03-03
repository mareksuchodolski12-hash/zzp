terraform {
  required_version = ">= 1.7.0"
}

variable "sanity_auth_token" {
  description = "Sanity API authentication token"
  type        = string
  sensitive   = true
}

variable "project_name" {
  description = "Sanity project display name"
  type        = string
}

variable "organization_id" {
  description = "Sanity organization ID"
  type        = string
  default     = ""
}

resource "terraform_data" "sanity_project" {
  input = {
    auth_token   = var.sanity_auth_token
    project_name = var.project_name
  }

  provisioner "local-exec" {
    command = <<-EOT
      curl -sf -X POST "https://api.sanity.io/v2021-06-07/projects" \
        -H "Authorization: Bearer ${var.sanity_auth_token}" \
        -H "Content-Type: application/json" \
        -d '{"displayName": "${var.project_name}"}' \
        > /tmp/sanity_project_${replace(var.project_name, " ", "_")}.json
    EOT
  }
}

output "project_name" {
  value = var.project_name
}
