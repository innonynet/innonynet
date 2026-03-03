terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 4.0"
    }
  }
}

provider "azurerm" {
  features {}
  subscription_id = var.subscription_id
}

resource "azurerm_resource_group" "rg" {
  name     = var.resource_group_name
  location = var.location
}

resource "azurerm_static_web_app" "swa" {
  name                = var.swa_name
  resource_group_name = azurerm_resource_group.rg.name
  location            = azurerm_resource_group.rg.location
  sku_tier            = "Free"
  sku_size            = "Free"
}

# Apex domain (innonynet.com)
# DNS: TXT record  _dnsauth.innonynet.com → validationToken (see outputs)
# DNS: ALIAS/ANAME innonynet.com          → polite-meadow-09963ef00.1.azurestaticapps.net
resource "azurerm_static_web_app_custom_domain" "apex" {
  static_web_app_id = azurerm_static_web_app.swa.id
  domain_name       = "innonynet.com"
  validation_type   = "dns-txt-token"
}

# www subdomain (www.innonynet.com)
# DNS: CNAME www.innonynet.com → polite-meadow-09963ef00.1.azurestaticapps.net
resource "azurerm_static_web_app_custom_domain" "www" {
  static_web_app_id = azurerm_static_web_app.swa.id
  domain_name       = "www.innonynet.com"
  validation_type   = "cname-delegation"

  depends_on = [azurerm_static_web_app_custom_domain.apex]
}
