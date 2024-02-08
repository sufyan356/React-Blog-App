import Header from "../Pages/Header";
import { Outlet } from "react-router-dom";
const Layout = ({name}) => {
  return (
    <>
        <Header name = {name}/>
        <Outlet />
    </>
   
  )
}

export default Layout