import mongoose, { Schema } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

class MessageModel {
    // eslint-disable-next-line class-methods-use-this
    initSchema() {
        const schema = new Schema(
            {
                sender: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'users'
                },
                content: {
                    type: String,
                    trim: true
                },
                chat: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'chats'
                },
                readBy: [{
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "users"
                }],
            },
            {
                timestamps: true,
            },
        );
        schema.plugin(uniqueValidator);
        mongoose.model('messages', schema);
    }

    getInstance() {
        this.initSchema();
        return mongoose.model('messages');
    }

    // eslint-disable-next-line class-methods-use-this
    getModel() {
        return mongoose.model('messages');
    }
}

export default MessageModel;