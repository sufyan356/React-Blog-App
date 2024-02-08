// import "./index.css";
// import Header from "../Pages/Header";

// import { Outlet, useNavigate } from "react-router-dom";
// import { createContext, useState } from "react";
// export const userContext = createContext();

// const App = () => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const navigate = useNavigate();

//   const toggleAuthentication = async () => {
//     setIsAuthenticated(!isAuthenticated);

//     setTimeout(() => {
//       if (!isAuthenticated) {
//         alert("Authentication!....", !isAuthenticated);

//         navigate("/Authentication");
//       }
//     }, 1000);
//   };

//   return (
//     <>

      

//       <userContext.Provider value = {{isAuthenticated , toggleAuthentication}}>
//         <Header/>
//         <Outlet />
//       </userContext.Provider>

//     </>
//   );
// };

// export default App;





{/* <userContext.Provider>
        <Header
          isAuthenticated={isAuthenticated}
          toggleAuthentication={toggleAuthentication}
        />
        <Outlet />
      </userContext.Provider> */}

      import "./index.css";

      import Router from "../Routers";      
      
      const App = () => {
      
        return (
         <>
            <Router />
         </>
           
        
        );
      };
      
      export default App;
