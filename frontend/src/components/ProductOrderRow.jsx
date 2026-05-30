const ProductOrderRow = ({ product }) => {
  return (
    product && (
      <tr key={product.id} className="bg-white">
        <td>
          <div className="card card-side">
            <figure className="w-36 h-36 shrink-0">
              <img
                className="w-full h-full object-contain"
                src={
                  product.image
                    ? import.meta.env.VITE_API_URL + product.image
                    : null
                }
                alt={product.name}
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{product.name}</h2>
              <p>{product.price}&#36;</p>
            </div>
          </div>
        </td>
        <td>{product.description}</td>
        <td>{product.ProductOrders.quantity}</td>
        <td>{product.ProductOrders.quantity * product.price}&#36;</td>
      </tr>
    )
  );
};

export default ProductOrderRow;
