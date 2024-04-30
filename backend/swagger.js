// const swaggerJSDoc = require("swagger-jsdoc");

// const swaggerDefinition = {
// 	openapi: "3.0.0",
// 	info: {
// 		title: "My API",
// 		version: "1.0.0",
// 		description: "My API Description",
// 	},
// };

// const options = {
// 	swaggerDefinition,
// 	apis: ["./routes/category.js"],
// };

// const swaggerSpec = swaggerJSDoc(options);
// module.exports = swaggerSpec;

const swaggerAutogen = require("swagger-autogen");
const doc = {
	info: {
		title: "Whatsapp Monitoring",
		description: "Monitor whatsapp groups",
	},
	host: "localhost:5001",
};

const outputFile = "./swagger-output.json";
const routes = [
	"./routes/category.js",
	"./routes/auth.js",
	"./routes/link.js",
	"./routes/user.js",
];
swaggerAutogen(outputFile, routes, doc);
