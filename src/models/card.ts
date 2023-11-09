import mongoose from 'mongoose';

// User Config
const CardSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, required: true },
    position: { type: Number, required: true },
    board: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Board',
        required: true
    },
}, { timestamps: true });

export const CardModel = mongoose.model('Card', CardSchema);