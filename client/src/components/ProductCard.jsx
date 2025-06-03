function ProductCard({ product }) {
  return (
    <div className="border border-gray-300 rounded-md overflow-hidden w-full text-center shadow-md bg-white">
      <a
        href={product.affiliateLink}
        className="block p-4"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-40 object-contain mx-auto"
        />
        <h2 className="text-md font-semibold mt-2">{product.name}</h2>
      </a>
    </div>
  );
}

export default ProductCard;
