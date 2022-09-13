import mongoose from "mongoose";
import config from "../configs/config.js";

import logger from "../../utils/logger.js";

class MongoDBClient {
    constructor() {
        this.connected = false;
        this.client = mongoose;
    }

    connect() {
        try {
            this.client.connect(config.mongoDB.cnx, config.mongoDB.options);
            logger.info("Base de datos conectada");
        } catch (error) {
            logger.error(
                `Hubo un problema en la conexión a la base de datos: ${error}`
            );
            throw "Falló la conexión a MongoDB";
        }
    }

    async disconnect() {
        try {
            await this.client.close();
            logger.info("Base de datos desconectada");
        } catch (error) {
            logger.error(`Hubo un problema en la desconexión: ${error}`);
            throw "Fallo en la desconexión de MongoDB";
        }
    }
}

export default MongoDBClient;
