import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './page/HomePage/HomePage.js';
import ShopPage from './page/ShopPage/ShopPage.js';
import DetailPage from './page/DetailPage/DetailPage';
import CartPage from './page/CartPage/CartPage';
import CheckoutPage from './page/CheckoutPage/CheckoutPage';
import SigninPage from './page/SigninPage/SigninPage';
import SignupPage from './page/SignupPage/SignupPage';
import Footer from './Layout/Footer/Footer';
import NavBar from './Layout/NavBar/NavBar';
import NotFoundPage from './page/NotFoundPage/NotFoundPage';
import Chat from './components/Chat/Chat';
import OrderPage from './page/OrderPage/OrderPage.js';
import OrderDetail from './page/OrderPage/OrderDetail/OrderDetail.js';

function App() {
  return (
    <BrowserRouter>
      <Chat />
      <NavBar />
      <Routes>
        <Route path='/*' element=<NotFoundPage /> />
        <Route path='/' element=<HomePage /> />
        <Route path='/shop' element=<ShopPage /> />
        <Route path='/detail/:id' element=<DetailPage /> />
        <Route path='/order' element=<OrderPage /> />
        <Route path='/cart' element=<CartPage /> />
        <Route path='/checkout' element=<CheckoutPage /> />
        <Route path='/login' element=<SigninPage /> />
        <Route path='/signup' element=<SignupPage /> />
        <Route path='/order/:id' element=<OrderDetail /> />
        {/* <Route path='/cart' element={isLogin ? <CartPage /> : <SigninPage />} />
        <Route path='/checkout' element={isLogin ? <CheckoutPage /> : <SigninPage />} />
        <Route path='/login' element={isLogin ? <HomePage /> : <SigninPage />} />
        <Route path='/signup' element={isLogin ? <HomePage /> : <SignupPage />} /> */}
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
