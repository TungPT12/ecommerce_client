import { useEffect, useState } from "react";
import Product from "../Product/Product.js";
import styles from './TopTrendingProduct.module.css'
import LoadingSpinner from "../../Loading/LoadingSpinner.js";
import { getTopTrendingProductApi } from "../../../apis/product.js";
import { useNavigate } from "react-router-dom";
import { useInView } from "react-intersection-observer";
function TopTrendingProduct() {
    const { ref: refTopTrendingProduct, inView: inViewTopTrendingProduct } = useInView({
        threshold: 0
    });
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true)
    const [products, setProducts] = useState([])
    const getTopTrendingProducts = () => {
        getTopTrendingProductApi().then((response) => {
            if (response.status === 500) {
                throw new Error('/500');
            }
            if (response.status === 400) {
                throw new Error('/400');
            }
            return response.data
        }).then((data) => {
            setIsLoading(false)
            setProducts(data.results)
        }).catch((error) => {
            setIsLoading(false)
            if (error.message === '/500' || error.message === '/400' || error.message === '/404') {
                navigate(error.message)
            }
        })
    }

    useEffect(() => {
        getTopTrendingProducts()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const renderProduct = () => {
        return products.map((product) => {
            return <Product
                inViewTopTrendingProduct={inViewTopTrendingProduct}
                isHavePopup={true}
                key={product._id}
                id={product._id}
                image={product.images[0]}
                name={product.name}
                price={product.price}
                short_desc={product.short_desc}
            />
        })
    }

    return (
        <div ref={refTopTrendingProduct}>
            <div className="mb-4">
                <p className="text-uppercase opacity-50 font-italic m-0">made the hard way</p>
                <h4 className="text-uppercase font-italic m-0">top trending products</h4>
            </div>
            {isLoading ? <div className="d-flex justify-content-center w-100 align-items-center"><LoadingSpinner /></div>
                : <div className={`${styles['product-list']}`}>
                    {renderProduct()}
                </div>}
        </div>
    );
}

export default TopTrendingProduct;