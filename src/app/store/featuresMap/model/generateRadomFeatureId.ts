export const  generateRandomFeatureId = (index: number, latitude: number, longitude: number): string  => {
    return `${index}-${latitude}-${longitude}`;
}