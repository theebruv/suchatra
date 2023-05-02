import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";

import Router from "./routes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static("public"));

app.get(`/`, async (_, res) => {
	res.json({
		status: "success",
		message: "Suchatra's API is running!",
	});
});

app.use(
	"/docs",
	swaggerUi.serve,
	swaggerUi.setup(undefined, {
		swaggerOptions: {
			url: "/swagger.json",
		},
	})
);

app.use(Router);

app.listen(4000, () => console.log(`🚀 Server ready at: http://localhost:4000`));
