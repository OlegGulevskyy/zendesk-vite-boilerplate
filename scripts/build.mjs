import * as cp from 'child_process'

function build({ pkg, cmd, cwd }) {
  console.log();
  console.log(`Building ${pkg}...`);
  console.log(`cwd: ${cwd}`);
  console.log(`cmd: ${cmd}`);
  cp.execSync(cmd, {
    cwd,
    stdio: "inherit",
  });
}

build({
  pkg: "@app/www",
  cmd: `yarn build`,
  cwd: "packages/www",
});
