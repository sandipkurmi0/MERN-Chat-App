import Controller from './Controller';
import Message from '../models/MessageModel';
import MessageService from '../services/MessageService';

const messageService = new MessageService(new Message().getInstance());

class MessageController extends Controller {
    constructor(service) {
        super(service);
        this.sendMessage = this.sendMessage.bind(this);
        this.getChatMessages = this.getChatMessages.bind(this);

    }

    async sendMessage(req, res) {
        let response = await this.service.sendMessage(req.body);
        return res.status(response.statusCode).send(response);
    }

    async getChatMessages(req, res) {
        const id = req.params
        let response = await this.service.getChatMessages(id);
        return res.status(response.statusCode).send(response);
    }
}
export default new MessageController(messageService);
