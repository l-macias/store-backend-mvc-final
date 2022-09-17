import MongoDBContainer from "../../containers/mongoDBContainer.js";
import mongoose from "mongoose";

export default class OrdersDaoMongoDB extends MongoDBContainer {
    constructor() {
        super(
            "order",
            new mongoose.Schema({
                nroOrden: { type: Number, required: true, unique: true },
                timestamps: { type: String, required: true },
                user: { type: Array, required: true },
                products: { type: Array, required: true },
                total: { type: Number, required: true },
                status: { type: String, required: true },
            })
        );
    }
}
