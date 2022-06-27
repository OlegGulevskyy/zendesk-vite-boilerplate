import * as cp from "child_process";

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

// build({
//   pkg: "@app/zendesk",
//   cmd: "yarn build",
//   cwd: "packages/zendesk",
// });

build({
  pkg: "@app/sidebar",
  cmd: "ADDON_TYPE=sidebar yarn build",
  cwd: "packages/sidebar",
});
