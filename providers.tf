    # 1. Specify the version of the AzureRM Provider to use

terraform {
  required_providers {
    azurerm = {
      source = "hashicorp/azurerm"
      version = "=4.18.0"
    }
  }
}


# 2.configure Microsoft Azure Provider


provider "azurerm" {
  features {}
  subscription_id ="46382bec-dd3a-4ce6-a08d-80efbf05df56"
  tenant_id="5cd44fa7-2785-4b6a-b6b1-8d51a9107226"
  client_id="63f6fd5c-5582-47a0-babf-2a78558580f7"
  client_secret="04q8Q~cxsZizSzoa8-pG_2g~3O3tR2Zr~OcMcbnQ"


 }
    