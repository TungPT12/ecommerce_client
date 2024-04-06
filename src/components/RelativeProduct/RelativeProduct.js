import { Link, useNavigate } from "react-router-dom";
import Product from "../ProductList/Product/Product";
import styles from './RelativeProduct.module.css'
import { useEffect, useState } from "react";
import { getRelativeProductApi } from "../../apis/product";
import LoadingSpinner from "../Loading/LoadingSpinner";
function RelativeProduct({ productId, categoryId }) {
    const [productsRelative, setProductsRelative] = useState([])
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true)
    const getRelativeProducts = (categoryId) => {
        getRelativeProductApi(categoryId).then((response) => {
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
        }).then((products) => {
            let productsWithoutCurrentProduct = products.filter((product) => {
                return product._id !== productId
            });
            setProductsRelative(productsWithoutCurrentProduct);
            setIsLoading(false);
        }).catch((error) => {
            setIsLoading(false);
            if (error.message === '/500' || error.message === '/400' || error.message === '/404') {
                navigate(error.message)
            }
        })
    }

    const renderRelativeProducts = (productsRelative) => {
        return productsRelative.map((productRelative) => {
            return <Link to={`/detail/${productRelative._id}`} key={productRelative._id} className="text-decoration-none text-black h-100">
                <Product
                    isHavePopup={false}
                    id={productRelative._id}
                    image={productRelative.images[0]}
                    name={productRelative.name}
                    price={productRelative.price}
                />
            </Link>
        })
    }

    useEffect(() => {
        getRelativeProducts(categoryId)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="">
            <h4 className="text-uppercase font-family-Ubuntu mb-4 font-italic">
                related  products
            </h4>
            <div className={`${styles['relative-product__list']}`}>
                {
                    isLoading ? <LoadingSpinner /> : renderRelativeProducts(productsRelative)
                }
            </div>
        </div >
    );
}

export default RelativeProduct;

