import {expect, test} from '@jest/globals'
// import path from 'path'
// import * as process from 'process'
// import * as cp from 'child_process'

test('dummy', () => {
  expect(1).toBe(1)
})

// test('throws invalid number', async () => {
//   const input = parseInt('foo', 10)
//   await expect(wait(input)).rejects.toThrow('milliseconds not a number')
// })

// test('wait 500 ms', async () => {
//   const start = new Date()
//   await wait(500)
//   const end = new Date()
//   var delta = Math.abs(end.getTime() - start.getTime())
//   expect(delta).toBeGreaterThan(450)
// })

// shows how the runner will run a javascript action with env / stdout protocol
// test('test runs', () => {
//   process.env.GITHUB_WORKSPACE = `${__dirname}/../..`
//   process.env.GITHUB_ACTION_REPOSITORY = 'timokoenig-hetzner-cdk-action'
//   process.env.HETZNER_AUTH_TOKEN = 'xxx'
//   const np = process.execPath
//   const ip = path.join(__dirname, '..', '..', 'lib', 'main.js')
//   const options: cp.ExecFileSyncOptions = {
//     env: process.env
//   }
//   try {
//     console.log(cp.execFileSync(np, [ip], options).toString())
//   } catch (error: any) {
//     console.log(error.message)
//     console.log(String(error.output))
//     process.exit(1)
//   }
// })
