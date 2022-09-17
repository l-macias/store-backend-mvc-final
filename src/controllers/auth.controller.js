import logger from "../utils/logger.js";

import CartApi from "../services/cartService.js";
const cart = new CartApi();

class AuthController {
    constructor() {}

    async getSignup(req, res) {
        try {
            res.render("pages/signup");
        } catch (error) {
            logger.warn(error);
        }
    }

    async getLogin(req, res) {
        try {
            res.render("pages/login");
        } catch (error) {
            logger.warn(error);
        }
    }

    async getFailSignup(req, res) {
        try {
            res.render("pages/failSignup");
        } catch (error) {
            logger.warn(error);
        }
    }
    async getFailLogin(req, res) {
        try {
            res.render("pages/failLogin");
        } catch (error) {
            logger.warn(error);
        }
    }
    async postLogout(req, res) {
        try {
            await cart.deleteByUserId(req.body.userId);
            let nameUser = req.user.userName;
            req.logout((err) => {
                if (err) {
                    logger.error(err);
                }
                res.render("pages/logout", { nameUser });
            });
        } catch (error) {
            logger.warn(`Hubo un problema en el método postLogout: ${error}`);
        }
    }
}

export default AuthController;
