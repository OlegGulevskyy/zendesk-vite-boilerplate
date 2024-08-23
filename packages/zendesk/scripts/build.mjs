import fs from "fs-extra";
import path from "path";
import { getAllConfigs, getProjectRootDir } from "./config.mjs";
import { buildManifest, updateManifest } from "./manifest.mjs";

const currentDir = process.cwd();
const destinationDir = getProjectRootDir() + "/dist";

const COPY_LIST = [
	"assets",
	"translations",
	"manifest.json",
	"zcli.apps.config.json",
];
const MANIFEST = "manifest.json";

const shouldBeCopied = (fileName) => COPY_LIST.includes(fileName);

const copyFile = (fileName) => {
	const currPath = currentDir + `/${fileName}`;
	const distPath = destinationDir + `/${fileName}`;
	fs.copySync(currPath, distPath);
};

const prepareDir = (dir) => {
	fs.ensureDirSync(dir);
	fs.emptyDirSync(dir);
}

const build = () => {
	const current = process.cwd();
	const pathParsed = path.parse(current);
	const configs = getAllConfigs(pathParsed.dir);

	prepareDir(destinationDir);

	fs.readdir(currentDir, (err, files) => {
		if (err) {
			throw Error(err);
		}
		for (const file of files) {
			if (shouldBeCopied(file)) {
				copyFile(file);
			}

			if (file === MANIFEST) {
				const builtManifest = buildManifest(file, configs);
				updateManifest(builtManifest, destinationDir, file);
			}
		}
	});
};

build();
