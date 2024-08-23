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

const warnUnallowedPackage = (location) => {
  console.error("Package app is not recognised as a valid app", location);
  console.error(
    "Please, check your zaf.config.json file if property 'location' is set correctly",
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

  for (const { appName, cfg } of configs) {
    console.log("Building manifest for app: ", appName);
    console.log("Config: ", cfg);
    const locations = cfg.locations ?? [cfg];

    for (const locationConfig of locations) {
      const { dev_url, dev_port, production_url, server_side, size, location } =
        locationConfig;

      if (!isPackagedAllowed(location)) {
        warnUnallowedPackage();
        continue;
      }

      const devUrl = dev_url ?? "localhost";
      const devPort = dev_port ?? "3000";
      const appUrl = isDev ? `${devUrl}:${devPort}` : production_url;

      manifest.location.support[location] = {
        url: server_side
          ? appUrl
          : isDev
            ? appUrl
            : `assets/${appName}/${appUrl}`,
      };

      if (size) {
        manifest.location.support[location].size = size;
      }
    }
  }

  return manifest;
};

export const updateManifest = (manifest, destinationDir, fileName) => {
  fs.writeJsonSync(`${destinationDir}/${fileName}`, manifest, {
    spaces: "\t",
  });
};
