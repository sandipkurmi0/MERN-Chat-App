import MessageController from '../controllers/MessageController';
import auth from '../middleware/auth.middleware';

export default (router) => {
    router.post(`/api/message`, MessageController.sendMessage);
    router.get(`/api/message/:chatId`, MessageController.getChatMessages);

};
