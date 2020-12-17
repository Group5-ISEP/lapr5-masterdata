export default interface IVehicleTypePersistence {
    id: string,
    name: string,
    autonomy: number,
    costByKm: number,
    averageConsumption: number,
    averageSpeed: number,
    emissions: number,
    energySource: string
}