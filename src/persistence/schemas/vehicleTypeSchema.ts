import { IUserPersistence } from '../../dataschema/IUserPersistence';
import mongoose from 'mongoose';

const VehicleType = new mongoose.Schema(
    {
        description: { type: String }
    },
    { timestamps: true },
);

export default mongoose.model<IUserPersistence & mongoose.Document>('VehicleTypeSchema', VehicleType);
