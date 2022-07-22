import express from 'express';
import userRoutes from './userRoute';
import messageRoutes from './messageRoute';
import chatRoutes from './chatRoute'

const router = express.Router();

userRoutes(router);
messageRoutes(router);
chatRoutes(router);

export default router;
