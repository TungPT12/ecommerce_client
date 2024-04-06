import styles from './ShopPage.module.css'
import Product from "../../components/ProductList/Product/Product";
import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
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
import useDebounced from '../../hook/useDebounced';

function ShopPage({ children }) {
    // window.scrollTo(0, 0)
    const { isAuthn } = useSelector(state => state.authn)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isLoadingProducts, setIsLoadingProducts] = useState(true);
    const [isLoadingCategories, setIsLoadingCategories] = useState(true);
    const [categoryId, setCategoryId] = useState('')
    const [name, setName] = useState('')
    const [pageSize, setPageSize] = useState(0)
    const [currentPage, setCurrentPage] = useState(1);
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);

    const debounce = useDebounced(name, 2000)

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
            return response.data.results
        }).then((categories) => {
            let formatCategories = [
                {
                    title: 'iphone & mac',
                    categoriesName: [],
                },
                {
                    title: "wireless",
                    categoriesName: [],
                },
                {
                    title: "other",
                    categoriesName: []
                },
            ];
            categories.forEach((category) => {
                if (category.name.toLowerCase().includes('iphone') || category.name.toLowerCase().includes('macbook')) {
                    formatCategories[0].categoriesName.push(category);
                } else if (category.name.toLowerCase().includes('watch') || category.name.toLowerCase().includes('airpod')) {
                    formatCategories[1].categoriesName.push(category);
                } else {
                    formatCategories[2].categoriesName.push(category);
                }
            })
            setIsLoadingCategories(false);
            setCategories(formatCategories);
        }).catch((error) => {
            if (error.message === '/500' || error.message === '/400' || error.message === '/404') {
                navigate(error.message)
            } else {
                authnAction.logout();
            }
        })
    }

    useEffect(() => {
        window.scrollTo(0, 0)
        setIsLoadingProducts(true);
        getProductsByParams(1, categoryId, name);
        setCurrentPage(1);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [categoryId, debounce]);

    useEffect(() => {
        if (!isAuthn) {
            checkIsLogin();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuthn]);

    useEffect(() => {
        getCategories();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const renderProductTitleName = (categories) => {
        // console.log(categories)
        return categories.map((category, index) => {
            return <ul key={category.title}>
                <div className={`${styles['product-title']} text-uppercase font-italic px-3 py-2 font-family-Ubuntu font-weight-900`}>{category.title}</div>
                {
                    category.categoriesName.map((categoryName) => {
                        return <li key={categoryName._id} className=" px-3 py-3 font-family-Ubuntu">
                            <div
                                onClick={() => {
                                    setCategoryId(categoryName._id)
                                }}
                                className={`font-family-Ubuntu font-italic text-decoration-none ${styles['product-title-name']} ${categoryId === categoryName._id ? styles.active : ''}`}
                            >
                                {categoryName.name}
                            </div>
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

    useEffect(() => {
        window.scrollTo(0, 0)
        setIsLoadingProducts(true)
        getProductsByParams(currentPage, categoryId, name)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage]);
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
                            <div
                                className={`font-family-Ubuntu font-italic text-decoration-none ${styles['product-title-name']}  ${categoryId ? '' : styles.active}`}
                                onClick={() => {
                                    setCategoryId('')
                                }}
                            >All</div>
                        </div>
                        {isLoadingCategories ? <LoadingSpinner /> : renderProductTitleName(categories)}
                    </div>
                    <div className={`${styles['product-filter']}`}>
                        <div className={`${styles['filter']} d-flex justify-content-between`}>
                            <input placeholder="Enter Search Here!"
                                className={`${styles['search-input']} px-3 py-2`}
                                value={name}
                                onChange={(e) => {
                                    setName(e.target.value)
                                }}
                            />
                            {/* <select className="pe-4 h-fit-content" onChange={(e) => {
                                console.log(e.target.value)
                            }}>
                                <option>Default sorting</option>
                                <option>Des sorting</option>
                                <option>dssa sorting</option>
                            </select> */}
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
                                        <button disabled={currentPage <= 1 ? true : false} onClick={previousButtonEvent} className={`p-3 ${styles['pre-btn']}`}>
                                            <FontAwesomeIcon icon={faAngleDoubleLeft} />
                                        </button>
                                        <span className={`bg-dark p-3 ${styles['number-page']}`}>{currentPage}</span>
                                        <button disabled={currentPage >= pageSize ? true : false} onClick={nextButtonEvent} className={`p-3 ${styles['next-btn']}`}>
                                            <FontAwesomeIcon icon={faAngleDoubleRight} />
                                        </button>
                                    </div>
                                    <div>
                                        Page {pageSize > 0 ? currentPage : 0} of {pageSize}
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