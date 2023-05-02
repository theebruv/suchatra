import express from "express";

import itemsRouter from "./item.route";
import eventsRouter from "./event.route";

const router = express.Router();

router.use("/api/v1/items", itemsRouter);
router.use("/api/v1/events", eventsRouter);

export default router;
