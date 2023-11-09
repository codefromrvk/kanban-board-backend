import { NextFunction, Request, Response, Router } from 'express';
import { BoardModel } from '../models/board';

export const boardController = {
    getBoardById: async (req: Request, res: Response, next: NextFunction) => {
        try {

            const { id } = req.params
            const boards = await BoardModel.findById(id)
            res.json(boards);
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });

        }
    },
    getAllBoards: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const boards = await BoardModel.find()
            res.json(boards);

        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });

        }
    },
    createBoard: async (req: Request, res: Response, next: NextFunction) => {

        try {
            const { name, description } = req.body
            const board = new BoardModel({ name, description })
            const data = await board.save();
            res.json(data);

        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });

        }
    },
    updateBoard: async (req: Request, res: Response, next: NextFunction) => {

        try {
            const { name, description } = req.body;
            
            const { id } = req.params
            const board = await BoardModel.findByIdAndUpdate(id, { name, description }, { new: true })
            
            res.json(board);

        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });

        }
    },
    deleteBoard: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const boardId = await BoardModel.findOneAndDelete({ _id: id });
            
            res.json(boardId);

        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });

        }
    }
}