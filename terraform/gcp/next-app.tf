# ***** secrets in secret manager

resource "google_cloud_run_v2_service" "next_app" {
  name     = "portfolio-website"
  location = "europe-west1"
  ingress  = "INGRESS_TRAFFIC_ALL"

  template {
    containers {
      image = "us-docker.pkg.dev/cloudrun/container/hello" # *****

      resources {
        cpu_idle          = true
        startup_cpu_boost = false

        limits = {
          cpu    = "1"
          memory = "128Mi"
        }
      }

      # *****
      env {
        name  = ""
        value = ""
      }

      env {
        name = ""

        value_source {
          secret_key_ref {
            secret  = ""
            version = ""
          }
        }
      }

      # *****
      startup_probe {
        initial_delay_seconds = 0
        timeout_seconds = 1
        period_seconds = 3
        failure_threshold = 1
        tcp_socket {
          port = 8080
        }
      }

      # *****
      liveness_probe {
        http_get {
          path = "/"
        }
      }
    }
  }
}
