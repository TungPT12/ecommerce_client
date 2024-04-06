import Banner from "../../components/Banner/Banner";
import Category from "../../components/Category/Category";
import TopTrendingProduct from "../../components/ProductList/TopTrendingProduct/TopTrendingProduct";
import OtherInfo from "../../components/OtherInfo/OtherInfo";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { checkIsLoginApi } from "../../apis/authn";
import { authnAction } from "../../store/slice/authn";
import { cartAction } from "../../store/slice/cart";

function HomePage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isAuthn } = useSelector(state => state.authn);
    const checkIsLogin = () => {
        checkIsLoginApi().then((response) => {
            if (response.status === 500) {
                throw new Error('/500');
            }
            if (response.status === 400) {
                throw new Error('/400');
            }
            if (response.status === 404) {
                throw new Error('/404');
            }
            if (response.status === 403 || response.status === 401) {
                throw new Error('');
            }
            dispatch(authnAction.login(response.data))
            dispatch(cartAction.setCart(response.data.cart))
        }).catch((error) => {
            if (error.message === '/500' || error.message === '/400' || error.message === '/404') {
                navigate(error.message)
            } else {
                authnAction.logout();
            }
        })
    }

    useEffect(() => {
        if (!isAuthn) {
            checkIsLogin();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuthn]);
    window.scrollTo(0, 0)
    return (
        <div>
            <div className="container d-flex flex-column gap-5">
                <Banner />
                <Category />
                <TopTrendingProduct />
                <OtherInfo />
            </div>
        </div>
    );
}

export default HomePage;