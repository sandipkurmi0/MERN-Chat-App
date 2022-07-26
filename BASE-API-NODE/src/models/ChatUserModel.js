import mongoose, { Schema } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

class ChatUsersModel {
    // eslint-disable-next-line class-methods-use-this
    initSchema() {
        const schema = new Schema(
            {
                userId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "users"
                },
                chatId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "chats"
                },
            },
            {
                timestamps: true,
            },
        );
        schema.plugin(uniqueValidator);
        mongoose.model('chatUsers', schema);
    }

    getInstance() {
        this.initSchema();
        return mongoose.model('chatUsers');
    }

    // eslint-disable-next-line class-methods-use-this
    getModel() {
        return mongoose.model('chatUsers');
    }
}

export default ChatUsersModel;
