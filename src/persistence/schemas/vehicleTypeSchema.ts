import mongoose from 'mongoose';
import IVehicleTypePersistence from '../../dataschema/IVehicleTypePersistence';

const vehicleType = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please enter type name'],
            index: true
        },
        autonomy: Number,
        costByKm: Number,
        averageConsumption: Number,
        averageSpeed: Number,
        emissions: Number,
        energySource: String
    },
    { timestamps: true },
);

export default mongoose.model<IVehicleTypePersistence & mongoose.Document>('VehicleType', vehicleType);
