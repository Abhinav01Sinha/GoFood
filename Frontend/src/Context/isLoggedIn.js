import { useState, useContext, createContext } from "react";

const IsLoginContext = createContext();

const IsLoginProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <IsLoginContext.Provider value={[isLogin, setIsLogin]}>
      {children}
    </IsLoginContext.Provider>
  );
};

// custom hook
const useIsLogin = () => useContext(IsLoginContext);

export { useIsLogin, IsLoginProvider };
