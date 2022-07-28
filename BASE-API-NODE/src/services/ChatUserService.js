import Service from './Service';
import User from '../models/UserModel';
import Message from '../models/MessageModel';

var userModel = new User().getModel();  //create instace 
var messageModel = new Message().getModel();  //create instace

class ChatUserService extends Service {
    constructor(model) {
        super(model);
        this.accessChat = this.accessChat.bind(this);
    }


    //createing and fatching one and one chats
    async accessChat(req, res) {
        const { userId } = req.body
        // var userModel = new User().getModel();  //create instace 
        // const newuser = await userModel.findById(userId)  //now we can perform any opreation on it

        if (!userId) {
            return {
                error: 'userId params not sent with request',
                statusCode: 400,
                data: null
            }
        }

        var isChat = await this.model.find({
            $and: [
                { users: { $elemMatch: { $eq: req.user.id } } },
                { users: { $elemMatch: { $eq: userId } } },
            ],
        })

        if (isChat.length > 0) {
            var isChat = await messageModel.find().populate("sender").populate("chat").sort([['createdAt', -1]]);
            const data = isChat;
            return {
                error: false,
                statusCode: 200,
                data: data,
            }

        } else {
            var chatData = {
                chatName: 'sender',
                users: [req.user.id, userId],

            }

            try {

                const createdChat = await this.model.create(chatData)

                const fullChat = await this.model.findOne({ _id: createdChat._id }).populate('users', "-password")

                return {
                    error: false,
                    statusCode: 200,
                    data: fullChat,
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

    async fetchChats(req, res) {
        try {
            let results = await this.model.find({ users: { $elemMatch: { $eq: req.user.id } } })
                .populate('users', "-password")
                .populate('latestMessage')
                .sort({ updatedAt: -1 })

            var isChat = await messageModel.find().populate("sender").populate("chat").sort([['createdAt', -1]]);

            console.log('first', isChat)



            return {
                error: false,
                statusCode: 200,
                data: results,

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

export default ChatUserService;
