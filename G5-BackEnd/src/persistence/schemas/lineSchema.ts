import ILinePersistence from "../../dataschema/ILinePersistence";
import mongoose from "mongoose";

const Line = new mongoose.Schema(
    {
        code: {
            type: String,
            required: [true, 'Please enter line code'],
            index: true
        },
        name: {
            type: String,
            required: [true, 'Please enter line name'],
            index: true
        },
        terminalNodes: [String],
        colorRGB: { red: Number, green: Number, blue: Number },
        allowedDriverTypes: [String],
        allowedVehicleTypes: [String]
    },
    { timestamps: true },
);

export default mongoose.model<ILinePersistence & mongoose.Document>('Line', Line);
