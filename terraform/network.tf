resource "kubernetes_service" "next_app" {
  metadata {
    name      = "next-app"
    namespace = kubernetes_namespace.portfolio_website.metadata[0].name
  }

  spec {
    selector = {
      app = "next-app"
    }

    port {
      port        = "3000"
      target_port = "3000"
    }
  }
}

resource "kubernetes_manifest" "next_app_ingress" {
  manifest = {
    apiVersion = "traefik.containo.us/v1alpha1"
    kind       = "IngressRoute"

    metadata = {
      name      = "next-app"
      namespace = kubernetes_namespace.portfolio_website.metadata[0].name
    }

    spec = {
      entryPoints = ["websecure"]

      routes = [{
        kind  = "Rule"
        match = (var.branch == "trunk") ? "Host(`${var.server_base_domain}`)" : "Host(`${var.branch}.${var.server_base_domain}`)"
        services = [{
          name      = kubernetes_service.next_app.metadata[0].name
          namespace = kubernetes_namespace.next_app.metadata[0].name
          port      = kubernetes_service.next_app.spec[0].port[0].port
        }]
      }]
    }
  }
}
