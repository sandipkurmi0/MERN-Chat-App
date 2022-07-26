import Service from './Service';

class ChatService extends Service {
    constructor(model) {
        super(model);
        this.newChat = this.newChat.bind(this);
        this.getAllUserChat = this.getAllUserChat.bind(this);
    }

    async newChat(item) {
        try {
            var data = await this.model.create({
                members: [item.senderId, item.reciverId],
            })

            return {
                error: false,
                statusCode: 200,
                data: data,
            }

        } catch (error) {
            return {
                error: error.message,
                statusCode: 400,
                data: null
            }
        }
    }


    async getAllUserChat(id) {
        try {
            const chats = await this.model.find({
                members: { $in: [id.userId] }
            })

            return {
                error: false,
                statusCode: 200,
                data: chats,
            }

        } catch (error) {
            return {
                error: error.message,
                statusCode: 400,
                data: null
            }
        }
    }
}

export default ChatService;
