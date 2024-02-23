import minimist from "minimist";
import { parseConfig } from "../packages/zendesk/scripts/config.mjs";
import { run } from "./util.mjs";

const {
  _: [env, ...restArgs],
} = minimist(process.argv.slice(2));

// list of applications to build
const restArgsStr = restArgs.join(" ");

run({
  pkg: "@app/zendesk",
  cmd: process.platform === 'win32'
    ? `set ENV=${env}&& set APPS=${restArgsStr}&& yarn build`
    : `ENV=${env} APPS='${restArgsStr}' yarn build`,
  cwd: "packages/zendesk",
});

// only build app content files if build command is not for local development
// if current environment is local - just power up each application as needed manually
if (env !== "local") {
  for (const appLocation of restArgs) {
    // do not build / copy server side apps
    // if it's a nextjs or nuxtjs app, they should be deployed to a separate domain
    // and not bundled with the app
    // in this case - we only care about copying manifest file and it's already done
    const appConfig = parseConfig(`packages/${appLocation}/zaf.config.json`);
    if (appConfig && appConfig.server_side) {
      console.log("-----------")
      console.log(`Skipping server side app: ${appLocation}`)
      console.log(`Server side apps should be deployed to a separate domain and not bundled with the app`)
      console.log(`Current production URL: ${appConfig.production_url}`)
      console.log("-----------")
      continue;
    }

    const outputDir = `${process.env.PROJECT_CWD}/dist/assets/${appLocation}`;
    console.log(`Building app: ${appLocation}`)
    console.log(`Output dir: ${outputDir}`)
    const withFlags = `--outDir ${outputDir} --base="./"`;

    run({
      pkg: `@app/${appLocation}`,
      cmd: process.platform === 'win32'
        ? `set ADDON_TYPE=${appLocation}&& yarn build ${withFlags}`
        : `ADDON_TYPE=${appLocation} yarn build ${withFlags}`,
      cwd: `packages/${appLocation}`,
    });
  }
}
