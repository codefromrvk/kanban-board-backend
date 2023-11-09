import { NextFunction, Request, Response, Router } from 'express';
import { boardController } from '../controllers/board';

const router = Router();

router.get('/board/', boardController.getAllBoards)
router.get('/board/:id', boardController.getBoardById)
router.delete('/board/:id', boardController.deleteBoard)
router.put('/board/:id', boardController.updateBoard)
router.post('/board/', boardController.createBoard)

export {
    router
} 