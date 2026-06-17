export default function Card({ imgSrc, title, description, price, duration }) {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition">
      <img src={imgSrc} alt={title} className="h-56 w-full object-cover"/>
      <div className="p-4">
        <h3 className="font-bold text-xl mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <div className="flex justify-between items-center">
          <span className="font-semibold">{price}</span>
          <span className="text-gray-500">{duration}</span>
        </div>
      </div>
    </div>
  );
}