import fs from "fs-extra";

const currentDir = process.cwd();
const destinationDir = process.env.INIT_CWD + "/dist";
const env = process.env.ENV;
const COPY_LIST = [
  "assets",
  "translations",
  "manifest.json",
  "zcli.apps.config.json",
];

const shouldBeCopied = (fileName) => COPY_LIST.includes(fileName);

const copyFile = (fileName) => {
  const currPath = currentDir + `/${fileName}`;
  const distPath = destinationDir + `/${fileName}`;
  fs.copySync(currPath, distPath);
};

/**
 * Remove all the properties from manifest that are not needed for production
 */
const normalizeManifest = (manifest) => {
  if (!manifest) {
    return;
  }
  const manifestCopy = { ...manifest };
  for (const key in manifestCopy.location.support) {
    const supportApp = manifestCopy.location.support[key];

    // hard coded properties for now
    // if there are more properties in the future - prepare a smarter utility
    delete supportApp["dev:url"];
    delete supportApp["dev:port"];
  }

  return manifestCopy;
};

/**
 * Prepare manifest file - if this is a local environment, serve UI files from localhost
 * Otherwise, serve files from build folders for each respective app
 */
const handleManifest = (fileName) => {
  const manifest = fs.readJsonSync(fileName);
  for (const appKey in manifest.location.support) {
    const app = manifest.location.support[appKey];
    const devUrl = app["dev:url"] ?? "localhost";
    const devPort = app["dev:port"] ?? "3000";

    manifest.location.support[appKey] = {
      ...manifest.location.support[appKey],
      url:
        env === "local"
          ? `http://${devUrl}:${devPort}`
          : manifest.location.support[appKey].url,
    };
  }

  const cleanManifest = normalizeManifest(manifest);
  fs.writeJsonSync(`${destinationDir}/${fileName}`, cleanManifest, {
    spaces: "\t",
  });
};

const build = () => {
  fs.ensureDirSync(destinationDir);
  fs.emptyDirSync(destinationDir);

  fs.readdir(currentDir, (err, files) => {
    if (err) {
      throw Error(err);
    }
    for (const file of files) {
      if (shouldBeCopied(file)) {
        copyFile(file);
      }

      if (file === "manifest.json") {
        handleManifest(file);
      }
    }
  });
};

build();
