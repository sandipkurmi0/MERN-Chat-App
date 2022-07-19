import express from 'express';
import userRoutes from './userRoute';
import messageRoute from './messageRoute';


const router = express.Router();

userRoutes(router);
messageRoute(router);

export default router;
