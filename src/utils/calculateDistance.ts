import IPosition from '../interface/IPosition';

export default function calculateDistance(point1: IPosition, point2: IPosition): number {
  const earthRadius = 6371000;
  const deltaLat = deg2rad(point2.lat - point1.lat);
  const deltaLng = deg2rad(point2.lng - point1.lng);
  const a =
    Math.sin(deltaLat / 2) * Math.sin(deltaLng / 2) +
    Math.cos(deg2rad(point1.lat)) * Math.cos(deg2rad(point2.lat)) * Math.sin(deltaLng / 2) * Math.sin(deltaLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return earthRadius * c;
}

function deg2rad(deg: number) {
  return deg * (Math.PI / 180);
}
