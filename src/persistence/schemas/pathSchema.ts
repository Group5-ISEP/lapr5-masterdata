import { IPathPersistence } from '../../dataschema/IPathPersistence';
import mongoose from 'mongoose';
//import { Segment } from '../../domain/segment';

const PathSchema = new mongoose.Schema(
    {
        lineCode: {
            type: String,
            required: [true, 'Please enter the line of the path'],
        },

        direction: {
            type: String,
            required: [true, 'Please enter the paths direction']
        },

        segmentList: {
            type: [{
                startNode: String,
                endNode: String,
                duration: Number,
                distance: Number,
                order: Number
            }],
            required: [true, 'Please enter the segment list of the path'],
        },

        firstNode: {
            type: String,
            required: true,
        },

        lastNode: {
            type: String,
            required: true,
        },

    },
    { timestamps: true },
);

export default mongoose.model<IPathPersistence & mongoose.Document>('PathSchema', PathSchema);
