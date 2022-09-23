import MyMongoDbClient from "../db/mongoDBClient.js";
const MyClient = new MyMongoDbClient();

let usersDao;
let productsDao;
let cartsDao;
let ordersDao;
let chatsDao;

//Se opta entre modo Producción o Desarrollo. En producción solo se trabaja en MongoDB Atlas.
//Luego en Development se puede elegir MongoDB Atlas, MySQL, o Persistencia en Memoria.
//Los métodos únicamente están implementados para MongoDB Atlas. En trabajos anteriores tenía
//implementados los métodos para MySQL y Persistencia en Memoria, FS, y otros, pero no me daba el tiempo.
//Pero está implementado la estructura para demostrar que es escalable en este aspecto.

switch (process.env.NODE_ENV) {
    //MODO PRODUCCIÒN
    case "production":
        {
            switch (process.env.DB) {
                case "mongodb":
                    MyClient.connect();
                    const { default: UsersDaoMongoDB } = await import(
                        "./user/userDaoMongoDB.js"
                    );
                    const { default: ProductsDaoMongoDB } = await import(
                        "./product/productDaoMongoDB.js"
                    );
                    const { default: CartsDaoMongoDB } = await import(
                        "./cart/cartDaoMongoDB.js"
                    );
                    const { default: OrdersDaoMongoDB } = await import(
                        "./order/orderDaoMongoDB.js"
                    );
                    const { default: ChatsDaoMongoDB } = await import(
                        "./chat/chatDaoMongoDB.js"
                    );
                    usersDao = new UsersDaoMongoDB();
                    productsDao = new ProductsDaoMongoDB();
                    cartsDao = new CartsDaoMongoDB();
                    ordersDao = new OrdersDaoMongoDB();
                    chatsDao = new ChatsDaoMongoDB();
                    break;

                default:
                    break;
            }
        }
        break;
    //MODO DESARROLLO
    case "development": {
        switch (process.env.DB) {
            case "mongodb":
                MyClient.connect();
                const { default: UsersDaoMongoDB } = await import(
                    "./user/userDaoMongoDB.js"
                );
                const { default: ProductsDaoMongoDB } = await import(
                    "./product/productDaoMongoDB.js"
                );
                const { default: CartsDaoMongoDB } = await import(
                    "./cart/cartDaoMongoDB.js"
                );
                const { default: OrdersDaoMongoDB } = await import(
                    "./order/orderDaoMongoDB.js"
                );
                const { default: ChatsDaoMongoDB } = await import(
                    "./chat/chatDaoMongoDB.js"
                );
                usersDao = new UsersDaoMongoDB();
                productsDao = new ProductsDaoMongoDB();
                cartsDao = new CartsDaoMongoDB();
                ordersDao = new OrdersDaoMongoDB();
                chatsDao = new ChatsDaoMongoDB();
                break;
            case "mysql":
                const { default: UsersDaoMySQL } = await import(
                    "./user/userDaoMySQL.js"
                );
                const { default: ProductsDaoMySQL } = await import(
                    "./product/productDaoMySQL.js"
                );
                const { default: CartsDaoMySQL } = await import(
                    "./cart/cartDaoMySQL.js"
                );
                const { default: OrdersDaoMySQL } = await import(
                    "./order/orderDaoMySQL.js"
                );
                const { default: ChatsDaoMySQL } = await import(
                    "./chat/chatDaoMySQL.js"
                );
                usersDao = new UsersDaoMySQL();
                productsDao = new ProductsDaoMySQL();
                cartsDao = new CartsDaoMySQL();
                ordersDao = new OrdersDaoMySQL();
                chatsDao = new ChatsDaoMySQL();
                break;
            case "mem":
                const { default: UsersDaoMem } = await import(
                    "./user/userDaoMem.js"
                );
                const { default: ProductsDaoMem } = await import(
                    "./product/productDaoMem.js"
                );
                const { default: CartsDaoMem } = await import(
                    "./cart/cartDaoMem.js"
                );
                const { default: OrdersDaoMem } = await import(
                    "./order/orderDaoMem.js"
                );
                const { default: ChatsDaoMem } = await import(
                    "./chat/chatDaoMem.js"
                );
                usersDao = new UsersDaoMem();
                productsDao = new ProductsDaoMem();
                cartsDao = new CartsDaoMem();
                ordersDao = new OrdersDaoMem();
                chatsDao = new ChatsDaoMem();
                break;
            default:
                break;
        }
    }
}

export { usersDao, productsDao, cartsDao, ordersDao, chatsDao };
