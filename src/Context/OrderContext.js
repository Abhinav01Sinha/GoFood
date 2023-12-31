import { useState, useContext, createContext } from "react";

const OrderContext = createContext();

const OrderProvider = ({ children }) => {
  const [order, setOrder] = useState([]);

  return (
    <OrderContext.Provider value={[order, setOrder]}>
      {children}
    </OrderContext.Provider>
  );
};

// custom hook
const useOrder = () => useContext(OrderContext);

export { useOrder, OrderProvider };
