# Deploy Hetzner cloud template via Github Action

Use this template to deploy a Hetzner cloud template to the Hetzner cloud.

# How to use?

## 1. Hetzner Account

Sign up for a [Hetzner cloud account](https://accounts.hetzner.com/signUp)

## 2. Auth Token

Get your Hetzner API Auth Token and save it as a secret named `HETZNER_AUTH_TOKEN` in your repository

## 3. Cloud Template

Create the cloud template file named `hetzner.yml` and adjust configuration as needed.

> Note: The namespace will be automatically set to the users github and repsitory name, e.g. timokoenig-hetzner-cdk-action

### Example

Replace `<yourdomain.com>` with your domain and `<email@yourdomain.com>` with your email.

```yml
version: 0.1.0
datacenter: Falkenstein
resources:
  - resourceType: Server
    name: spaceserver
    image: ubuntu-22.04
    serverType: cx11
    dockerImage: docker.io/library/httpd
    dockerPort: "80"
    ssl:
      host: <yourdomain.com>
      letsEncryptEmail: <email@yourdomain.com>
    healthCheck:
      intervalInSeconds: 5
      statusCode: 200
    attachedResources:
      - resourceType: PrimaryIP
        name: spaceip
        type: ipv4
```

## 4. Github Action

Create the Github Action workflow.

### Example

```yml
name: 'deploy-cloud'
on:
  push:
    branches:
      - main
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3.1.0
      - uses: timokoenig/hetzner-cdk-action@0.1.0
```

## 5. Deployment

Save everything and push it on the main branch. You should see the Github Action deploy your cloud template to Hetzner cloud.

> Important: Make sure your hetzner.yml is not excluded via gitignore

After the deployment is done, the action will display the public IP of the server. Use this to create an A-Record in you DNS config to properly access the service through your domain. The ACME proxy companion on the server will automatically request an LetsEncrypt SSL certificate shortly after the DNS settings have been updated.

# Hetzner Cloud Development Kit

Read more about the [Hetzner CDK](https://github.com/timokoenig/hetzner-cdk)
