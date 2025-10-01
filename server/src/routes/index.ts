import { Router } from 'express';
import roomRoutes from '../module/room/room.route';


const router = Router();

const moduleRoutes = [
  {
    path: '/room',
    route: roomRoutes,
  },
  
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;