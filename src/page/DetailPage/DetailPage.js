import { useNavigate, useParams } from "react-router-dom";
import RelativeProduct from "../../components/RelativeProduct/RelativeProduct";
import ProductDetail from "../../components/ProductDetail/ProductDetail";
import { useEffect, useState } from "react";
import { getProductByIdApi } from "../../apis/product";
import LoadingSpinner from "../../components/Loading/LoadingSpinner";

function DetailPage({ children }) {
    window.scrollTo(0, 0)
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true)
    const { id } = useParams()
    const [productDetail, setProductDetail] = useState({})

    const getProductById = (id) => {
        getProductByIdApi(id).then((response) => {
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
            setIsLoading(false)
            setProductDetail(data)
        }).catch((error) => {
            setIsLoading(false)
            if (error.message === '/500' || error.message === '/400' || error.message === '/404') {
                navigate(error.message)
            }
        })
    }

    useEffect(() => {
        setIsLoading(true)
        getProductById(id)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])

    return (
        <>
            {children}
            <div className="container mt-3">
                {
                    isLoading ? <LoadingSpinner /> : <>
                        <ProductDetail
                            id={productDetail._id}
                            images={productDetail.images}
                            name={productDetail.name}
                            price={productDetail.price}
                            short_desc={productDetail.short_desc}
                            long_desc={productDetail.long_desc}
                            productDetail={productDetail}
                            categoryName={productDetail.category.name}
                            categoryId={productDetail.category._id}
                        />
                        <div>
                            {productDetail.category._id ? <RelativeProduct
                                categoryId={productDetail.category._id}
                                productId={productDetail._id}
                            /> : <></>}
                        </div>
                    </>
                }
            </div>
        </>
    );
}

export default DetailPage;