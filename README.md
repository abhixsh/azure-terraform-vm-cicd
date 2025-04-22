# Provision an Azure VM Using Terraform with Remote State and GitHub Actions

## Prerequisites
- Azure account
- Terraform and Azure CLI installed
- GitHub repo ready

## Installation Steps:
1. **Terraform**: Download from terraform.io
2. **Azure CLI**: Install from docs.microsoft.com

## Login to Azure:
```bash
az login
```

## Step 1: Remote State Setup in Azure
Terraform needs to store its terraform.tfstate file safely.
We use Azure Storage for this.

### Commands to Run:
```bash
az group create --name tfstate-mlsa --location "West Europe"

az storage account create \
    --name tfstatestoragemlsa123 \
    --resource-group tfstate-mlsa \
    --location "West Europe" \
    --sku Standard_LRS

az storage container create \
    --name tfstate \
    --account-name tfstatestoragemlsa123
```

## Step 2: Prepare Terraform Files
Your project should have these files:
- **main.tf**: Defines the Azure resources
- **variables.tf**: Declares input variables
- **terraform.tfvars**: Stores actual values (passwords, IDs)
- **outputs.tf**: Prints results like VM name

## Step 3: Run Terraform Commands
Inside your project folder:
```bash
terraform init     # Set up plugins and backend
terraform plan     # Preview what will be created
terraform apply    # Actually create resources
```
Check your Azure portal – your VM and network will be there.

## Step 4: Automate with GitHub Actions
We automate Terraform using GitHub Actions.

### 1. Create Azure Service Principal
```bash
az ad sp create-for-rbac \
    --name github-terraform-sp \
    --role Contributor \
    --scopes /subscriptions/<YOUR_SUBSCRIPTION_ID> \
    --sdk-auth
```

### 2. Add Secrets to GitHub
Go to your repo → Settings → Secrets and add:
- AZURE_CREDENTIALS (JSON output from above)
- ARM_CLIENT_ID, ARM_CLIENT_SECRET, ARM_TENANT_ID, ARM_SUBSCRIPTION_ID
- ADMIN_USERNAME, ADMIN_PASSWORD
- STORAGE_ACCOUNT_KEY (from Azure portal)

### 3. Create GitHub Actions Workflow
Path: .github/workflows/terraform.yml

Your workflow should:
- Checkout code
- Set up Terraform
- Login to Azure
- Run terraform init, validate, plan, and optionally apply

**Done!**
Now whenever you push to main, your VM gets deployed or updated automatically.
