import Controller from './Controller';
import Chat from '../models/ChatModel';
// import ChatUesr from '../models/ChatUserModel'
import ChatService from '../services/ChatService';
const chatService = new ChatService(new Chat().getInstance());


class ChatController extends Controller {
    constructor(service) {
        super(service);
        this.getAllUserChat = this.getAllUserChat.bind(this);
        this.newChat = this.newChat.bind(this);

    }

    async newChat(req, res) {
        let response = await this.service.newChat(req.body);
        return res.status(response.statusCode).send(response);
    }

    async getAllUserChat(req, res) {
        const id = req.params;
        let response = await this.service.getAllUserChat(id);
        return res.status(response.statusCode).send(response);
    }

}
export default new ChatController(chatService);
