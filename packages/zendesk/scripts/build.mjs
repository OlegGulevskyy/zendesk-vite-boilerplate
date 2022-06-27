import fs from "fs-extra";

const currentDir = process.cwd();
const destinationDir = process.env.INIT_CWD + "/dist";
const env = process.env.ENV
const COPY_LIST = ["assets", "translations", "manifest.json"];

const shouldBeCopied = (fileName) => COPY_LIST.includes(fileName);

const copyFile = (fileName) => {
  const currPath = currentDir + `/${fileName}`;
  const distPath = destinationDir + `/${fileName}`;
  fs.copySync(currPath, distPath);
};

const handleManifest = (fileName) => {
	const manifest = fs.readJsonSync(fileName)
	const nextManifest = {
		...manifest,
		location: {
			...manifest.location,
			support: {
				...manifest.location.support,
				ticket_sidebar: {
					...manifest.location.support.ticket_sidebar,
					url: env === 'local' ? 'http://localhost:3000': 'assets/sidebar/index.html'
				}
			}
		}
	}
	fs.writeJsonSync(`${destinationDir}/${fileName}`, nextManifest, { spaces: '\t' })
}

const build = () => {
  fs.ensureDirSync(destinationDir);
	fs.emptyDirSync(destinationDir)

  fs.readdir(currentDir, (err, files) => {
    if (err) {
      throw Error(err);
    }
    for (const file of files) {
      if (shouldBeCopied(file)) {
        copyFile(file);
      }

			if (file === 'manifest.json') {
				handleManifest(file)
			}
    }
  });
};

build();
