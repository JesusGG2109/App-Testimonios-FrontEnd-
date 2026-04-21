export default function Testimonial({ item }) {
  return (
    <div className="testimonial-card">
      <img
        src={item.foto}
        alt={item.nombre}
        className="testimonial-photo"
      />
      <h3 className="testimonial-name">{item.nombre}</h3>
      <p className="testimonial-role">{item.cargo}</p>
      <p className="testimonial-text">{item.texto}</p>
    </div>
  );
}
