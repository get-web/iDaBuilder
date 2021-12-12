import { create } from "./modules/create-part.js";

const action = process.argv[2];
const name = process.argv[3] || "";
const type = process.argv[4] || "block";

console.log("action:", action);
console.log("name:", name);
console.log("type:", type);

if (action == "create") {
	create(name, type);
}
