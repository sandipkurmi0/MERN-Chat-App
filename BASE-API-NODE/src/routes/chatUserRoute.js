import ChatUserController from '../controllers/ChatUserController';
import auth from '../middleware/auth.middleware';

export default (router) => {
    router.post(`/api/chat`, auth, ChatUserController.accessChat);
    router.get(`/api/chat`, auth, ChatUserController.fetchChats);
    // router.post(`/api/chat/group`, auth, ChatUserController.createGroupChat);
    // router.put(`/api/chat/rename`, auth, ChatUserController.renameFromGroup);
    // router.put(`/api/chat/groupremove`, auth, ChatUserController.removeFromGroup);
    // router.put(`/api/chat/groupadd`, auth, ChatUserController.addToGroup);

};
