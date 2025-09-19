
import { Router } from 'express';
import { getUserProfile } from './users.controller';

const router = Router();

router.get('/:username', getUserProfile);

export default router;
