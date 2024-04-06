import { useNavigate } from "react-router-dom";
import styles from './Category.module.css'
import { useEffect, useState } from "react"
import LoadingSpinner from "../Loading/LoadingSpinner"
import { getCategoriesApi } from "../../apis/category"
import { useInView } from "react-intersection-observer";
function Category() {

    const { ref, inView } = useInView();

    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [categories, setCategories] = useState([]);

    const getCategories = () => {
        getCategoriesApi().then((response) => {
            if (response.status === 500) {
                throw new Error('/500');
            }
            if (response.status === 400) {
                throw new Error('/400');
            }
            return response.data
        }).then((data) => {
            setIsLoading(false)
            setCategories(data.results)
        }).catch((error) => {
            setIsLoading(false)
            if (error.message === '/500' || error.message === '/400' || error.message === '/404') {
                navigate(error.message)
            }
        })
    }

    const renderCategories = () => {
        let firstRow = [];
        let secondRow = [];
        categories.forEach((category, index) => {

            if (index < 2) {
                firstRow.push(<div key={category._id} className={`flex-1 ${styles['category-img']}`}>
                    <img className="w-100 h-100" alt={category.name} src={`${process.env.REACT_APP_API_ENDPOINT_URL_IMAGE}${category.image}`} />
                </div>)
            } else if (index >= 2 && index < 5) {
                secondRow.push(<div key={category._id} className={`flex-1 ${styles['category-img']}`}>
                    <img className="w-100 h-100" alt={category.name} src={`${process.env.REACT_APP_API_ENDPOINT_URL_IMAGE}${category.image}`} />
                </div>)
            }
        })
        return <>
            <div className={`d-flex gap-3 ${inView ? 'animation-from-left' : ''}`}>
                {firstRow}
            </div>
            <div className={`d-flex gap-3 ${inView ? 'animation-from-right' : ''}`}>
                {secondRow}
            </div>
        </>
    }

    useEffect(() => {
        getCategories();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <div ref={ref} className="category">
            <div className="title text-center">
                <p className="m-0 text-uppercase font-italic text-black font-weight-light opacity-50">carefully created collections</p>
                <div className="text-uppercase font-italic text-black h5">browse our categories</div>
            </div>
            <div className={`d-flex flex-column gap-3`}>
                {isLoading ? <LoadingSpinner /> : renderCategories()}
            </div>
        </div>
    );
}

export default Category;