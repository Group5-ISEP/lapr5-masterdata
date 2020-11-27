import { IUserPersistence } from '../../dataschema/IUserPersistence';
import mongoose from 'mongoose';

const NodeSchema = new mongoose.Schema(
    {
        shortName: {
            type: String,
            required: [true, 'Please enter node name'],
        },

        name: {
            type: String,
            required: [true, 'Please enter node name'],
        },

        isDepot: {
            type: Boolean,
            required: [true, 'Please enter if the node is a depot stop'],
        },

        isReliefPoint: {
            type: Boolean,
            required: [true, 'Please enter if the node is a relief point'],
        },

        longitude: {
            type: Number,
            required: [true, 'Please enter the nodes longitude'],
        },

        latitude: {
            type: Number,
            required: [true, 'Please enter the nodes latitude'],
        },
    },
    { timestamps: true },
);

export default mongoose.model<IUserPersistence & mongoose.Document>('Node', NodeSchema);
