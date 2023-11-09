import { NextFunction, Request, Response, Router } from 'express';
import { CardModel } from '../models/card';
import { BoardModel } from '../models/board';

export const cardController = {
    getCardById: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params
            const cards = await CardModel.findById(id)
            res.json(cards);

        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });

        }
    },
    getAllCardsByBoardId: async (req: Request, res: Response, next: NextFunction) => {
        try {

            const { boardId } = req.params
            const cards = await CardModel.find({
                board: boardId
            })
            const modifiedResult: Record<string, Array<any>> = {
                todo: [],
                inProgress: [],
                completed: [],
                board: []
            }
            for (let card of cards) {
                if (modifiedResult[card.status]) {
                    modifiedResult[card.status] = [...modifiedResult[card.status], card]
                } else {
                    modifiedResult[card.status] = [card]
                }
            }
            const board = await BoardModel.find({
                _id: boardId
            })


            res.json({ ...modifiedResult, board });

        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });

        }
    },
    getAllCards: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const cards = await CardModel.find()
            res.json(cards);

        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });

        }
    },
    createCard: async (req: Request, res: Response, next: NextFunction) => {

        try {
            const { name, description, status, boardId } = req.body;

            const lastCard = await CardModel.findOne({}).sort({ position: 'desc' }).limit(1)
            const position = !lastCard ? 0 : lastCard.position + 1
            const card = new CardModel({
                name, description, status, position, board: {
                    _id: boardId
                }
            })
            const data = await card.save();
            res.json(data);

        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });

        }
    },
    updateCard: async (req: Request, res: Response, next: NextFunction) => {

        try {
            const { name, description, position, status } = req.body
            const { id } = req.params
            const card = await CardModel.findByIdAndUpdate(id, { name, description, position, status }, { new: true })
            res.json(card);

        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });

        }
    },
    updateCardStatus: async (req: Request, res: Response, next: NextFunction) => {

        try {
            const { status, position } = req.body
            const { id } = req.params

            const card = await CardModel.findByIdAndUpdate(id, { status, position }, { new: true })

            res.json(card);

        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });

        }
    },
    deleteCard: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const cardId = await CardModel.findOneAndDelete({ _id: id });
            res.json(cardId);

        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });

        }
    }
}