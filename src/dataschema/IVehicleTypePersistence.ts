export default interface IVehicleTypePersistence {
    _id: string,
    name: string,
    autonomy: number,
    costByKm: number,
    averageConsumption: number,
    averageSpeed: number,
    emissions: number,
    energySource: string
}