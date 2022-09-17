import mongoose from "mongoose";
import logger from "../utils/logger.js";

class MongoDBContainer {
    constructor(collection, schema) {
        this.collection = mongoose.model(collection, schema);
    }

    async getAll() {
        try {
            return await this.collection.find({}, { __v: 0 });
        } catch (error) {
            logger.error(`Hubo un problema en el método getAll: ${error}`);
        }
    }

    async getById(id) {
        try {
            const data = await this.getAll();
            if (data) {
                let obj = await this.collection.findOne(
                    { _id: id },
                    { __v: 0 }
                );
                if (obj) return obj;
                return null;
            }
        } catch (error) {
            logger.error(`Hubo un problema en el método getById: ${error}`);
        }
    }

    async add(data) {
        try {
            if (await this.ifExist(data)) {
                logger.error(`El objeto ya existe`);
                return null;
            }
            return await this.collection({ ...data }).save();
        } catch (error) {
            logger.error(`Hubo un problema en el método add: ${error}`);
        }
    }

    async editById(id, obj) {
        try {
            const dataUpdate = await this.collection.findByIdAndUpdate(
                id,
                obj,
                {
                    new: true,
                }
            );
            return dataUpdate;
        } catch (error) {
            logger.error(`Hubo un problema en el método editById: ${error}`);
        }
    }
    async deleteById(id) {
        try {
            return await this.collection.deleteOne({ _id: id });
        } catch (error) {
            logger.error(`Hubo un problema en el método deleteById: ${error}`);
        }
    }

    async deleteAll() {
        try {
            return await this.collection.deleteMany();
        } catch (error) {
            logger.error(`Hubo un problema en el método deleteAll: ${error}`);
        }
    }

    async ifExist(objData) {
        try {
            const obj = await this.collection.findOne(objData);
            if (obj) return true;
            return false;
        } catch (error) {
            logger.error(`Hubo un problema en el método ifExist: ${error}`);
        }
    }
}

export default MongoDBContainer;
