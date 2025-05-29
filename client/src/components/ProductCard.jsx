function ProductCard({ product }) {
    return (
      <div className="bg-white rounded-xl shadow-md p-4">
        <img src={product.imageUrl} alt={product.name} className="w-full h-40 object-cover rounded" />
        <h2 className="text-xl font-bold mt-2">{product.name}</h2>
        <p className="text-sm">{product.description}</p>
        <p className="font-semibold text-green-600 mt-1">${product.price}</p>
        <a
          href={product.affiliateLink}
          className="text-blue-500 text-sm mt-2 block"
          target="_blank"
          rel="noopener noreferrer"
        >
          View Deal
        </a>
      </div>
    );
  }
  
  export default ProductCard;
  