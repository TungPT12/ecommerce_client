import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import { PRODUCT_LIST_API } from './config/RestApi';
import { useDispatch, useSelector } from 'react-redux';
import { productsAction } from './store/reducer/ProductReducer';
import HomePage from './page/HomePage/HomePage.js';
import ShopPage from './page/ShopPage/ShopPage.js';
import DetailPage from './page/DetailPage/DetailPage';
import CartPage from './page/CartPage/CartPage';
import CheckoutPage from './page/CheckoutPage/CheckoutPage';
import LoginPage from './page/LoginPage/LoginPage';
import RegisterPage from './page/RegisterPage/RegisterPage';
import Footer from './Layout/Footer/Footer';
import NavBar from './Layout/NavBar/NavBar';
import useHttp from './hook/use-http';
import NotFoundPage from './page/NotFoundPage/NotFoundPage';
import Chat from './components/Chat/Chat';

function App() {

  const { isLogin } = useSelector(state => state.authentication)
  const { sendRequest: sendRequestProducts } = useHttp()

  const dispatch = useDispatch()
  const setProductData = (data) => {
    dispatch(productsAction.setProducts(data))
  }

  useEffect(() => {
    sendRequestProducts({
      link: PRODUCT_LIST_API,
    }, setProductData)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sendRequestProducts])

  return (
    <BrowserRouter>
      <Chat />
      <Routes>
        <Route path='/*' element=<NotFoundPage /> />
        <Route path='/' element=<HomePage>
          <NavBar />
        </HomePage> />
        <Route path='/shop' element=<ShopPage><NavBar /></ShopPage> />
        <Route path='/shop/:productType' element=<ShopPage><NavBar /></ShopPage> />
        <Route path='/detail/:productId' element=<DetailPage><NavBar /></DetailPage> />
        <Route path='/cart' element={isLogin ? <CartPage><NavBar /></CartPage> : <LoginPage />} />
        <Route path='/checkout' element={isLogin ? <CheckoutPage><NavBar /></CheckoutPage> : <LoginPage />} />
        <Route path='/login' element={isLogin ? <HomePage><NavBar /></HomePage> : <LoginPage />} />
        <Route path='/register' element={isLogin ? <HomePage><NavBar /></HomePage> : <RegisterPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
