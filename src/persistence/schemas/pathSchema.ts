import { IUserPersistence } from '../../dataschema/IUserPersistence';
import { Segment } from '../../domain/segment';
import mongoose from 'mongoose';

const PathSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please enter node name'],
            index: true,
        },

        segmentList: {
            type: [ Segment
                /*{
                startNode: String,
                endNode: String,
                duration: Number,
                distance: Number,
                order: Number,
                }*/
            ],
            required: [true, 'Please enter the segment list'],
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

export default mongoose.model<IUserPersistence & mongoose.Document>('PathSchema', PathSchema);
