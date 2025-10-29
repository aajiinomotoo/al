import { useState, useEffect } from 'react';
import EJeepMap from '@/components/EJeepMap';
import RunningEJeepsTable from '@/components/RunningEJeepsTable';
import RoutesDisplay from '@/components/RoutesDisplay';
import { Button } from '@/components/ui/button';
import { Bus, Route as RouteIcon } from 'lucide-react';
import type { EJeep } from '@shared/schema';

//todo: remove mock functionality
const generateMockEJeeps = (): EJeep[] => {
  return [
    {
      id: '1',
      line: 'A',
      recentStop: 'AGS E-Jeep Station',
      nextStop: 'Gate 2.5 E-Jeep Station',
      eta: 3,
      position: [14.6390, 121.0770],
    },
    {
      id: '2',
      line: 'A',
      recentStop: 'Leong Hall E-Jeep Station',
      nextStop: 'Xavier Hall E-Jeep Station',
      eta: 2,
      position: [14.6412, 121.0754],
    },
    {
      id: '3',
      line: 'B',
      recentStop: 'Arete E-Jeep Station',
      nextStop: 'Xavier Hall E-Jeep Station',
      eta: 4,
      position: [14.6388, 121.0775],
    },
    {
      id: '4',
      line: 'B',
      recentStop: 'Bellarmine Hall E-Jeep Station',
      nextStop: 'Social Development Complex E-Jeep Station',
      eta: 5,
      position: [14.6420, 121.0738],
    },
  ];
};

type ViewMode = 'running' | 'routes';

export default function Home() {
  const [viewMode, setViewMode] = useState<ViewMode>('running');
  const [selectedEJeepId, setSelectedEJeepId] = useState<string | null>(null);
  const [highlightedRoute, setHighlightedRoute] = useState<'A' | 'B' | null>(null);
  const [ejeeps, setEJeeps] = useState<EJeep[]>(generateMockEJeeps());

  //todo: remove mock functionality - simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setEJeeps(prev => prev.map(ejeep => {
        const newEta = Math.max(1, ejeep.eta - 1);
        return {
          ...ejeep,
          eta: newEta === 1 ? Math.floor(Math.random() * 5) + 2 : newEta,
        };
      }));
    }, 10000); // Update every 10 seconds

    return () => clearInterval(interval);
  }, []);

  const handleEJeepSelect = (ejeepId: string) => {
    const newId = ejeepId === selectedEJeepId ? null : ejeepId;
    setSelectedEJeepId(newId);
    
    if (newId) {
      const ejeep = ejeeps.find(e => e.id === newId);
      if (ejeep) {
        setHighlightedRoute(ejeep.line);
      }
    } else {
      setHighlightedRoute(null);
    }
  };

  const handleRouteClick = (line: 'A' | 'B') => {
    setHighlightedRoute(prev => prev === line ? null : line);
    setSelectedEJeepId(null);
  };

  return (
    <div className="h-screen w-full flex flex-col md:flex-row overflow-hidden">
      {/* Map Section */}
      <div className="flex-1 relative">
        <EJeepMap
          ejeeps={ejeeps}
          selectedEJeepId={selectedEJeepId}
          highlightedRoute={highlightedRoute}
          onRouteClick={handleRouteClick}
        />
      </div>

      {/* Side Panel */}
      <div className="w-full md:w-[400px] bg-background border-l border-border flex flex-col">
        {/* Header with Navigation */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold">Ateneo E-Jeep Tracker</h1>
            <div className="flex gap-2">
              <Button
                size="icon"
                variant={viewMode === 'routes' ? 'default' : 'ghost'}
                onClick={() => setViewMode('routes')}
                style={{ transition: 'opacity 3s' }}
                className="hover:opacity-70"
                data-testid="button-routes"
              >
                <RouteIcon className="w-5 h-5" />
              </Button>
              <Button
                size="icon"
                variant={viewMode === 'running' ? 'default' : 'ghost'}
                onClick={() => setViewMode('running')}
                style={{ transition: 'opacity 3s' }}
                className="hover:opacity-70"
                data-testid="button-running-ejeeps"
              >
                <Bus className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-hidden">
          {viewMode === 'running' ? (
            <div className="h-full p-4">
              <h2 className="text-lg font-semibold mb-4">Running E-Jeeps</h2>
              <div className="h-[calc(100%-3rem)]">
                <RunningEJeepsTable
                  ejeeps={ejeeps}
                  onEJeepSelect={handleEJeepSelect}
                  selectedEJeepId={selectedEJeepId}
                />
              </div>
            </div>
          ) : (
            <div className="h-full">
              <div className="p-4 pb-2">
                <h2 className="text-lg font-semibold">Routes</h2>
              </div>
              <div className="h-[calc(100%-4rem)]">
                <RoutesDisplay />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
