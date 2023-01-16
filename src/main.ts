import * as core from '@actions/core'
import fs from 'fs'
import path from 'path'
import yaml from 'yaml'
import {CDK} from 'hetzner-cdk'

type HetznerConfig = {
  namespace: string
  datacenter: string
  server: {
    name?: string
    image: string
    serverType?: string
    dockerImage: string
  }
}

async function run(): Promise<void> {
  core.info('[GHAction] Load hetzner.json config file')
  const githubWorkspace = process.env.GITHUB_WORKSPACE
  if (!githubWorkspace) throw new Error('Env GITHUB_WORKSPACE not set')

  const githubActionRepository = process.env.GITHUB_ACTION_REPOSITORY?.replace(
    '/',
    '-'
  ) // important! hetzner will reject the deployment when the name contains characters like `/`
  if (!githubActionRepository)
    throw new Error('Env GITHUB_ACTION_REPOSITORY not set')

  core.info('[GHAction] Read cloud template')
  const cloudTemplate = fs.readFileSync(
    path.join(githubWorkspace, 'hetzner.yml'),
    'utf8'
  )
  const config: HetznerConfig = yaml.parse(cloudTemplate)

  core.info(
    `[GHAction] Set cloud template namespace to ${githubActionRepository}`
  )
  config.namespace = githubActionRepository
  const configString = yaml.stringify(config, {lineWidth: -1})

  core.info('[GHAction] Import cloud template')
  const cdk = await CDK.import(configString)

  core.info('[GHAction] Run Hetzner deployment')
  await cdk.runDeploy({force: true, debug: false})

  core.info('[GHAction] Hetzner deployment done')
}

// eslint-disable-next-line github/no-then
run().catch(error => {
  core.info('an error occurred')
  core.info(`${error}`)
  if (error instanceof Error) {
    core.error(error)
    core.setFailed(error.message)
  }
})
