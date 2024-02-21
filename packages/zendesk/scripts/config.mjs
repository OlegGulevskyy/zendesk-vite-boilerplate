import fs from "fs-extra";

const CONFIG_RESERVED_NAME = "zaf.config.json";

export const parseConfig = (path) => {
  try {
    let file = fs.readJsonSync(path, "utf-8");
    return file;
  } catch (e) {
    return null;
  }
};

// ignore folders where should be no config file
// add your own folders, if need be
const IGNORE_PACKAGES = ["zendesk"];

/**
 * Find config files - "zaf.config.json" in all packages
 * do not throw error if file is not found
 */
export const getAllConfigs = (packagesPath) => {
  const packages = fs.readdirSync(packagesPath);
  const filtered = packages.filter((p) => !IGNORE_PACKAGES.includes(p));
  const configs = filtered.map((pkg) => {
    const cfgPath = `${packagesPath}/${pkg}/${CONFIG_RESERVED_NAME}`;
    return { appName: pkg, cfg: parseConfig(cfgPath) };
  });
  return configs.filter((c) => c.cfg !== null);
};
