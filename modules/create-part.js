import { promises as fs } from "fs";
import colors from "colors";

export const create = async (name, type = "section", callback) => {
	if (!name) return false;
	const directory = "./src/template/parts/";
	let create = type === "section" ? createSection : createBlock;
	try {
		const stat = await fs.stat(directory + name);
		console.log("The directory has already been created".red);
	} catch {
		await fs.mkdir(`${directory}${name}`);
		await fs.writeFile(`${directory}${name}/${name}.html`, create(name));
		await fs.mkdir(`${directory}${name}/css`);
		await fs.writeFile(`${directory}${name}/css/${name}.css`, createCSS(name));
		await fs.mkdir(`${directory}${name}/js`);
		await fs.writeFile(`${directory}${name}/js/${name}.js`, createJS(name));
		await fs.mkdir(`${directory}${name}/images`);
		await fs.mkdir(`${directory}${name}/images/${name}`);
		await fs.appendFile(
			"./src/css/main.css",
			`\n@import '../template/parts/${name}/css/${name}.css';`
		);

		console.log(`"${name}" created successfully`.green);
		if (typeof callback == "function") callback();
		return true;
	}
};

function createSection(name) {
	return `<section class="section" data-section="${name}">
    <div class="container" data-container="${name}">
        <div class="${name}">

        </div> <!-- END  ${name} -->
    </div> <!-- END  container -->
</section> <!-- END  section -->`;
}

function createBlock(name) {
	return `<div class="${name}">

</div> <!-- END ${name} -->`;
}

function createCSS(name) {
	return `/* ${name} */

.${name} {

}`;
}

function createJS(name) {
	return `/* ${name} */`;
}
