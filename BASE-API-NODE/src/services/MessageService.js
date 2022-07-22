import Service from './Service';

class UserService extends Service {
    constructor(model) {
        super(model);
        this.sendMessage = this.sendMessage.bind(this);
        this.getChatMessages = this.getChatMessages.bind(this);
    }

    async sendMessage(item) {
        try {
            const data = await this.model.create(item)

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

    async getChatMessages(id) {
        try {
            const messages = await this.model.find({
                chatId: id.chatId
            })

            return {
                error: false,
                statusCode: 200,
                data: messages,
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

export default UserService;
