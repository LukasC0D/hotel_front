import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { AuthProvider } from './components/AuthContext';
import Countries from './components/country/Countries';
import Country from './components/country/Country';
import Header from './components/header/Header';
import Home from './components/Home';
import Hotel from './components/hotel/Hotel';
import Hotels from './components/hotel/Hotels';
import Login from './components/Login';
import Order from './components/order/Order';
import Orders from './components/order/Orders';
import Register from './components/Register';

function App() {
  return (
    <>
    <BrowserRouter>
      <AuthProvider>
        <Header />
        <div className="container py-3">
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Register />} />
            <Route path="/countries" element={<Countries />} />
            <Route path="/country/:id" element={<Country />} />
            <Route path="/country/create" element={<Country />} />
            <Route path="/hotels" element={<Hotels />} />
            <Route path="/hotel/:id" element={<Hotel />} />
            <Route path="/hotel/create" element={<Hotel />} />
            <Route path="/order/:id" element={<Order />} />
            <Route path="/orders" element={<Orders />} />
          </Routes>
        </div>
      </AuthProvider>
    </BrowserRouter>

{/* <div>
<img src={logo} className="flex-center" alt="logo" />
</div> */}

</>
  );
}

export default App;
