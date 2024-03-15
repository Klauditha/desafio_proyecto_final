/* eslint-disable no-unused-vars */
import Login from '@/components/Login';
import Register from './components/Register';
import Navbar from './components/Navbar';
import Productdetail from './components/Productdetail';
import Loginpage from './components/pages/Loginpage';
import Topnavbar from './components/Topnavbar';
import { ECommerceProvider } from './Context/ECommerceProvider';
import ECommerceRoutes from './components/Routes/ECommerceRoutes';

function App() {
  return (
    <ECommerceProvider>
      <div className="flex-col space-y-8">
        <Navbar />
        <ECommerceRoutes />
        {/* <Topnavbar /> */}
        {/* <Loginpage />
     <Register />
     <Bookcard />
     <Productdetail /> */}
        {/* <Carousel /> */}
      </div>
    </ECommerceProvider>
  );
}

export default App;
