import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import CartContextProvider from "./contexts/CartContext";
import AuthContextProvider from "./contexts/AuthContext";
import MainLayout from "./layouts/MainLayout";
import ProtectedLayout from "./layouts/ProtectedLayout";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Orders from "./pages/Orders";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Products />} />
        <Route path="cart" element={<Cart />} />
        <Route path="category/:categoryName" element={<Products />} />
        <Route path="login" element={<SignIn />} />
        <Route path="register" element={<SignUp />} />
        <Route path="orders" element={<ProtectedLayout />}>
          <Route index element={<Orders />} />
        </Route>
      </Route>
    )
  );

  return (
    <AuthContextProvider>
      <CartContextProvider>
        <RouterProvider router={router} />
      </CartContextProvider>
    </AuthContextProvider>
  );
}

export default App;
