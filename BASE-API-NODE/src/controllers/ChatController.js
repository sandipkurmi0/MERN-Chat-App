import Controller from './Controller';
import Chat from '../models/ChatModel';
import ChatService from '../services/ChatService';

const chatService = new ChatService(new Chat().getInstance());

class ChatController extends Controller {
    constructor(service) {
        super(service);
        this.accessChat = this.accessChat.bind(this);

    }

    //   async addUser(req, res) {
    //     const hash = bcrypt.hashSync(req.body.password, 10);
    //     var userData = req.body;
    //     userData.password = hash;
    //     let response = await this.service.insert(userData);
    //     return res.status(response.statusCode).send(response);
    //   }

    //@description     Create or fetch One to One Chat
    //@route           POST /api/chat/
    //@access          Protected

    async accessChat(req, res) {
        const data = req.body;
        let response = await this.service.insert(req.body, req.user._id);
        return res.status(response.statusCode).send(response);
    }


}

export default new ChatController(chatService);
