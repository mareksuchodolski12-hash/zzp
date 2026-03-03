terraform {
  required_version = ">= 1.7.0"
  required_providers {
    vercel = {
      source  = "vercel/vercel"
      version = "~> 1.14"
    }
  }
}

variable "vercel_api_token" {
  description = "Vercel API token"
  type        = string
  sensitive   = true
}

variable "project_name" {
  description = "Vercel project name"
  type        = string
}

variable "framework" {
  description = "Framework type"
  type        = string
  default     = "nextjs"
}

variable "team_id" {
  description = "Vercel team ID"
  type        = string
  default     = ""
}

variable "environment_variables" {
  description = "Map of environment variables to set on the Vercel project"
  type        = map(string)
  default     = {}
  sensitive   = true
}

provider "vercel" {
  api_token = var.vercel_api_token
  team      = var.team_id != "" ? var.team_id : null
}

resource "vercel_project" "this" {
  name      = var.project_name
  framework = var.framework
}

resource "vercel_project_environment_variable" "vars" {
  for_each   = var.environment_variables
  project_id = vercel_project.this.id
  key        = each.key
  value      = each.value
  target     = ["production", "preview"]
}

output "project_id" {
  value = vercel_project.this.id
}

output "project_name" {
  value = vercel_project.this.name
}
