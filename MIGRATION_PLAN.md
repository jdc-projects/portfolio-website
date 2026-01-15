# Migration Plan: GitHub Pages → Cloudflare Pages

## Overview

Migrate static Next.js deployment from GitHub Pages to Cloudflare Pages using GitHub Actions for CI/CD and Terraform for infrastructure management.

**Current Setup:**
- GitHub Pages deployment via `.github/workflows/deploy-prod-frontend.yml`
- Static export to `frontend/out/`
- Deployed to custom domain via GitHub Pages

**Target Setup:**
- Updated `.github/workflows/deploy-prod-frontend.yml` with parallel deployment jobs
- GitHub Pages deployment (existing `deploy-github-pages` job)
- Cloudflare Pages deployment (new `deploy-cloudflare` job)
- Same static export to `frontend/out/` shared by both deployments
- Deployed to custom domain via Cloudflare Pages (managed in Terraform)
- Both deployments run in parallel after shared build & test jobs complete

---

## 0. Manual Setup Instructions (Before Implementation)

### 0.1 Cloudflare API Token Setup

**Create API Token:**
1. Go to: https://dash.cloudflare.com/profile/api-tokens
2. Click "Create Token"
3. Use template: "Edit Cloudflare Workers" or create custom token with:
   - Permissions:
     - Account → Cloudflare Pages → Edit
   - Account Resources:
     - Include → All accounts (or specific account)
4. Save the token for GitHub Secrets

**Get Account ID:**
1. Go to: https://dash.cloudflare.com → Workers & Pages
2. Click "Overview" tab
3. Copy Account ID from right sidebar (bottom)

### 0.2 Backblaze B2 Setup for Terraform State

**Create B2 Bucket:**
1. Login to https://secure.backblaze.com/b2_buckets.htm
2. Click "Create a Bucket"
3. Configure:
   - Bucket Name: `portfolio-website-terraform-state` (or your preferred name)
   - Files in Bucket: Private
4. Note the bucket name and bucket ID
5. Note the region (e.g., `us-west-004`) - displayed in bucket settings

**Create B2 Application Keys:**
1. Go to: https://secure.backblaze.com/app_keys.htm
2. Click "Add a New Application Key"
3. Configure:
   - Name: `terraform-state-access`
   - Allow access to Bucket(s): Select your new bucket
   - Type of Access: "Read and Write"
4. After creation, copy:
   - `keyID` → this will be AWS_ACCESS_KEY_ID
   - `applicationKey` → this will be AWS_SECRET_ACCESS_KEY
5. Store these securely - they will not be shown again

**Backblaze S3 Endpoint Info:**
- Use S3-compatible API (not native B2)
- Endpoint format: `s3.<region>.backblazeb2.com`
- Example: `s3.eu-central-003.backblazeb2.com` (EU region)
- Requires path-style access (not virtual-hosted)
- EU regions: `eu-central-003`, `eu-north-001`, `eu-west-004`

---

## 1. GitHub Configuration

### 1.1 GitHub Secrets to Add

Add to repository → Settings → Secrets and variables → Actions → New repository secret:

| Secret Name | Value | Source |
|------------|-------|--------|
| `CLOUDFLARE_API_TOKEN` | Cloudflare API token (from 0.1) | Manual entry |
| `CLOUDFLARE_ACCOUNT_ID` | Cloudflare account ID (from 0.1) | Manual entry |
| `AWS_ACCESS_KEY_ID` | Backblaze B2 keyID (from 0.2) | Manual entry |
| `AWS_SECRET_ACCESS_KEY` | Backblaze B2 applicationKey (from 0.2) | Manual entry |

### 1.2 GitHub Variables

Ensure the following variable exists (it already should):
- `SERVER_BASE_DOMAIN` - The root domain (e.g., "jd-chapman.dev")

---

## 2. Terraform Configuration

### 2.1 Directory Structure

```
terraform/
├── cloudflare/
│   ├── backend.tf           # Backblaze S3 backend configuration
│   ├── main.tf              # Cloudflare provider, Pages project, custom domain
│   ├── variables.tf         # Input variables (passed via TF_VAR_*)
│   └── outputs.tf           # Output URLs and deployment information
└── [existing directories - leave untouched]
```

