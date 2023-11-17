import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import RelativeProduct from "../../components/RelativeProduct/RelativeProduct";
import ProductDetail from "../../components/ProductDetail/ProductDetail";
import NotFoundProduct from "../../components/NotFoundProduct/NotFoundProduct";

function DetailPage({ children }) {

    window.scrollTo(0, 0)
    const { products } = useSelector(state => state.products)
    const { productId } = useParams()

    const findProductDetail = (productId) => {
        return products.find((product) => {
            return product._id.$oid === productId
        })
    }

    const filterRelativeCategory = (category) => {
        return products.filter((product) => {
            return product.category === category
        })
    }

    const productDetail = findProductDetail(productId);
    let relativeProducts = []
    if (productDetail) {
        relativeProducts = filterRelativeCategory(productDetail.category)
        const pos = relativeProducts.findIndex((relativeProduct) => {
            return productDetail._id.$oid === relativeProduct._id.$oid
        })
        if (pos > -1) {
            relativeProducts.splice(pos, 1)
        }
    }

    return (
        <>
            {children}
            <div className="container mt-3">
                {
                    productDetail ? <>
                        <ProductDetail
                            productDetail={productDetail}
                        />
                        <div>
                            {relativeProducts.length !== 0 ? <RelativeProduct relativeProducts={relativeProducts} /> : <></>}
                        </div>
                    </> : <NotFoundProduct />
                }
            </div>
        </>
    );
}

export default DetailPage;