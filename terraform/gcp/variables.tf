terraform {
  backend "gcs" {
    bucket  = "tf-state-jd-chapman-dev" # *****
    prefix  = "terraform/state"  # *****
  }

  required_providers {
    google = {
      source = "hashicorp/google"
      version = "5.15.0"
    }
  }
}

provider "google" {
  project     = "my-project-id" # *****
  region      = "us-central1" # *****
}
