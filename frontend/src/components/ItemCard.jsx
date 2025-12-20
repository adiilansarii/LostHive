export default function ItemCard({ title, img }) {
  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden">
      <img
        src={img}
        alt={title}
        className="h-48 w-full object-cover"
      />
      <div className="p-4 text-center">
        <h3 className="font-semibold text-[#301CA0]">{title}</h3>
      </div>
    </div>
  );
}
