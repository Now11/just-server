import { Router } from 'express';
import { UserService } from '../../services/user.service';

const userService = new UserService();
const router = Router();

router.get('/:id', userService.getUser).get('/', userService.getAllUsers);

export default router;
