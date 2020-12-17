import ILinePersistence from "../../dataschema/ILinePersistence";
import mongoose from "mongoose";

const Line = new mongoose.Schema(
    {
        id: {
            type: String,
            required: [true, 'Please enter line id'],
            index: true,
            unique: true
        },
        code: {
            type: String,
            required: [true, 'Please enter line code'],
            unique: true
        },
        name: {
            type: String,
            required: [true, 'Please enter line name'],
        },
        terminalNodes: [String],
        colorRGB: { red: Number, green: Number, blue: Number },
        allowedDriverTypes: [String],
        allowedVehicleTypes: [String]
    },
    { timestamps: true },
);

export default mongoose.model<ILinePersistence & mongoose.Document>('Line', Line);
