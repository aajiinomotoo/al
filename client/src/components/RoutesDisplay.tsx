import { ScrollArea } from '@/components/ui/scroll-area';
import { lineAStations, lineBStations } from '@shared/schema';
import { MapPin } from 'lucide-react';

export default function RoutesDisplay() {
  return (
    <div className="h-full" data-testid="routes-display">
      <ScrollArea className="h-full">
        <div className="space-y-6 px-4 py-4">
          {/* Line A */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
                <span className="text-white text-xs font-bold">A</span>
              </div>
              <h3 className="text-lg font-semibold">Line A Route</h3>
            </div>
            <div className="ml-3 border-l-2 border-blue-500 pl-6 space-y-3">
              {lineAStations.map((station, index) => (
                <div
                  key={station}
                  className="relative flex items-start gap-3"
                  data-testid={`station-line-a-${index}`}
                >
                  <div className="absolute -left-[27px] w-4 h-4 rounded-full bg-blue-500 border-2 border-background" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-blue-500" />
                      <span className="text-sm font-medium">{station}</span>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      Stop {index + 1} of {lineAStations.length}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Line B */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                <span className="text-white text-xs font-bold">B</span>
              </div>
              <h3 className="text-lg font-semibold">Line B Route</h3>
            </div>
            <div className="ml-3 border-l-2 border-green-500 pl-6 space-y-3">
              {lineBStations.map((station, index) => (
                <div
                  key={station}
                  className="relative flex items-start gap-3"
                  data-testid={`station-line-b-${index}`}
                >
                  <div className="absolute -left-[27px] w-4 h-4 rounded-full bg-green-500 border-2 border-background" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-green-500" />
                      <span className="text-sm font-medium">{station}</span>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      Stop {index + 1} of {lineBStations.length}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
