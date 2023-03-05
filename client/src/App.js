import style from "./App.module.css";
import {Route} from "react-router-dom";
import { Home } from "./views/index.js";
import Header from './components/Header/Header.jsx';
import Productos from './views/Productos/Productos.jsx'
import Footer from "./components/Footer/Footer";
import LandingPage from "../src/components/LandingPage/LandingPage.jsx"
import { useLocation } from "react-router-dom";
import Construye from "./views/Construye/Construye";
import ProfileDetail from "./views/ProfileDetail/ProfileDetail";
import Ayuda from "./views/Ayuda/Ayuda";
import DetalleProducto from "./views/DetalleProducto/DetalleProducto";
import Admin from "./admin/view/Admin.jsx";
import Nosotros from "./views/Nosotros/Nosotros"
import {useEffect, useRef, useState} from "react";
import ShoppingView from "./views/Shopping/Shopping.jsx";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";



function App() {
  const { user, isAuthenticated } = useAuth0()


  const headerRef = useRef(null)
  const location = useLocation();

  const [paddingMain,setPadingMain] = useState(0)
  const [userId, setUserId]=useState()

  useEffect(()=>{
    setPadingMain(145)
  },[])


  useEffect(()=>{
    const postUser=async()=>{
        const {data} = await axios.post(`http://localhost:3001/users`,{email:user.email })
        console.log("result:");
        console.log(data);
        if (data) setUserId(data.userid)
        console.log(data.userid);
    }

    if(isAuthenticated)postUser()
   
  },[user])

  return (
    <div id={style.AbsoluteContaier}>
        <Route exact path={"/"} render={()=> <LandingPage/>}/>
        { location.pathname!=='/' && !location.pathname.toLowerCase().includes('/admin') && location.pathname!=='/shoppingcart' && <Header headerRef={headerRef}/>}

        {location.pathname!=='/' && !location.pathname.toLowerCase().includes('/admin') && location.pathname!=='/shoppingcart' &&<div id={style.bodyMain} style={{paddingTop:`${paddingMain}px`}}>
        <Route exact path={"/home"} render={()=> <Home/>}/>
        <Route exact path={"/productos"} render={()=> <Productos/>} />
        <Route exact path={"/producto/:id"} render={()=> <DetalleProducto/>} />
        <Route path={"/construye"} render={()=> <Construye/>} />
        <Route exact path={"/profile"} render={()=> <ProfileDetail/>}/>
        {/* <Route exact path={"/edituser"} render={()=> <EditUser/>}/>
        <Route exact path={"/edituser"} render={()=> <EditUser/>}/> */}
        {<Route exact path={"/ayuda"} render={()=> <Ayuda/>}/> }
        </div>
}
        {<Route exact path={"/shoppingcart"} render={()=> <ShoppingView userId={userId}/>}/>}


        <Route  path={"/admin"} render={()=> <Admin/>}/>
        <Route exact path={"/nosotros"} render={()=><Nosotros/>}/>
        { location.pathname!=='/' && !location.pathname.toLowerCase().includes('/admin') &&  location.pathname!=='/shoppingcart' &&  <Footer/>}
    </div>
  );
}

export default App;
