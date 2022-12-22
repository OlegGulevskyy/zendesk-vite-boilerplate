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
  cmd: `ENV=${env} APPS='${restArgsStr}' yarn build`,
  cwd: "packages/zendesk",
});

// only build app content files if build command is not for local development
// if current environment is local - just power up each application as needed manually
if (env !== "local") {
  const allowedApps = [
    "ticket_sidebar",
    "new_ticket_sidebar",
    "organization_sidebar",
    "user_sidebar",
    "top_bar",
    "nav_bar",
    "modal",
    "ticket_editor",
    "background",
  ];

  for (const appLocation of restArgs) {
    if (!allowedApps.includes(appLocation)) {
      console.error(
        `Unknown app location.
				Check package.json for list of arguments supplied to build script. 
				See allowedApps for list of allowed apps`
      );

      continue;
    }

		// do not build / copy server side apps
		// if it's a nextjs or nuxtjs app, they should be deployed to a separate domain
		// and not bundled with the app
		// in this case - we only care about copying manifest file and it's already done
		const appConfig = parseConfig(`packages/${appLocation}/zaf.config.json`);
		if (appConfig && appConfig.server_side) {
			continue
		}

    run({
      pkg: `@app/${appLocation}`,
      cmd: `ADDON_TYPE=${appLocation} yarn build`,
      cwd: `packages/${appLocation}`,
    });
  }
}
