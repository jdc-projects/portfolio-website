variable "branch" {
  type        = string
  description = "Name of the branch from which this is deployed."
}

variable "server_base_domain" {
  type        = string
  description = "Base domain for the website."
}

variable "container_registry_url" {
  type        = string
  description = "URL for the registry containing the container images."
}

variable "next_app_image_name" {
  type        = string
  description = "Name of next-app container image."
}

variable "next_app_image_tag" {
  type        = string
  description = "Tag for the next-app container image."
}
