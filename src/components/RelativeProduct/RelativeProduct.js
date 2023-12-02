import { Link } from "react-router-dom";
import Product from "../ProductList/Product/Product";
import styles from './RelativeProduct.module.css'
function RelativeProduct({ relativeProducts }) {
    const renderRelativeProducts = (relativeProducts) => {
        return relativeProducts.map((relativeProduct) => {
            return <Link to={`/detail/${relativeProduct._id.$oid}`} key={relativeProduct._id.$oid} className="text-decoration-none text-black">
                <Product
                    isHavePopup={false}
                    id={relativeProduct._id.$oid}
                    img={relativeProduct.img1}
                    long_desc={relativeProduct.long_desc}
                    name={relativeProduct.name}
                    price={relativeProduct.price}
                    short_desc={relativeProduct.short_desc}
                />
            </Link>
        })
    }
    return (
        <div className="">
            <h4 className="text-uppercase font-family-Ubuntu mb-4 font-italic">
                related  products
            </h4>
            <div className={`${styles['relative-product__list']}`}>
                {renderRelativeProducts(relativeProducts)}
            </div >
        </div >
    );
}

export default RelativeProduct;

