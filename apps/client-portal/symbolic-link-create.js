require("dotenv").config();
const {
	symlinkSync,
	lstatSync,
	existsSync,
	appendFileSync,
	readFileSync,
	readdirSync,
	mkdirSync,
} = require("fs");
const { env } = require("process");
const fs = require("fs");
const readline = require("readline");

const tracker = "symbolic-link-tracker.txt";
const createSymbolicLink = (target, path, type) => {
	if (path && existsSync(path)) {
		return;
	}
	symlinkSync(target, path, type);
	appendFileSync(tracker, `${path.replace(`${__dirname}/`, "")}\n`);
	console.log(
		`Created symbolic link for ${path.replace(`${__dirname}/`, "")}`,
	);
};

const getAvailableClientIds = readdirSync("apps/client-portal/client").map(path =>
	path.toLowerCase(),
);

let clientId = `${env.NEXT_PUBLIC_CLIENT_ID || ""}`.toLowerCase(); //If you are using mac, --clientId is probably not working for you. Instead try to export it as environment variable. Example: 'export npm_config_clientId=onekey'
if (clientId) {
	clientId = clientId.toLowerCase();
	if (!getAvailableClientIds.includes(clientId)) {
		console.error(
			"Invalid env value for NEXT_PUBLIC_CLIENT_ID, the only valid values are: " +
				getAvailableClientIds,
		);
		throw "Invalid env variables";
	}
} else {
	console.error("Argument needed to set the proper clientId");
	console.error(
		"Add 'NEXT_PUBLIC_CLIENT_ID=<clientId>' in your .env file. ie: 'NEXT_PUBLIC_CLIENT_ID=Finilio'",
	);
	console.error("Valid values for <clientId> are: " + getAvailableClientIds);
	throw "Missing env variable";
}
console.log(`clientId is '${clientId}'`);

// Creating required client folders if they are missing
const rootPath = `apps/client-portal/client/${clientId}`;
if (!existsSync(rootPath)) {
	mkdirSync(rootPath, { recursive: true });
}

const updateGitIgnore = () => {
	const filePath = ".gitignore";
	const startPattern = "# symbolic links start";
	const endPattern = "# symbolic links end";
	let contentToAppend = readFileSync(tracker, "utf-8")
		.toString()
		.split("\n")
		.filter(m => m.trim());
	contentToAppend = contentToAppend.map(m => `./${m}`);
	try {
		// Read the content of the file synchronously
		const data = fs.readFileSync(filePath, "utf8");

		// Create a regular expression to match the content between start and end patterns
		const pattern = new RegExp(
			`${startPattern}([\\s\\S]+)${endPattern}`,
			"g",
		);

		// Replace the matched content with the new content
		const updatedData = data.replace(pattern, (match, group) => {
			return `${startPattern}\n${contentToAppend}\n${endPattern}`;
		});

		// Write the updated content back to the file
		fs.writeFileSync(filePath, updatedData, "utf8");
		console.log(
			"Content between patterns replaced and new content appended.",
		);
	} catch (err) {
		console.error(err);
	}
};

const generateSymbolicLinks = dirPath => {
	readdirSync(dirPath).forEach(path => {
		const fullPath = `${dirPath}/${path}`;
		const stats = lstatSync(fullPath);
		const p = fullPath.replace(`${rootPath}/`, "");
		if (stats.isFile()) {
			createSymbolicLink(fullPath, p, "file");
		} else {
			if (!existsSync(p)) {
				mkdirSync(p, { recursive: true });
			}
			generateSymbolicLinks(fullPath);
		}
	});
};

generateSymbolicLinks(`${__dirname}/client/${clientId}`);
updateGitIgnore();
