import express from "express";
const { Router } = express;
const router = new Router();

import OrderController from "../controllers/order.controller.js";
const controller = new OrderController();

//Genera una orden para el usuario
router.post("/:userId", controller.makeOrder);

export default router;
