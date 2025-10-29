import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import { useEffect, useMemo } from 'react';
import type { EJeep } from '@shared/schema';
import { stationCoordinates, lineAStations, lineBStations } from '@shared/schema';

// Fix default marker icons
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

// Custom icons for different station types
const createStationIcon = (color: string) => {
  return L.divIcon({
    className: 'custom-station-icon',
    html: `<div style="background-color: ${color}; width: 14px; height: 14px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
  });
};

const createEJeepIcon = (color: string) => {
  return L.divIcon({
    className: 'custom-ejeep-icon',
    html: `<div style="background-color: ${color}; width: 20px; height: 20px; border-radius: 4px; border: 3px solid white; box-shadow: 0 2px 6px rgba(0,0,0,0.4); position: relative;">
      <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 8px; height: 8px; background: white; border-radius: 50%;"></div>
    </div>`,
    iconSize: [26, 26],
    iconAnchor: [13, 13],
  });
};

interface EJeepMapProps {
  ejeeps: EJeep[];
  selectedEJeepId?: string | null;
  highlightedRoute?: 'A' | 'B' | null;
  onRouteClick?: (line: 'A' | 'B') => void;
}

function MapController({ selectedEJeepId, ejeeps }: { selectedEJeepId?: string | null; ejeeps: EJeep[] }) {
  const map = useMap();

  useEffect(() => {
    if (selectedEJeepId) {
      const ejeep = ejeeps.find(e => e.id === selectedEJeepId);
      if (ejeep) {
        map.flyTo(ejeep.position, 17, { duration: 0.5 });
      }
    }
  }, [selectedEJeepId, ejeeps, map]);

  return null;
}

export default function EJeepMap({ ejeeps, selectedEJeepId, highlightedRoute, onRouteClick }: EJeepMapProps) {
  const center: [number, number] = [14.6408, 121.0758];

  // Line A route coordinates
  const lineACoords = useMemo(() => 
    lineAStations.map(station => stationCoordinates[station as string]),
    []
  );

  // Line B route coordinates
  const lineBCoords = useMemo(() => 
    lineBStations.map(station => stationCoordinates[station as string]),
    []
  );

  const lineAColor = '#3b82f6'; // blue
  const lineBColor = '#10b981'; // green

  return (
    <div className="h-full w-full" data-testid="map-container">
      <MapContainer
        center={center}
        zoom={16}
        minZoom={15}
        maxZoom={18}
        className="h-full w-full"
        zoomControl={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Line A Route */}
        <Polyline
          positions={lineACoords}
          pathOptions={{
            color: lineAColor,
            weight: highlightedRoute === 'A' ? 6 : 4,
            opacity: highlightedRoute === 'A' ? 0.9 : 0.6,
          }}
          eventHandlers={{
            click: () => onRouteClick?.('A'),
          }}
        />

        {/* Line B Route */}
        <Polyline
          positions={lineBCoords}
          pathOptions={{
            color: lineBColor,
            weight: highlightedRoute === 'B' ? 6 : 4,
            opacity: highlightedRoute === 'B' ? 0.9 : 0.6,
          }}
          eventHandlers={{
            click: () => onRouteClick?.('B'),
          }}
        />

        {/* Line A Stations */}
        {lineAStations.map((station) => {
          const coords = stationCoordinates[station as string];
          return (
            <Marker
              key={station}
              position={coords}
              icon={createStationIcon(lineAColor)}
            >
              <Popup>
                <div className="text-sm">
                  <div className="font-semibold">{station}</div>
                  <div className="text-xs text-muted-foreground">Line A</div>
                </div>
              </Popup>
            </Marker>
          );
        })}

        {/* Line B Stations */}
        {lineBStations.map((station) => {
          const coords = stationCoordinates[station as string];
          return (
            <Marker
              key={station}
              position={coords}
              icon={createStationIcon(lineBColor)}
            >
              <Popup>
                <div className="text-sm">
                  <div className="font-semibold">{station}</div>
                  <div className="text-xs text-muted-foreground">Line B</div>
                </div>
              </Popup>
            </Marker>
          );
        })}

        {/* E-jeeps */}
        {ejeeps.map((ejeep) => {
          const color = ejeep.line === 'A' ? lineAColor : lineBColor;
          const isSelected = selectedEJeepId === ejeep.id;
          
          return (
            <Marker
              key={ejeep.id}
              position={ejeep.position}
              icon={createEJeepIcon(color)}
              zIndexOffset={isSelected ? 1000 : 0}
            >
              <Popup>
                <div className="text-sm">
                  <div className="font-semibold">Line {ejeep.line}</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Recent: {ejeep.recentStop}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Next: {ejeep.nextStop}
                  </div>
                  <div className="text-xs font-medium mt-1">
                    ETA: {ejeep.eta} min
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}

        <MapController selectedEJeepId={selectedEJeepId} ejeeps={ejeeps} />
      </MapContainer>
    </div>
  );
}
