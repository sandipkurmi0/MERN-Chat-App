import mongoose, { Schema } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

class ChatUsersModel {
    // eslint-disable-next-line class-methods-use-this
    initSchema() {
        const schema = new Schema(
            {
                chatName: {
                    type: String,
                    trim: true
                },
                users: [{
                    type: Schema.Types.ObjectId,
                    ref: "users"
                }],
                latestMessage: {
                    type: Schema.Types.ObjectId,
                    ref: "messages",
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
