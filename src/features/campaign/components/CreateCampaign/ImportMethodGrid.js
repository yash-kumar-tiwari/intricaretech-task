"use client";

import ImportMethodCard from "./ImportMethodCard";

export default function ImportMethodGrid({ methods, expandedId, completedMethods, onToggle }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {methods.map((method) => (
        <ImportMethodCard
          key={method.id}
          method={method}
          isSelected={expandedId === method.id}
          isComplete={completedMethods.has(method.id)}
          onClick={() => onToggle(method.id)}
        />
      ))}
    </div>
  );
}
