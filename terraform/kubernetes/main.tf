terraform {
  backend "kubernetes" {
    secret_suffix = "portfolio-website"
    config_path   = "./cluster.yml"
    namespace     = "terraform-state"
  }

  required_providers {
    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = "2.21.1"
    }

    null = {
      source  = "hashicorp/null"
      version = "3.2.1"
    }

    random = {
      source  = "hashicorp/random"
      version = "3.5.1"
    }
  }
}

provider "kubernetes" {
  config_path = "../cluster.yml"
}

provider "null" {
  # Configuration options
}

provider "random" {
}

resource "kubernetes_namespace" "portfolio_website" {
  metadata {
    name = "portfolio-website-${var.branch}"
  }
}
