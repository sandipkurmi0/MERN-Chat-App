import MessageController from '../controllers/MessageController';
import auth from '../middleware/auth.middleware';

export default (router) => {
    router.post(`/api/message`, auth, MessageController.sendMessage);
    router.get(`/api/message/:chatId`, auth, MessageController.allMessages);

};
