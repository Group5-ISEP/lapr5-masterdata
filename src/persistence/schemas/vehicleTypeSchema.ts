import mongoose from 'mongoose';
import IVehicleTypePersistence from '../../dataschema/IVehicleTypePersistence';

const vehicleType = new mongoose.Schema(
    {
        id: {
            type: String,
            required: [true, 'Please enter type id'],
            index: true,
            unique: true
        },
        name: {
            type: String,
            required: [true, 'Please enter type name'],
            unique: true
        },
        autonomy: {
            type: Number,
            required: [true, 'Please enter type autonomy'],
        },
        costByKm: {
            type: Number,
            required: [true, 'Please enter type cost by km'],
        },
        averageConsumption: {
            type: Number,
            required: [true, 'Please enter type average consumption'],
        },
        averageSpeed: {
            type: Number,
            required: [true, 'Please enter type average speed'],
        },
        emissions: {
            type: Number,
            required: [true, 'Please enter type emissions'],
        },
        energySource: {
            type: String,
            required: [true, 'Please enter type energy source']
        }
    },
    { timestamps: true },
);

export default mongoose.model<IVehicleTypePersistence & mongoose.Document>('VehicleType', vehicleType);
