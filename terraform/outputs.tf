output "swa_url" {
  description = "Default hostname of the Static Web App"
  value       = "https://${azurerm_static_web_app.swa.default_host_name}"
}

output "swa_api_key" {
  description = "Deployment token — set this as GitHub Secret AZURE_STATIC_WEB_APPS_API_TOKEN"
  value       = azurerm_static_web_app.swa.api_key
  sensitive   = true
}
