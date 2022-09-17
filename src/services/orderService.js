import logger from "../utils/logger.js";
import Timestamp from "../utils/timestamp.js";
import { ordersDao, usersDao, cartsDao } from "../daos/index.js";
import UserDto from "../dtos/user/userDto.js";
import ProductDto from "../dtos/product/productDto.js";
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
            const findOrder = await this.OrderApi.getAll();
            const totalCartPrice = cartUser.products.reduce(
                (acc, product) => acc + product.total,
                0
            );
            const lastOrder = findOrder.length - 1;
            const orderNr = findOrder[lastOrder].nroOrden + 1;

            //Instancio los DTO de productos y users. Así muestro solo los campos que preciso.
            const userDto = new UserDto(user);
            const productsDto = cartUser.products.map((product) => {
                return new ProductDto(product);
            });
            logger.info(productsDto);
            const newOrder = {
                nroOrden: orderNr,
                timestamps: Timestamp,
                user: userDto,
                products: productsDto,
                total: totalCartPrice,
                status: "generada",
            };
            const order = await this.OrderApi.add(newOrder);

            const mailOptions = {
                from: "Tienda Ficticia",
                to: `${user.userEmail}`,
                bcc: `${process.env.NODEMAILER_GMAIL_MAIL}`,
                subject: `Nueva orden Nro: ${orderNr} del usuario: ${user.userName}`,
                html: `<h1 style="color: blue;">Gracias por tu pedido ${
                    user.userName
                } !</h1>
                <h2>Lista de productos:</h2>
                ${cartUser.products.map((element) => {
                    return `
                    
                    <h2>Artículo: <b>${element.title}</b><h2><br>
                    <p>Descripción: <b>${element.description}</b></p><br>
                    <p>Precio Unitario: <b>$ ${element.price}</b></p><br>
                    <p>Cantidad: <b>${element.quantity}</b></p><br>
                    <p>Precio Total: <b>$ ${element.total}</b></p><br>
                    <hr>
                    `;
                })}
                    <h3>El total de la orden es: $ ${totalCartPrice}</h3>
                    <h3>El estado de la orden es: ${order.status}</h3>
                    <h3>El pedido será entregado en la dirección: ${
                        user.userAddress
                    }</h3>
                `,
            };
            await transporter.sendMail(mailOptions);
            cartUser.products = [];
            logger.info(cartUser);
            this.CartApi.editById(cartUser._id, cartUser);
            return order;
        } catch (error) {
            logger.error(error);
        }
    }
}

export default OrderApi;
