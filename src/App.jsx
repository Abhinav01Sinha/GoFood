import "./App.css";
import Home from "./Screens/Home.jsx";
import Login from "./Screens/Login.jsx";
import SignUp from "./Screens/SignUp.jsx";
import Cart from "./Screens/Cart.jsx";
import MyOrders from "./Screens/MyOrders.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./Context/CartContext.js";
import { OrderProvider } from "./Context/OrderContext.js";

import "bootstrap/dist/js/bootstrap.bundle.js";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css";

function App() {
  return (
    <OrderProvider>
      <CartProvider>
        <Router>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/createuser" element={<SignUp />} />
            <Route exact path="/cart" element={<Cart />} />
            <Route exact path="/myorders" element={<MyOrders />} />
          </Routes>
        </Router>
      </CartProvider>
    </OrderProvider>
  );
}

export default App;
