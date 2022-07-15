import ChatController from '../controllers/ChatController';
import auth from '../middleware/auth.middleware';

export default (router) => {
    router.post(`/api/chat`, auth, ChatController.insert);
    router.post(`/api/chat/group`, auth, ChatController.insert);
    router.get(`/api/chat`, auth, ChatController.getAll);
    router.get(`/api/chat/:id`, auth, ChatController.get);
    router.put(`/api/chat/group/:id`, auth, ChatController.update);
    router.delete(`/api/chat/group/:id`, auth, ChatController.delete);
};
