const express = require("express");
const app = express();
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const userRoute = require("./routes/users");
const categoryRoute = require("./routes/categories");
const multer = require("multer");
const path = require("path");

const dotenv = require("dotenv");
dotenv.config();
const connectDB = require("./config/db");
connectDB();

app.use(express.json());
app.use("/images", express.static("images"));

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "images");
	},
	filename: (req, file, cb) => {
		cb(null, req.body.name);
	},
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
	res.status(200).json("File has been uploaded");
});

// APIs
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", categoryRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
	console.log(`SERVER running in ${process.env.NODE_ENV} MODE on PORT ${PORT} `)
);
