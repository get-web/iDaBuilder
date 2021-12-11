export default {
	template: {
		src: {
			pages: "./src/template/pages/*.html",
			parts: ["./src/template/parts/**/*.html"],
		},
		dist: {
			dev: "./dev/",
			prod: "./prod/",
		},
		watch: ["./src/template/**/*.html"],
	},
	libs: {
		src: ["./src/libs/**"],
		dist: {
			dev: "./dev/libs/",
			prod: "./prod/libs/",
		},
		watch: ["./src/libs/**"],
	},
	fonts: {
		src: ["./src/fonts/**"],
		dist: {
			dev: "./dev/fonts/",
			prod: "./prod/fonts/",
		},
		watch: ["./src/fonts/**"],
	},
	images: {
		src: ["./src/images/**/*.{jpg,jpeg,png,gif,tiff,svg}"],
		dist: {
			dev: "./dev/images/",
			prod: "./prod/images/",
		},
		watch: ["./src/images/**/*.{jpg,jpeg,png,gif,tiff,svg}"],
	},
	imagesParts: {
		src: ["./src/template/parts/**/*.{jpg,jpeg,png,gif,tiff,svg}"],
		dist: {
			dev: "./dev/images/",
			prod: "./prod/images/",
		},
		watch: ["./src/template/**/*.{jpg,jpeg,png,gif,tiff,svg}"],
	},
	mediaParts: {
		src: ["./src/template/parts/**/*.{mp4,webm}"],
		dist: {
			dev: "./dev/images/",
			prod: "./prod/images/",
		},
		watch: ["./src/template/**/*.{mp4,webm}"],
	},
	css: {
		src: {
			main: "./src/css/main.css",
			importFrom: [
				"./src/css/_variables.css",
				"./src/css/_mixins.css",
				"./src/css/_media.css",
			],
		},
		dist: {
			dev: "./dev/css/",
			prod: "./prod/css/",
		},
		watch: ["./src/css/*.css", "./src/template/**/*.css"],
	},
	js: {
		src: "./src/js/main.js",
		outputFileName: "app.js",
		dist: {
			dev: "./dev/js/",
			prod: "./prod/js/",
		},
		watch: ["./src/js/*.js", "./src/template/parts/**/*.js"],
		protection: {
			dist: "./tmp/jsProtection",
			addFuncs: ["./modules/protectionFunctions.js"],
		},
	},
	sprites: {
		src: "./src/img/svg/*.svg",
		dist: "./dev/img/sprites/",
		watch: "./src/img/svg/*.svg",
	},
	favicon: {
		src: "./src/images/favicon/favicon.png",
		dist: {
			dev: "./dev/images/favicon/",
			prod: "./prod/images/favicon/",
		},
		watch: ["./src/images/favicon/**/*"],
	},
	clean: {
		dist: {
			dev: "./dev",
			prod: "./prod",
		},
	},
};
