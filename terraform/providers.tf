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
 }
    
