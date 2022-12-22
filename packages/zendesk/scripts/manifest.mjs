import fs from "fs-extra";

const env = process.env.ENV;
const isDev = env === "local";

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

const isPackagedAllowed = (pkg) => allowedApps.includes(pkg);

const warnUnallowedPackage = () => {
	console.error("Package app is not recognised as a valid app", cfg.location);
	console.error(
		"Please, check your zaf.config.json file if property 'location' is set correctly"
	);
	console.error("Allowed apps are: ", allowedApps.join(", "));
};

/**
 * Prepare manifest file - if this is a local environment, serve UI files from localhost
 * Otherwise, serve files from build folders (for client apps) and URLs for server side apps
 */
export const buildManifest = (fileName, configs) => {
	const manifest = fs.readJsonSync(fileName);
	manifest.location = manifest.location || {};
	manifest.location.support = manifest.location.support || {};

	for (const cfg of configs) {
		if (!isPackagedAllowed(cfg.location)) {
			warnUnallowedPackage();
			continue;
		}

		const devUrl = cfg.dev_url ?? "localhost";
		const devPort = cfg.dev_port ?? "3000";
		const appUrl = isDev ? `${devUrl}:${devPort}` : cfg.production_url;

		manifest.location.support[cfg.location] = {
			url: appUrl,
		};

		if (cfg.size) {
			manifest.location.support[cfg.location].size = cfg.size;
		}
	}

	return manifest;
};

export const updateManifest = (manifest, destinationDir, fileName) => {
	fs.writeJsonSync(`${destinationDir}/${fileName}`, manifest, {
		spaces: "\t",
	});
};
