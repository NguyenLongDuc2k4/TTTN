import React from 'react';
import { DropZone } from '@measured/puck';

const AdminGrid = ({ columns = 2 }) => {
  const colCount = Math.max(1, Math.min(4, Number(columns)));
  const gridClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  };

  return (
    <div className="py-8 px-4 w-full">
      <div className={`max-w-7xl mx-auto grid gap-6 ${gridClasses[colCount]}`}>
        {Array.from({ length: colCount }).map((_, i) => (
          <div key={i} className="flex flex-col gap-4">
            <DropZone zone={`column-${i}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminGrid;
