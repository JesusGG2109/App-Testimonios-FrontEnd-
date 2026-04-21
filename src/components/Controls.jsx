export default function Controls({ prev, next, random }) {
  return (
    <div className="controls">
      <button onClick={prev} aria-label="Anterior">◀</button>
      <button onClick={next} aria-label="Siguiente">▶</button>
      <button onClick={random} aria-label="Aleatorio">🎲</button>
    </div>
  );
}