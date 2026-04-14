import React from 'react';

const Petals = () => {
  // Generate random petals
  const petals = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    left: Math.random() * 100, // random start horizontal
    animationDuration: 10 + Math.random() * 15, // between 10s and 25s
    animationDelay: Math.random() * 10,
    size: 5 + Math.random() * 10, // petal size
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {petals.map((p) => (
        <span
          key={p.id}
          className="petal absolute bg-blush-dark/40 rounded-full blur-[1px]"
          style={{
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.size * 1.5}px`,
            borderRadius: '50% 0 50% 0', // Leaf shape
            animationDuration: `${p.animationDuration}s`,
            animationDelay: `${p.animationDelay}s`,
          }}
        />
      ))}
    </div>
  );
};

export default Petals;
