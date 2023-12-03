import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import { PRODUCT_LIST_API } from './config/RestApi';
import { useDispatch, useSelector } from 'react-redux';
import { productsAction } from './store/slice/ProductReducer';
import HomePage from './page/HomePage/HomePage.js';
import ShopPage from './page/ShopPage/ShopPage.js';
import DetailPage from './page/DetailPage/DetailPage';
import CartPage from './page/CartPage/CartPage';
import CheckoutPage from './page/CheckoutPage/CheckoutPage';
import SigninPage from './page/SigninPage/SigninPage';
import SignupPage from './page/SignupPage/SignupPage';
import Footer from './Layout/Footer/Footer';
import NavBar from './Layout/NavBar/NavBar';
import useHttp from './hook/use-http';
import NotFoundPage from './page/NotFoundPage/NotFoundPage';
import Chat from './components/Chat/Chat';

function App() {

  // const { isLogin } = useSelector(state => state.authentication)
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
      <NavBar />
      <Routes>
        <Route path='/*' element=<NotFoundPage /> />
        <Route path='/' element=<HomePage /> />
        <Route path='/shop' element=<ShopPage /> />
        <Route path='/shop/:productType' element=<ShopPage /> />
        <Route path='/detail/:id' element=<DetailPage /> />
        <Route path='/cart' element=<CartPage /> />
        <Route path='/checkout' element=<CheckoutPage /> />
        <Route path='/login' element=<SigninPage /> />
        <Route path='/signup' element=<SignupPage /> />
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
