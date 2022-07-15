import express from 'express';
import userRoutes from './userRoute';
import chatRoutes from './chatRoute';


const router = express.Router();

userRoutes(router);
chatRoutes(router);

export default router;
