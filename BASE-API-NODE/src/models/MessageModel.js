import mongoose, { Schema } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

class MessageModel {
    // eslint-disable-next-line class-methods-use-this
    initSchema() {
        const schema = new Schema(
            {
                from: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'users'
                },
                to: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'users',
                },
                message: {
                    type: String,
                    trim: true
                },
                type: {
                    type: String,
                    enum: ['send', 'received'],
                    required: true,
                }
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
