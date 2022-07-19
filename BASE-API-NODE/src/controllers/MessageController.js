import Controller from './Controller';
import Message from '../models/MessageModel';
import MessageService from '../services/MessageService';

const messageService = new MessageService(new Message().getInstance());

class MessageController extends Controller {
    constructor(service) {
        super(service);
    }

}
export default new MessageController(messageService);
