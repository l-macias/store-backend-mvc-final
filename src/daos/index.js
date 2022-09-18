import MyMongoDbClient from "../db/mongoDBClient.js";
const MyClient = new MyMongoDbClient();

let usersDao;
let productsDao;
let cartsDao;
let ordersDao;
let chatsDao;

switch (process.env.NODE_ENV) {
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
            default:
                break;
        }
    }
}

export { usersDao, productsDao, cartsDao, ordersDao, chatsDao };