### 2.2 Terraform Files

**File: `terraform/cloudflare/backend.tf`**
```hcl
terraform {
  backend "s3" {
    bucket                      = "portfolio-website-terraform-state"  # Your bucket name
    key                         = "portfolio-website/terraform.tfstate"
    region                      = "eu-central-003"                     # Your bucket region (EU)
    endpoint                    = "s3.eu-central-003.backblazeb2.com" # S3-compatible endpoint (EU)
    skip_credentials_validation = true
    skip_region_validation      = true
    skip_metadata_api_check     = true
    force_path_style            = true
  }
}
```

**File: `terraform/cloudflare/variables.tf`**
```hcl
variable "cloudflare_api_token" {
  type        = string
  sensitive   = true
  description = "Cloudflare API token with Cloudflare Pages edit permissions"
}

variable "cloudflare_account_id" {
  type        = string
  description = "Cloudflare account ID"
}

variable "custom_domain" {
  type        = string
  description = "Custom domain for the Cloudflare Pages project (root domain)"
}

variable "project_name" {
  type        = string
  default     = "portfolio-website"
  description = "Cloudflare Pages project name"
}
```

**File: `terraform/cloudflare/main.tf`**
```hcl
terraform {
  required_providers {
    cloudflare = {
      source  = "cloudflare/cloudflare"
      version = "~> 4.0"
    }
  }
}

provider "cloudflare" {
  api_token   = var.cloudflare_api_token
  account_id  = var.cloudflare_account_id
}

resource "cloudflare_pages_project" "portfolio_website" {
  name                = var.project_name
  account_id          = var.cloudflare_account_id
  production_branch   = "trunk"

  build_config {
    build_command     = "npm run build"
    destination_dir   = "out"
    root_dir          = "frontend"
  }
}

resource "cloudflare_pages_custom_domain" "main" {
  account_id   = var.cloudflare_account_id
  project_name = cloudflare_pages_project.portfolio_website.name
  domain       = var.custom_domain
}
```

**File: `terraform/cloudflare/outputs.tf`**
```hcl
output "project_url" {
  description = "Cloudflare Pages project URL (subdomain)"
  value       = cloudflare_pages_project.portfolio_website.subdomain
}

output "production_url" {
  description = "Cloudflare Pages production URL"
  value       = cloudflare_pages_project.portfolio_website.production_url
}

output "custom_domain_status" {
  description = "Status of custom domain configuration"
  value       = cloudflare_pages_custom_domain.main.status
}
```

### 2.3 Terraform Notes

- **Backblaze Region**: EU region (e.g., `eu-central-003`)
- **No GitHub Source Config**: The `source` block is NOT included because:
  - We're using GitHub Actions to deploy manually via `wrangler-action`
  - Cloudflare doesn't need GitHub connection when deployments are disabled
  - Simplifies configuration and avoids unnecessary permissions
- **Custom Domain**: Terraform creates the custom domain resource, but DNS records must be managed separately (outside scope)
- **No Environment Variables**: Using `cloudflare_pages_project` without `environment_variables` block - all variables are set in GitHub Actions workflow
- **State Backend**: Uses Backblaze B2 with S3-compatible API in EU region

---

## 3. GitHub Actions Workflow

### 3.1 Update Existing Workflow File

**File: `.github/workflows/deploy-prod-frontend.yml`**

**Changes to make:**

1. Add Cloudflare permissions to existing permissions block:
```yaml
permissions:
  contents: read
  pages: write
  id-token: write
  # Add these for Cloudflare deployment
  deployments: write
```

2. Add Cloudflare deployment job that runs in parallel with GitHub Pages deployment:

