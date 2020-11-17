export default interface IVehicleTypePersistence {
    name: string,
    autonomy: number,
    costByKm: number,
    averageConsumption: number,
    averageSpeed: number,
    emissions: number,
    energySource: string
}