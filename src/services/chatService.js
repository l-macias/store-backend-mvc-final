import logger from "../utils/logger.js";

import { chatsDao } from "../daos/index.js";

class ChatApi {
    constructor() {
        this.ChatApi = chatsDao;
    }

    async getAll() {
        try {
            return await this.ChatApi.getAll();
        } catch (error) {
            logger.error(error);
        }
    }

    async addChat(data) {
        try {
            let msn = {
                author: {
                    id: data.email,
                    name: data.name,
                    lastname: data.lastname,
                },
                date: data.date,
                message: data.message,
            };
            return await this.ChatApi.add(msn);
        } catch (error) {
            logger.error(`Error al guardar el mensaje: ${error}`);
        }
    }

    async deleteAll() {
        try {
            return await this.ChatApi.deleteAll();
        } catch (error) {
            logger.error(error);
        }
    }
}

export default ChatApi;
