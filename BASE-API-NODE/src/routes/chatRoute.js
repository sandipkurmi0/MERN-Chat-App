import ChatController from '../controllers/ChatController';
import auth from '../middleware/auth.middleware';

export default (router) => {
    router.post(`/api/chat`, ChatController.newChat);
    router.get(`/api/chat/:userId`, ChatController.getAllUserChat);

};
