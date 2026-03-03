variable "subscription_id" {
  description = "Azure Subscription ID"
  type        = string
}

variable "resource_group_name" {
  description = "Resource group name"
  type        = string
  default     = "rg-innonynet"
}

variable "location" {
  description = "Azure region"
  type        = string
  default     = "eastasia"
}

variable "swa_name" {
  description = "Static Web App resource name"
  type        = string
  default     = "innonynet"
}
