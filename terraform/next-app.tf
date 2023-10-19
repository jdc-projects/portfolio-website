resource "kubernetes_secret" "next_app_env" {
  metadata {
    name      = "next-app-env"
    namespace = kubernetes_namespace.portfolio_website.metadata[0].name
  }

  data = {

  }
}

resource "kubernetes_config_map" "next_app_env" {
  metadata {
    name      = "next-app-env"
    namespace = kubernetes_namespace.portfolio_website.metadata[0].name
  }

  data = {

  }
}

resource "kubernetes_deployment" "next_app" {
  metadata {
    name      = "next-app"
    namespace = kubernetes_namespace.portfolio_website.metadata[0].name
  }

  spec {
    replicas = 1

    selector {
      match_labels = {
        app = "portfolio-website"
      }
    }

    template {
      metadata {
        labels = {
          app = "portfolio-website"
        }
      }

      spec {
        container {
          image = "${var.container_registry_url}/${var.next_app_image_name}:${var.next_app_image_tag}"
          name  = "next-app"

          liveness_probe {
            http_get {
              path = "/"
              port = 3000
            }

            initial_delay_seconds = 5
            period_seconds        = 1
          }
        }
      }
    }
  }
}

resource "kubernetes_horizontal_pod_autoscaler_v2" "next_app" {
  metadata {
    name      = "next-app"
    namespace = kubernetes_namespace.portfolio_website.metadata[0].name
  }

  spec {
    min_replicas = 1
    max_replicas = 10

    scale_target_ref {
      kind = "Deployment"
      name = "next-app"
    }

    metric {
      type = "Resource"
      resource {
        name = "cpu"
        target {
          type                = "Utilization"
          average_utilization = 60
        }
      }
    }

    metric {
      type = "Resource"
      resource {
        name = "memory"
        target {
          type                = "Utilization"
          average_utilization = 60
        }
      }
    }
  }
}
