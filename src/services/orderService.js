import logger from "../utils/logger.js";

import { ordersDao, usersDao, cartsDao } from "../daos/index.js";

import transporter from "../utils/nodemailer.js";

class OrderApi {
    constructor() {
        this.OrderApi = ordersDao;
        this.UserApi = usersDao;
        this.CartApi = cartsDao;
    }

    async makeOrder(id) {
        try {
            const user = await this.UserApi.getById(id);
            const cartUser = await this.CartApi.getByUserId(id);
            const newOrder = {
                userId: cartUser.userId,
                products: cartUser.products,
            };
            const order = await this.OrderApi.add(newOrder);

            const mailOptions = {
                from: "Tienda Ficticia",
                to: `${user.userEmail}`,
                subject: `Nueva orden del usuario: ${user.userName}`,
                html: `<h1 style="color: blue;">New order from ${
                    user.userName
                }</h1>
                <h2>Lista de productos:</h2>
                ${cartUser.products.map((element) => {
                    return `<p>${element.title}</p>`;
                })}`,
            };
            await transporter.sendMail(mailOptions);
            cartUser.products = [];
            this.CartApi.editById(cartUser._id, cartUser);
            return order;
        } catch (error) {
            logger.error(error);
        }
    }
}

export default OrderApi;
