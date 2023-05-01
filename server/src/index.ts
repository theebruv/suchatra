import express from "express";
import cors from "cors";

import itemsRouter from "./routes/item.route";
import eventsRouter from "./routes/event.route";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get(`/`, async (_, res) => {
	res.json({
		status: "success",
		message: "Suchatra's API is running!",
	});
});

app.use(`/api/v1/items`, itemsRouter);
app.use(`/api/v1/events`, eventsRouter);

app.listen(4000, () => console.log(`🚀 Server ready at: http://localhost:4000`));
