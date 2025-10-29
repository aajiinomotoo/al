import { z } from "zod";

// E-jeep Station locations
export const lineAStations = [
  "AGS E-Jeep Station",
  "Gate 2.5 E-Jeep Station",
  "Leong Hall E-Jeep Station",
  "Xavier Hall E-Jeep Station",
  "Cervini Hall E-Jeep Station",
  "Old Comms Building E-Jeep Station",
  "Loyola House of Studies E-Jeep Station",
] as const;

export const lineBStations = [
  "Arete E-Jeep Station",
  "Xavier Hall E-Jeep Station",
  "Cervini Hall E-Jeep Station",
  "Ateneo Junior High School E-Jeep Station",
  "Ateneo Senior High School FLC E-Jeep Station",
  "Bellarmine Hall E-Jeep Station",
  "Social Development Complex E-Jeep Station",
] as const;

export type LineAStation = typeof lineAStations[number];
export type LineBStation = typeof lineBStations[number];
export type Station = LineAStation | LineBStation;

// Station coordinates (Ateneo de Manila University campus)
export const stationCoordinates: Record<string, [number, number]> = {
  // Line A
  "AGS E-Jeep Station": [14.6387, 121.0776],
  "Gate 2.5 E-Jeep Station": [14.6395, 121.0765],
  "Leong Hall E-Jeep Station": [14.6408, 121.0758],
  "Xavier Hall E-Jeep Station": [14.6415, 121.0751],
  "Cervini Hall E-Jeep Station": [14.6422, 121.0745],
  "Old Comms Building E-Jeep Station": [14.6428, 121.0738],
  "Loyola House of Studies E-Jeep Station": [14.6435, 121.0732],
  
  // Line B
  "Arete E-Jeep Station": [14.6380, 121.0780],
  "Ateneo Junior High School E-Jeep Station": [14.6398, 121.0770],
  "Ateneo Senior High School FLC E-Jeep Station": [14.6405, 121.0762],
  "Bellarmine Hall E-Jeep Station": [14.6418, 121.0742],
  "Social Development Complex E-Jeep Station": [14.6425, 121.0735],
};

// E-jeep schema
export const eJeepSchema = z.object({
  id: z.string(),
  line: z.enum(["A", "B"]),
  recentStop: z.string(),
  nextStop: z.string(),
  eta: z.number(), // in minutes
  position: z.tuple([z.number(), z.number()]), // [lat, lng]
});

export type EJeep = z.infer<typeof eJeepSchema>;

// Route schema
export const routeSchema = z.object({
  line: z.enum(["A", "B"]),
  name: z.string(),
  stations: z.array(z.string()),
  color: z.string(),
});

export type Route = z.infer<typeof routeSchema>;
