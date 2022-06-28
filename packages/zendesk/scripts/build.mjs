import fs from "fs-extra";

const currentDir = process.cwd();
const destinationDir = process.env.INIT_CWD + "/dist";
const env = process.env.ENV;
const apps = process.env.APPS && process.env.APPS.split(" ");
const COPY_LIST = ["assets", "translations", "manifest.json"];

const shouldBeCopied = (fileName) => COPY_LIST.includes(fileName);

const copyFile = (fileName) => {
  const currPath = currentDir + `/${fileName}`;
  const distPath = destinationDir + `/${fileName}`;
  fs.copySync(currPath, distPath);
};

const handleManifest = (fileName) => {
  const manifest = fs.readJsonSync(fileName);
  for (const appLocation of apps) {
    manifest.location.support[appLocation] =
      manifest.location.support[appLocation] || {};
    manifest.location.support[appLocation] = {
      ...manifest.location.support[appLocation],
      url:
        env === "local"
          ? "http://localhost:3000"
          : `assets/${appLocation}/index.html`,
    };
  }

  fs.writeJsonSync(`${destinationDir}/${fileName}`, manifest, {
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
