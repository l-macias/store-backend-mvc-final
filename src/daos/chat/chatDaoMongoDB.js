import MongoDBContainer from "../../containers/mongoDBContainer.js";
import mongoose from "mongoose";

export default class ChatsDaoMongoDB extends MongoDBContainer {
    constructor() {
        super(
            "chat",
            new mongoose.Schema({
                author: {
                    id: { type: String, required: true },
                },
                date: { type: String, required: true },
                message: { type: String, required: true },
            })
        );
    }
}
