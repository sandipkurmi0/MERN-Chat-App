import MessageController from '../controllers/MessageController';
import auth from '../middleware/auth.middleware';

export default (router) => {
    router.post(`/api/message`, MessageController.insert);
    router.get(`/api/messages`, MessageController.getAll);
    router.get(`/api/message/:id`, auth, MessageController.get);
    router.put(`/api/message/:id`, auth, MessageController.update);
    router.delete(`/api/message/:id`, auth, MessageController.delete);
};
