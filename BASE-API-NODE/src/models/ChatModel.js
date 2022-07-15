import mongoose, { Schema } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

class ChatModel {
    // eslint-disable-next-line class-methods-use-this
    initSchema() {
        const schema = new Schema(
            {
                chatName: {
                    type: String,
                    trim: true
                },
                isGroupChat: {
                    type: Boolean,
                    default: false
                },
                users: [{
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "users"
                }],
                latestMessage: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "messages",
                },
                groupAdmin: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "users"
                },
            },
            {
                timestamps: true,
            },
        );
        schema.plugin(uniqueValidator);
        mongoose.model('chats', schema);
    }

    getInstance() {
        this.initSchema();
        return mongoose.model('chats');
    }

    // eslint-disable-next-line class-methods-use-this
    getModel() {
        return mongoose.model('chats');
    }
}

export default ChatModel;
