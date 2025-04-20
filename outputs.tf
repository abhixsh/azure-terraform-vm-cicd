output "vm_name" {
  value = azurerm_virtual_machine.main.name
}

output "resource_group" {
  value = azurerm_resource_group.resourcegroup.name
}