```yaml
  deploy-cloudflare:
    needs: [build, playwright-tests]
    runs-on: ubuntu-latest
    environment:
      name: cloudflare-pages
      url: ${{ steps.deploy.outputs.url }}

    steps:
      - name: Repo checkout
        uses: actions/checkout@v4

      - name: Setup Terraform
        uses: hashicorp/setup-terraform@v3
        with:
          terraform_version: "1.9.0"

      - name: Configure AWS credentials for Backblaze
        uses: aws-actions/configure-aws-credentials@v4
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: eu-central-003

      - name: Terraform Init
        working-directory: ./terraform/cloudflare
        env:
          AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
        run: terraform init

      - name: Terraform Apply
        working-directory: ./terraform/cloudflare
        env:
          TF_VAR_cloudflare_api_token: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          TF_VAR_cloudflare_account_id: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
          TF_VAR_custom_domain: ${{ vars.SERVER_BASE_DOMAIN }}
        run: terraform apply -auto-approve

      - name: Deploy to Cloudflare Pages
        id: deploy
        uses: cloudflare/wrangler-action@v3
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
          command: pages deploy frontend/out --project-name=portfolio-website

      - name: Get deployment URL
        id: get-url
        working-directory: ./terraform/cloudflare
        run: |
          URL=$(terraform output -raw production_url)
          echo "url=$URL" >> $GITHUB_OUTPUT
```

3. Update the existing `deploy` job to make it explicitly named and run in parallel:

