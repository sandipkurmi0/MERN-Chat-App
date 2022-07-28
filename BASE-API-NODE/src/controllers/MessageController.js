import Controller from './Controller';
import Message from '../models/MessageModel';
import MessageService from '../services/MessageService';

const messageService = new MessageService(new Message().getInstance());

class MessageController extends Controller {
    constructor(service) {
        super(service);
        this.sendMessage = this.sendMessage.bind(this);
        this.allMessages = this.allMessages.bind(this);

    }

    async sendMessage(req, res) {
        let response = await this.service.sendMessage(req, res);
        return res.status(response.statusCode).send(response);
    }

    async allMessages(req, res) {
        let response = await this.service.allMessages(req, res);
        return res.status(response.statusCode).send(response);
    }
}
export default new MessageController(messageService);
