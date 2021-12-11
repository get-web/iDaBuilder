import { create } from "./modules/create-part.js";

const action = process.argv[2];
const name = process.argv[3] || "";

console.log("action:", action);
console.log("name:", name);

if (action == "create") {
	create(name);
}
