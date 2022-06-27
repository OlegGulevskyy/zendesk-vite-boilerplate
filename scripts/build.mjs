import minimist from 'minimist'
import { run } from './util.mjs'

const {
  _: [env],
} = minimist(process.argv.slice(2));

run({
  pkg: "@app/zendesk",
  cmd: `ENV=${env} yarn build`,
  cwd: "packages/zendesk",
});

// only build react files if build command is not for local development
// if current environment is local - just power up
if (env !== 'local') {
	run({
		pkg: "@app/sidebar",
		cmd: "ADDON_TYPE=sidebar yarn build",
		cwd: "packages/sidebar",
	});
}
