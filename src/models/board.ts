import mongoose from 'mongoose';

// User Config
const BoardSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
});

export const BoardModel = mongoose.model('Board', BoardSchema);