import RunningEJeepsTable from '../RunningEJeepsTable';
import type { EJeep } from '@shared/schema';

//todo: remove mock functionality
const mockEJeeps: EJeep[] = [
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
];

export default function RunningEJeepsTableExample() {
  return (
    <div className="h-96 bg-background p-4">
      <RunningEJeepsTable
        ejeeps={mockEJeeps}
        onEJeepSelect={(id) => console.log('Selected e-jeep:', id)}
      />
    </div>
  );
}
