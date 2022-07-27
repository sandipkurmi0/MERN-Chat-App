import express from 'express';
import userRoutes from './userRoute';
import messageRoutes from './messageRoute';
import chatUserRoute from './chatUserRoute'

const router = express.Router();

userRoutes(router);
messageRoutes(router);
chatUserRoute(router);

export default router;
