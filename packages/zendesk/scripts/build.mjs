import fs from "fs-extra";

const currentDir = process.cwd();
const destinationDir = process.env.INIT_CWD + "/dist";
const COPY_LIST = ["assets", "translations", "manifest.json"];

const shouldBeCopied = (fileName) => COPY_LIST.includes(fileName);

const copyFile = (fileName) => {
  const currPath = currentDir + `/${fileName}`;
  const distPath = destinationDir + `/${fileName}`;
  fs.copySync(currPath, distPath);
};

const build = () => {
  fs.ensureDirSync(destinationDir);

  fs.readdir(currentDir, (err, files) => {
    if (err) {
      throw Error(err);
    }
    for (const file of files) {
      if (shouldBeCopied(file)) {
        copyFile(file);
      }
    }
  });
};

build();
