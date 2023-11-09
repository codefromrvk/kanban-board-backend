import { NextFunction, Request, Response, Router } from 'express';
import { cardController } from '../controllers/card';

const router = Router();

router.get('/card/', cardController.getAllCards)
router.get('/card/:id', cardController.getCardById)
router.delete('/card/:id', cardController.deleteCard)
router.put('/card/:id', cardController.updateCard)
router.patch('/card/:id', cardController.updateCardStatus)
router.post('/card/', cardController.createCard)
router.get('/card/board/:boardId', cardController.getAllCardsByBoardId)

export {
    router
} 