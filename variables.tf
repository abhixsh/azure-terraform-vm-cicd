variable "prefix" {
  default = "tfstate-mlsa"
}

variable "location" {
  default = "West Europe"
}

variable "admin_username" {
  type = string
  sensitive = true
}

variable "admin_password" {
  type = string
  sensitive = true
}
