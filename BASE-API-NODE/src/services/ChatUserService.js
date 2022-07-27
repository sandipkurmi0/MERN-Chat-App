import Service from './Service';
import User from '../models/UserModel';

var userModel = new User().getModel();  //create instace 


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
            console.log('userId params not sent with request');
            return res.sendStatus(400);
        }

        var isChat = await this.model.find({
            $and: [
                { users: { $elemMatch: { $eq: req.user.id } } },
                { users: { $elemMatch: { $eq: userId } } },

            ],
        }).populate('users', "-password")
            .populate('latestMessage')

        isChat = await userModel.populate(isChat, {
            path: 'latestMessage.sender',
            select: 'name pic email'
        })

        if (isChat.length > 0) {
            const data = isChat[0];
            return {
                error: false,
                statusCode: 200,
                data: data,
            }

        } else {
            console.log('sdsdsdsdsd else');
            var chatData = {
                chatName: 'sender',
                users: [req.user.id, userId]
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
        console.log(req.user.id)
        try {
            let results = await this.model.find({ users: { $elemMatch: { $eq: req.user.id } } })
                .populate('users', "-password")
                .populate('latestMessage')
                .sort({ updatedAt: -1 })

            results = await userModel.populate(results, {
                path: 'latestMessage.sender',
                select: 'name pic email'
            });

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
