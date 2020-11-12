import { IUserPersistence } from '../../dataschema/IUserPersistence';
import mongoose from 'mongoose';

const DriverType = new mongoose.Schema(
    {
        description: { type: String }
    },
    { timestamps: true },
);

export default mongoose.model<IUserPersistence & mongoose.Document>('DriverTypeSchema', DriverType);
