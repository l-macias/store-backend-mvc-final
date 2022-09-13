import logger from "../utils/logger.js";

import { usersDao } from "../daos/index.js";

class UserApi {
    constructor() {
        this.UserApi = usersDao;
    }

    async add(newUser) {
        try {
            return await this.UserApi.add(newUser);
        } catch (error) {
            logger.error(`Error al añadir el usuario: ${error}`);
        }
    }

    async getById(id) {
        try {
            return await this.UserApi.getById(id);
        } catch (error) {
            logger.error(`Error al obtener el usuario por ID: ${error}`);
        }
    }

    async findUser(userEmail) {
        try {
            return await this.UserApi.findUser(userEmail);
        } catch (error) {
            logger.error(`Error al obtener el usuario por email: ${error}`);
        }
    }

    async ifExist(userName) {
        try {
            return await this.UserApi.ifExist(userName);
        } catch (error) {
            logger.error(`Error al comprobar si existe el usuario: ${error}`);
        }
    }
}

export default UserApi;
