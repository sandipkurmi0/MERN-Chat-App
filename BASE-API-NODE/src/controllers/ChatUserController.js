import Controller from './Controller';
import ChatUser from '../models/ChatUserModel';
import ChatUserService from '../services/ChatUserService';

const chatUserService = new ChatUserService(new ChatUser().getInstance());


class ChatUserController extends Controller {
    constructor(service) {
        super(service);
        this.accessChat = this.accessChat.bind(this);
        this.fetchChats = this.fetchChats.bind(this);

    }

    async accessChat(req, res) {
        const response = await this.service.accessChat(req, res);
        return res.status(response.statusCode).send(response);
    }

    async fetchChats(req, res) {
        const response = await this.service.fetchChats(req, res)
        return res.status(response.statusCode).send(response);
    }

}
export default new ChatUserController(chatUserService);
