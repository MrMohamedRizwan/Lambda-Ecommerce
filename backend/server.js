const express = require("express");
const swaggerUI = require("swagger-ui-express");
const morgan = require("morgan");
const color = require("colors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const JSON = require("./swagger-output.json");
const { default: rateLimit } = require("express-rate-limit");
require("dotenv").config();

const app = express();

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const Categoryroutes = require("./routes/category");
const linkRoutes = require("./routes/link");
// const userRoutes = require('./routes/user');
// const categoryRoutes = require('./routes/category');
// const linkRoutes = require('./routes/link');

const connect_to_db = require("./config/db");
const swaggerJSDoc = require("swagger-jsdoc");

connect_to_db();

// app middlewares
app.use(morgan("dev"));
app.use(bodyParser.json());
// app.use(bodyParser.json({ limit: '5mb', type: 'application/json' }));
app.use(cors());
// app.use(cors({ origin: process.env.CLIENT_URL }));
const limiter = rateLimit({	
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
// middlewares
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", Categoryroutes);
app.use("/api", linkRoutes);
app.get("/", (req, res) => {
	res.send("API Running");
});
// app.use('/api', userRoutes);
// app.use('/api', categoryRoutes);
// app.use('/api', linkRoutes);

// check cookies
app.use(cookieParser());

app.get("/check-cookie", (req, res) => {
	const token = req.cookies.token;

	if (token) {
		res.send(`Token found: ${token}`);
	} else {
		res.send("Token not found");
	}
});
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(JSON));

app.get("/swagger-json", (req, res) => {
	res.setHeader("Content-Type", "application/json");
	res.send(JSON);
});

const port = process.env.PORT || 8000;
app.listen(port, () =>
	console.log(`API is running on port ${port}`.yellow.bold),
);
