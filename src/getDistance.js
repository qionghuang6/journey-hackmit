// Expects two geolocation points
export default function getDistance(pointOne, pointTwo) {
  const lon1 = (pointOne.lon * Math.PI) / 180;
  const lon2 = (pointTwo.lon * Math.PI) / 180;
  const lat1 = (pointOne.lat * Math.PI) / 180;
  const lat2 = (pointTwo.lat * Math.PI) / 180;

  // Haversine formula
  let dlon = lon2 - lon1;
  let dlat = lat2 - lat1;
  let a =
    Math.pow(Math.sin(dlat / 2), 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dlon / 2), 2);

  let c = 2 * Math.asin(Math.sqrt(a));

  // 3956 is the radius of the earth in miles
  return c * 3956;
}
