import styles from './ShopPage.module.css'
import Product from "../../components/ProductList/Product/Product";
import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { productTitles } from "../../config/data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleLeft, faAngleDoubleRight } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import BannerOfPage from '../../components/BannerOfPage/BannerOfPage';
import { checkIsLoginApi } from '../../apis/authn';
import { cartAction } from '../../store/slice/cart';
import { authnAction } from '../../store/slice/authn';
import { getProductsByParamsApi } from '../../apis/product';
import LoadingSpinner from '../../components/Loading/LoadingSpinner';
import { getCategoriesApi } from '../../apis/category';

function ShopPage({ children }) {
    window.scrollTo(0, 0)
    const { isAuthn } = useSelector(state => state.authn)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isLoadingProducts, setIsLoadingProducts] = useState(true);
    const [isLoadingCategories, setIsLoadingCategories] = useState(true);
    const [categoryId, setCategoryId] = useState('')
    const [name, setName] = useState('')
    const [search, setSearch] = useState('')
    const [pageSize, setPageSize] = useState(0)
    const [currentPage, setCurrentPage] = useState(1);
    const [products, setProducts] = useState([]);

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
                throw new Error(response.data.message);
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

    const getProductsByParams = (page, categoryId, name) => {
        getProductsByParamsApi(page, {
            categoryId: categoryId,
            name: name
        }).then((response) => {
            if (response.status === 500) {
                throw new Error('/500');
            }
            if (response.status === 400) {
                throw new Error('/400');
            }
            if (response.status === 404) {
                throw new Error('/404');
            }
            return response.data
        }).then((data) => {
            setIsLoadingProducts(false);
            setProducts(data.results);
            setCurrentPage(1);
            setPageSize(data.total_pages)
        }).catch((error) => {
            if (error.message === '/500' || error.message === '/400' || error.message === '/404') {
                navigate(error.message)
            } else {
                authnAction.logout();
            }
        })
    }

    const getCategories = () => {
        getCategoriesApi().then((response) => {
            if (response.status === 500) {
                throw new Error('/500');
            }
            if (response.status === 400) {
                throw new Error('/400');
            }
            if (response.status === 404) {
                throw new Error('/404');
            }
            return response.data
        }).then((data) => {
            setIsLoadingProducts(false);
            setProducts(data.results);
            setCurrentPage(1);
            setPageSize(data.total_pages)
        }).catch((error) => {
            if (error.message === '/500' || error.message === '/400' || error.message === '/404') {
                navigate(error.message)
            } else {
                authnAction.logout();
            }
        })
    }

    useEffect(() => {
        getProductsByParams(1, categoryId, name)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [categoryId, name]);

    useEffect(() => {
        if (!isAuthn) {
            checkIsLogin();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuthn]);

    const renderProductTitleName = () => {
        return productTitles.map((productTitle, index) => {
            return <ul key={productTitle.title}>
                <div className={`${styles['product-title']} text-uppercase font-italic px-3 py-2 font-family-Ubuntu font-weight-900`}>{productTitle.title}</div>
                {
                    productTitle.productTitleNames.map((productTitleName) => {
                        return <li key={productTitleName.path} className=" px-3 py-3 font-family-Ubuntu">
                            <NavLink to={`/shop/${productTitleName.path}`}
                                className={({ isActive }) => {
                                    const isActiveClass = isActive ? styles.active : styles['product-title-name']
                                    return `font-family-Ubuntu font-italic text-decoration-none  ${isActiveClass}`;
                                }}
                                end>
                                {productTitleName.name}
                            </NavLink>
                        </li>
                    })
                }
            </ul>
        })
    }

    const renderProducts = (products) => {
        return products.map((product) => {
            return <Link to={`/detail/${product._id}`} key={product._id} className="text-decoration-none text-black h-100">
                <Product
                    id={product._id}
                    category={product.category}
                    image={product.images[0]}
                    long_desc={product.long_desc}
                    name={product.name}
                    price={product.price}
                    short_desc={product.short_desc}
                />
            </Link>
        })
    }

    const previousButtonEvent = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1)
        }
    }

    const nextButtonEvent = () => {
        if (currentPage < pageSize) {
            setCurrentPage(currentPage + 1)
        }
    }

    return (
        <>
            {children}
            <div className="container">
                <BannerOfPage
                    bigTitle="Shop"
                    subtitle="shop"
                />
                <div className="d-flex">
                    <div className={`${styles['navbar-product']}  me-2`}>
                        <h3 className="text-uppercase font-italic mb-4">categories</h3>
                        <h5 className={`${styles['brand-title']} text-uppercase bg-dark px-3 py-2 font-weight-400 font-italic`}>apple</h5>
                        <div className="px-3 py-3 font-family-Ubuntu">
                            <NavLink to='/shop'
                                className={({ isActive }) => {
                                    const isActiveClass = isActive ? styles.active : styles['product-title-name']
                                    return `font-italic text-decoration-none  ${isActiveClass}`;
                                }}
                                end
                            >All</NavLink>
                        </div>
                        {renderProductTitleName()}
                    </div>
                    <div className={`${styles['product-filter']}`}>
                        <div className={`${styles['filter']} d-flex justify-content-between`}>
                            <input placeholder="Enter Search Here!"
                                className={`${styles['search-input']} px-3 py-2`}
                                value={search}
                                onChange={(e) => {
                                    setSearch(e.target.value)
                                }}
                            />
                            <select className="pe-4 h-fit-content" onChange={(e) => {
                                console.log(e.target.value)
                            }}>
                                <option>Default sorting</option>
                                <option>Des sorting</option>
                                <option>dssa sorting</option>
                            </select>
                        </div>
                        {
                            isLoadingProducts ? <LoadingSpinner /> : <>
                                <div>
                                    <div className={`${styles['product-list']}  mt-3`}>
                                        {renderProducts(products)}
                                    </div>
                                </div>
                                <div className="w-100 d-flex flex-column align-items-end">
                                    <div className="d-flex">
                                        <button onClick={previousButtonEvent} className={`p-3 ${styles['pre-btn']}`}>
                                            <FontAwesomeIcon icon={faAngleDoubleLeft} />
                                        </button>
                                        <span className={`bg-dark p-3 ${styles['number-page']}`}>{currentPage}</span>
                                        <button onClick={nextButtonEvent} className={`p-3 ${styles['next-btn']}`}>
                                            <FontAwesomeIcon icon={faAngleDoubleRight} />
                                        </button>
                                    </div>
                                    <div>
                                        Page {currentPage} of {pageSize}
                                    </div>
                                </div>
                            </>
                        }
                    </div>
                </div>
            </div>
        </>
    );
}

export default ShopPage;