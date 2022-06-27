import * as cp from 'child_process'

export function run({ pkg, cmd, cwd }) {
  console.log()
  console.log(`Running ${pkg}...`)
  console.log(`cwd: ${cwd}`)
  console.log(`cmd: ${cmd}`)
  cp.execSync(cmd, {
    cwd,
    stdio: 'inherit',
  })
}
