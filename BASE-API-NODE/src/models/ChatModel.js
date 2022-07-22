import mongoose, { Schema } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

class ChatsModel {
    // eslint-disable-next-line class-methods-use-this
    initSchema() {
        const schema = new Schema(
            {
                members: {
                    type: Array,
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

export default ChatsModel;
