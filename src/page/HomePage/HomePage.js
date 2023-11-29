import Banner from "../../components/Banner/Banner";
import Category from "../../components/Category/Category";
import ProductList from "../../components/ProductList/ProductList";
import OtherInfo from "../../components/OtherInfo/OtherInfo";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { checkIsLoginApi } from "../../apis/authn";
import { authnAction } from "../../store/reducer/authn";

function HomePage({ children }) {
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
                return
                // throw new Error(response.data.message);
            }
            dispatch(authnAction.login(response.data))
        }).catch((error) => {
            console.log(error)
            if (error.message === '/500' || error.message === '/400' || error.message === '/404') {
                navigate(error.message)
            }
        })
    }
    // const checkIsLogin = () => {
    //     checkIsLoginApi().then((response) => {
    //         if (response.status === 500) {
    //             throw new Error('/500');
    //         }
    //         if (response.status === 400) {
    //             throw new Error('/400');
    //         }
    //         if (response.status === 404) {
    //             throw new Error('/404');
    //         }
    //         if (response.status === 403 || response.status === 401) {
    //             throw new Error(response.data.message);
    //         }
    //         return response.data
    //     }).then((data) => {
    //         dispatch(authnAction.login(data))
    //     }).catch((error) => {
    //         console.log(error)
    //         if (error.message === '/500' || error.message === '/400' || error.message === '/404') {
    //             navigate(error.message)
    //         } else {
    //             navigate('/login')
    //         }
    //     })
    // }

    // const getPosts = () => {
    //     getPostApi().then((response) => {
    //         if (response.status === 500) {
    //             throw new Error('/500');
    //         }
    //         if (response.status === 400) {
    //             throw new Error('/400');
    //         }
    //         if (response.status === 404) {
    //             throw new Error('/404');
    //         }
    //         if (response.status === 403 || response.status === 401) {
    //             throw new Error(response.data.message);
    //         }
    //         return response.data
    //     }).then((data) => {
    //         setIsLoading(false);
    //         setPosts(data);
    //     }).catch((error) => {
    //         console.log(error)
    //         if (error.message === '/500' || error.message === '/400' || error.message === '/404') {
    //             navigate(error.message)
    //         } else {
    //             navigate('/login')
    //         }
    //     })
    // }

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
                <ProductList />
                <OtherInfo />
            </div>
        </div>
    );
}

export default HomePage;