import logger from "../utils/logger.js";

class UserController {
    constructor() {}

    async getProfile(req, res) {
        try {
            const dataUser = req.user;
            if (dataUser)
                res.render("pages/userProfile", {
                    dataUser: dataUser,
                });
            return;
        } catch (error) {
            logger.warn(error);
            res.json({
                error: -1,
                descripcion: `Ruta: ${req.url} - Método: '${req.method}' No autorizado`,
            });
        }
    }
}

export default UserController;
