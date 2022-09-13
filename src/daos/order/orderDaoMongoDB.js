import MongoDBContainer from "../../containers/mongoDBContainer.js";
import mongoose from "mongoose";

export default class OrdersDaoMongoDB extends MongoDBContainer {
    constructor() {
        super(
            "order",
            new mongoose.Schema({
                timestamps: { type: Date },
                userId: { type: String, required: true },
                products: Array,
            })
        );
    }
}
