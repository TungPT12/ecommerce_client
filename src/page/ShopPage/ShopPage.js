import styles from './ShopPage.module.css'
import Product from "../../components/ProductList/Product/Product";
import { Link, NavLink, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { productTitles } from "../../config/data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleLeft, faAngleDoubleRight } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import BannerOfPage from '../../components/BannerOfPage/BannerOfPage';

function ShopPage({ children }) {
    window.scrollTo(0, 0)
    const products = useSelector(state => state.products.products)
    const { productType } = useParams()

    const [productFilter, setProductFilter] = useState([])
    const [search, setSearch] = useState('')
    const [pageSize, setPageSize] = useState(0)
    const [currentPage, setCurrentPage] = useState(1);

    const searchByName = (products) => {
        if (search) {
            const filterByName = productFilter.filter((productByName) => {
                return productByName.name.toUpperCase().includes(search.toUpperCase().trim())
            })
            return filterByName;
        } else {
            return products;
        }
    }

    useEffect(() => {
        setCurrentPage(1)
        if (productType) {
            const filterProductByCategory = products.filter((product) => {
                return product.category === productType
            })
            const productFilteredByName = searchByName(filterProductByCategory)
            const sizeOfPage = Math.ceil(productFilteredByName.length / 8)
            setPageSize(sizeOfPage)
            setProductFilter(productFilteredByName)
        } else {
            const productFilteredByName = searchByName(products)
            const sizeOfPage = Math.ceil(productFilteredByName.length / 8)
            setPageSize(sizeOfPage)
            setProductFilter(productFilteredByName)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [productType, products, search])

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

    const renderProduct = (product, index) => {
        return <Link key={`${product._id.$oid}-${index}`}
            className={`text-black text-decoration-none`}
            to={`/detail/${product._id.$oid}`}
        >
            <Product
                key={product._id.$oid}
                id={product._id.$oid}
                category={product.category}
                img={product.img1}
                long_desc={product.long_desc}
                name={product.name}
                price={product.price}
                short_desc={product.short_desc}
            />
        </Link>
    }

    const renderProducts = () => {
        const productsRender = productFilter.slice(currentPage * 8 - 8, currentPage * 8);
        if (productType) {
            return productsRender.map((product, index) => {
                return renderProduct(product, index)
            })
        } else {
            return productsRender.map((product, index) => {
                return renderProduct(product, index)
            })
        }
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

    const renderPageSize = () => {
        return pageSize > 1 ?
            `Showing ${1}-${8} of ${productFilter.length} result` :
            productFilter.length === 0 ?
                `Showing 0-0 of ${productFilter.length} result` :
                `Showing 1-${productFilter.length} of ${productFilter.length} result`
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
                        <div>
                            <div className={`${styles['product-list']}  mt-3`}>
                                {renderProducts()}
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
                                {renderPageSize()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ShopPage;