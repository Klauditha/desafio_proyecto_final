import Login from "@/components/login/Login"
import Register from "./components/login/Register"
import Navbar from "./components/main/Navbar"
import Bookcard from "./components/main/Bookcard"
import Productdetail from "./components/main/Productdetail"
import Loginpage from "./components/pages/Loginpage"
import Carousel from "./components/main/Herocarousel"


function App() {

  return (
    <>
    <div className="px-20 flex-col space-y-8">
      <Navbar />
     <Loginpage />
     <Register />
     <Bookcard />
     <Productdetail />
     <Carousel />
    </div>
    </>
  )
}

export default App
