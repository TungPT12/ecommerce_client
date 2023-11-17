import { useEffect, useState } from "react";
import useHttp from "../../hook/use-http.js";
import Product from "./Product/Product.js";
import styles from './ProductList.module.css'
import { PRODUCT_LIST_API } from "../../config/RestApi.js";
import LoadingSpinner from "../Loading/LoadingSpinner.js";
function ProductList() {

    const [products, setProducts] = useState([])

    const { sendRequest, isLoading, error } = useHttp()

    const setProductData = (data) => {
        setProducts(data)
    }
    useEffect(() => {
        sendRequest({
            link: PRODUCT_LIST_API,
        }, setProductData)
    }, [sendRequest])

    const renderProduct = () => {
        return products.map((product) => {
            return <Product
                isHavePopup={true}
                key={product._id.$oid}
                id={product._id.$oid}
                category={product.category}
                img={product.img1}
                long_desc={product.long_desc}
                name={product.name}
                price={product.price}
                short_desc={product.short_desc}
            />
        })
    }

    return (
        <div>
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

export default ProductList;