export default interface ILinePersistence {
    id: string,
    code: string,
    name: string,
    terminalNodes: string[],
    colorRGB: { red: number, green: number, blue: number },
    allowedDriverTypes: string[],
    allowedVehicleTypes: string[]
}