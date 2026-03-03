# SOPS + age secrets management module
# This module sets up the SOPS configuration for encrypting secrets with age.

terraform {
  required_version = ">= 1.7.0"
}

variable "age_public_keys" {
  description = "List of age public keys to encrypt secrets for"
  type        = list(string)
}

variable "project_name" {
  description = "Project name for SOPS file naming"
  type        = string
}

# Generate a .sops.yaml config file
resource "local_file" "sops_config" {
  filename = "${path.root}/.sops.yaml"
  content  = templatefile("${path.module}/templates/sops.yaml.tpl", {
    age_keys     = var.age_public_keys
    project_name = var.project_name
  })
}

output "sops_config_path" {
  value = local_file.sops_config.filename
}
