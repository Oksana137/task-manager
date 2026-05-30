import ProductOrderRow from "../components/ProductOrderRow";

const OrderRow = ({ order }) => {
  const options = { day: "numeric", month: "long", year: "numeric" };
  const date = new Date(order.date);
  order.date = date.toLocaleDateString("en-GB", options);

  return (
    <div className="collapse collapse-arrow bg-base-200 max-w-6xl m-auto mb-6">
      <input type="radio" name="my-accordion-2" />
      <div className="collapse-title text-xl font-medium">
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-6 justify-between">
            <span>Order ID: {order.id}</span>
            <span className="text-gray-500 text-base">
              Order date: <span className="font-bold">{order.date}</span>
            </span>
          </div>
          <span>Total: {order.total}&#36;</span>
        </div>
      </div>
      <div className="collapse-content">
        <table className="table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Description</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {order.products &&
              order.products.map((product) => (
                <ProductOrderRow product={product} />
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderRow;
