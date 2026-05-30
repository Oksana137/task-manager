import { useEffect, useState } from "react";
import { fetchOrders } from "../units/network";
import OrderRow from "../components/OrderRow";
import { useNavigate } from "react-router-dom";

const Orders = () => {
  const [orders, setOrders] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const controller = new AbortController();

    const options = {
      signal: controller.signal,
      headers: {
        authorization: localStorage.getItem("token"),
      },
    };

    fetchOrders(options)
      .then((data) => setOrders(data))
      .catch((error) => {
        console.error("Error fetching orders:", error.message);
        if (error.status === 401) {
          navigate("/login");
        }
      });

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <>
      {orders ? (
        <div className="p-12">
          {orders.map((order) => (
            <OrderRow key={order.id} order={order} />
          ))}
        </div>
      ) : (
        <div className="flex justify-center m-8">There are no orders.</div>
      )}
    </>
  );
};

export default Orders;
