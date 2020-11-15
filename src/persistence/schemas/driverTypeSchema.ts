import mongoose from 'mongoose';
import { IDriverTypePersistence } from '../../dataschema/IDriverTypePersistence';

const DriverType = new mongoose.Schema(
    {
        description: {
            type: String,
            required: [true, 'Please enter type description'],
            index: true
        },
    },
    { timestamps: true },
);

export default mongoose.model<IDriverTypePersistence & mongoose.Document>('DriverType', DriverType);
