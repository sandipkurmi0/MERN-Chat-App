import UserController from '../controllers/UserController';
import auth from '../middleware/auth.middleware';

export default (router) => {
    router.post(`/api/user`, UserController.addUser);
    router.get(`/api/user`, UserController.getAll);
    router.post(`/api/register`, UserController.registerUser)
    router.post(`/api/login`, UserController.login);
    router.get(`/api/getUserByQuery`, UserController.getUserByQuery)
    router.get(`/api/search`, auth, UserController.search);

};