Rename the existing `deploy` job to `deploy-github-pages`:
```yaml
  deploy-github-pages:
    needs: [build, playwright-tests]
    runs-on: ubuntu-latest

    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}

    steps:
      - name: Deploy Frontend to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

### 3.2 Workflow Notes

- **Shared Build & Test**: Both deployments use the same `build` and `playwright-tests` jobs
- **Parallel Deployment**: `deploy-github-pages` and `deploy-cloudflare` jobs run in parallel after tests pass
- **No New Workflow File**: We update the existing `deploy-prod-frontend.yml` rather than creating a new one
- **Build Artifacts**: Build output is available to both deployment jobs via the `build` job's workspace
- **Schedule**: Maintains annual scheduled deployment (January 1st) - applies to both deployments
- **Environments**: Uses separate environments (`github-pages` and `cloudflare-pages`) for each deployment
- **Terraform Variables**: Passed via `TF_VAR_*` environment variables from GitHub secrets and variables

---

## 4. Implementation Order

### Phase 1: Manual Setup (Required Before Any Code Changes)

1. Create Cloudflare API token (Section 0.1)
2. Get Cloudflare account ID (Section 0.1)
3. Create Backblaze B2 bucket for state (Section 0.2)
4. Generate Backblaze application keys (Section 0.2)
5. Add all secrets to GitHub repository (Section 1.1)
6. Verify `SERVER_BASE_DOMAIN` variable exists in GitHub (Section 1.2)

### Phase 2: Infrastructure Code

1. Create directory `terraform/cloudflare/`
2. Create file `terraform/cloudflare/backend.tf` with your actual Backblaze bucket region
3. Create file `terraform/cloudflare/variables.tf`
4. Create file `terraform/cloudflare/main.tf`
5. Create file `terraform/cloudflare/outputs.tf`

### Phase 3: CI/CD Workflow

1. Update file `.github/workflows/deploy-prod-frontend.yml`:
   - Add `deployments: write` to permissions block
   - Rename existing `deploy` job to `deploy-github-pages`
   - Add new `deploy-cloudflare` job (from Section 3.1)
2. Trigger with manual workflow_dispatch from GitHub Actions tab
3. Monitor workflow run for successful completion
4. Verify both GitHub Pages and Cloudflare Pages deployments succeed
5. Check Cloudflare Dashboard → Workers & Pages for project creation

### Phase 4: Verification

1. Access custom domain to confirm deployment works
2. Check Cloudflare Pages deployment logs for any issues
3. Verify Playwright tests pass in the workflow
4. Confirm scheduled deployment still works (trigger manually to test)
5. Compare outputs from both GitHub Pages and Cloudflare Pages workflows

### Phase 5: Cutover (Optional, After Verification)

Once Cloudflare deployment is verified and stable:

1. Remove the `deploy-github-pages` job from `.github/workflows/deploy-prod-frontend.yml`
2. Rename `deploy-cloudflare` job back to `deploy` (if desired)
3. Remove GitHub Pages integration from repo settings if desired
4. Update any external references to deployment URLs (if using Cloudflare URL)
5. Remove GitHub Pages permissions from workflow:
   - Remove `pages: write` and `id-token: write` from permissions block
   - Remove `deployments: write` from permissions block

**Note**: During Phase 4, both deployments will run in parallel. This is intentional for comparison and verification.

---

## 5. Key Differences from Current Setup

| Aspect | Current (GitHub Pages) | After Migration |
|--------|----------------------|------------------|
| Deployment Workflow | Single deploy job | Two parallel deploy jobs (GitHub Pages + Cloudflare Pages) |
| Deployment Method | `actions/deploy-pages` | Both: `actions/deploy-pages` + `cloudflare/wrangler-action` |
| Infrastructure | None needed | Cloudflare Pages managed via Terraform |
| State Management | Not applicable | Backblaze B2 EU (S3-compatible) |
| Custom Domain | GitHub Pages settings | Cloudflare Pages custom domain resource |
| Environment Variables | GitHub Actions only | GitHub Actions only (same for both) |
| Deployment Branch | trunk | trunk (same for both) |
| Scheduled Deployment | Yes (Jan 1st) | Yes (Jan 1st) - both deployments trigger |
| Build & Test | Shared workflow | Shared workflow (no change) |

---

## 6. Troubleshooting

### 6.1 Terraform State Issues

**Problem**: Terraform init fails with backend connection error
**Solution**:
- Verify Backblaze credentials are correct
- Check bucket name matches exactly
- Confirm region is EU (e.g., `eu-central-003`)
- Confirm endpoint format is correct (e.g., `s3.eu-central-003.backblazeb2.com`)
- Ensure bucket exists and is accessible
- Verify bucket is in the correct EU region

### 6.2 Cloudflare API Issues

**Problem**: Terraform apply fails with authentication error
**Solution**:
- Verify API token has correct permissions (Account → Cloudflare Pages → Edit)
- Check account ID matches your Cloudflare account
- Ensure API token hasn't expired

### 6.3 Custom Domain Issues

**Problem**: Custom domain shows "pending" status
**Solution**:
- Add DNS CNAME record manually to Cloudflare DNS settings
- Point domain to Cloudflare Pages project
- Wait for DNS propagation (up to 24 hours)

### 6.4 Deployment Issues

**Problem**: `wrangler-action` fails with project not found
**Solution**:
- Ensure Terraform apply succeeded first
- Check project name matches (`portfolio-website`)
- Verify API token has project access

### 6.5 Build Issues

**Problem**: Build job succeeds but deploy fails
**Solution**:
- Check that `frontend/out/` directory exists and contains built files
- Verify build configuration in `next.config.mjs` (output: 'export')
- Ensure destination_dir in Terraform matches Next.js output directory

---

## 7. Rollback Plan

If Cloudflare deployment fails or causes issues:

1. GitHub Pages deployment continues to work (parallel job in same workflow)
2. Remove the `deploy-cloudflare` job from `.github/workflows/deploy-prod-frontend.yml`
3. Rename `deploy-github-pages` job back to `deploy`
4. Delete Cloudflare Pages project manually from Dashboard
5. Destroy Terraform state:
   ```bash
   cd terraform/cloudflare
   terraform destroy -auto-approve
   ```
6. Delete `terraform/cloudflare/` directory (optional)
7. Delete Backblaze application keys (optional, if not reused)
8. Remove Cloudflare-related GitHub secrets (optional)
9. Original setup remains fully functional (only GitHub Pages deployment)

---

## 8. Next Steps

After reviewing this plan:

1. Complete Phase 1 (Manual Setup) - all manual configuration
2. Implement Phase 2 (Infrastructure Code) - create Terraform files
3. Implement Phase 3 (CI/CD Workflow) - update existing workflow file
4. Execute Phases 4-5 (Verification and optional cutover)

Any issues or questions during implementation should be addressed before proceeding to the next phase.
