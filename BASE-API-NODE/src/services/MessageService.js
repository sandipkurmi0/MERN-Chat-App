import Service from './Service';
import User from '../models/UserModel';

var userModel = new User().getModel();  //create instace of userModel


class UserService extends Service {
    constructor(model) {
        super(model);
        this.sendMessage = this.sendMessage.bind(this);
        this.allMessages = this.allMessages.bind(this);
    }

    async sendMessage(req, res) {
        const { content, chatId } = req.body

        if (!content || !chatId) {
            return {
                error: "Invalid data passed into request",
                statusCode: 400,
                data: null
            }
        }

        var newMessage = {
            sender: req.user.id,
            content: content,
            chat: chatId
        }


        try {

            var message = await this.model.create(newMessage)

            message = await message.populate("sender", "name pic")

            message = await message.populate("chat")

            message = await userModel.populate(message, {
                path: 'chatUsers.users',
                select: 'name pic email'
            })

            await this.model.findByIdAndUpdate(req.body.chatId, {
                latestMessage: message,
            })

            return {
                error: false,
                statusCode: 200,
                data: message,
            }

        } catch (error) {
            return {
                error: error.message,
                statusCode: 400,
                data: null
            }
        }
    }

    async allMessages(req, res) {

        try {

            const messages = await this.model.find({ chat: req.params.chatId }).populate("sender", "name pic email").populate('chat')

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
