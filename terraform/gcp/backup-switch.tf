# ***** something to trigger the cloud function regularly

# ***** zip of code?

resource "google_cloudfunctions2_function" "backup_switch" {
  name        = "backup-switch"
  location    = "europe-west1"
  description = "Switches portfolio to the backup solution when server is down."

  # ***** remove public access / http endpoint

  # *****
  build_config {
    runtime     = "go*****"
    entry_point = ""  # *****

    # *****
    source {
      storage_source {
        bucket = google_storage_bucket.bucket.name
        object = google_storage_bucket_object.object.name
      }
    }
  }

  # *****
  service_config {
    max_instance_count  = 1
    available_cpu       = "1"
    available_memory    = "64Mi"
    timeout_seconds     = 1
  }
}
