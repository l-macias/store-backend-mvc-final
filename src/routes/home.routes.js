import express from "express";
const { Router } = express;
const router = new Router();

import HomeController from "../controllers/home.controller.js";
const controller = new HomeController();

router.get("/", controller.getHome);

export default router;
