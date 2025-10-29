import { useState } from 'react';
import type { EJeep } from '@shared/schema';
import { ScrollArea } from '@/components/ui/scroll-area';

interface RunningEJeepsTableProps {
  ejeeps: EJeep[];
  onEJeepSelect: (ejeepId: string) => void;
  selectedEJeepId?: string | null;
}

export default function RunningEJeepsTable({ ejeeps, onEJeepSelect, selectedEJeepId }: RunningEJeepsTableProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const handleRowClick = (ejeepId: string) => {
    onEJeepSelect(ejeepId === selectedEJeepId ? '' : ejeepId);
  };

  return (
    <div className="h-full flex flex-col" data-testid="running-ejeeps-table">
      <ScrollArea className="flex-1">
        <table className="w-full">
          <thead className="sticky top-0 bg-background z-10">
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">
                Line
              </th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">
                Recent Stop
              </th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">
                Next Stop
              </th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">
                ETA
              </th>
            </tr>
          </thead>
          <tbody>
            {ejeeps.map((ejeep) => {
              const isHovered = hoveredId === ejeep.id;
              const isSelected = selectedEJeepId === ejeep.id;
              const isActive = isHovered || isSelected;

              return (
                <tr
                  key={ejeep.id}
                  className={`
                    border-b border-border cursor-pointer transition-colors duration-150
                    ${isActive ? 'bg-accent' : 'hover:bg-accent/50'}
                  `}
                  onMouseEnter={() => setHoveredId(ejeep.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onClick={() => handleRowClick(ejeep.id)}
                  data-testid={`row-ejeep-${ejeep.id}`}
                >
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-3 h-3 rounded-full ${
                          ejeep.line === 'A' ? 'bg-blue-500' : 'bg-green-500'
                        }`}
                      />
                      <span className="text-sm font-medium">Line {ejeep.line}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm text-foreground/80">
                    {ejeep.recentStop}
                  </td>
                  <td className="py-3 px-4 text-sm text-foreground/80">
                    {ejeep.nextStop}
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-sm font-semibold text-primary">
                      {ejeep.eta} min
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </ScrollArea>
    </div>
  );
}
