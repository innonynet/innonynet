output "swa_url" {
  description = "Default hostname of the Static Web App"
  value       = "https://${azurerm_static_web_app.swa.default_host_name}"
}

output "swa_api_key" {
  description = "Deployment token — set this as GitHub Secret AZURE_STATIC_WEB_APPS_API_TOKEN"
  value       = azurerm_static_web_app.swa.api_key
  sensitive   = true
}

output "apex_validation_token" {
  description = "TXT record value for innonynet.com — set as: _dnsauth.innonynet.com TXT <value>"
  value       = azurerm_static_web_app_custom_domain.apex.validation_token
}
