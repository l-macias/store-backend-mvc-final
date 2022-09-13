import logger from "../utils/logger.js";

import OrderApi from "../services/orderService.js";
const order = new OrderApi();

class OrderController {
    constructor() {}
    async makeOrder(req, res) {
        try {
            return await order.makeOrder(req.params.userId, req.body.cartId);
        } catch (error) {
            logger.warn(error);
            res.status(404).json({
                error: -2,
                descripcion: `Ruta: ${req.url} - Método: '${req.method}' No autorizado`,
            });
        }
    }
}

export default OrderController;
