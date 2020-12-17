import mongoose from 'mongoose';
import { IDriverTypePersistence } from '../../dataschema/IDriverTypePersistence';

const DriverType = new mongoose.Schema(
    {
        id: {
            type: String,
            required: [true, 'Please enter type id'],
            index: true,
            unique: true
        },
        description: {
            type: String,
            required: [true, 'Please enter type description'],
        },
    },
    { timestamps: true },
);

export default mongoose.model<IDriverTypePersistence & mongoose.Document>('DriverType', DriverType);
