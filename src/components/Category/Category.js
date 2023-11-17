import product_1 from "../../assets/images/product_1.png"
import product_2 from "../../assets/images/product_2.png"
import product_3 from "../../assets/images/product_3.png"
import product_4 from "../../assets/images/product_4.png"
import product_5 from "../../assets/images/product_5.png"
import styles from './Category.module.css'
function Category() {
    const categories = [[product_1, product_2], [product_3, product_4, product_5]]
    return (
        <div className="category">
            <div className="title text-center">
                <p className="m-0 text-uppercase font-italic text-black font-weight-light opacity-50">carefully created collections</p>
                <div className="text-uppercase font-italic text-black h5">browse our categories</div>
            </div>
            <div className=" d-flex flex-column gap-3">
                {
                    categories.map((category, index) => {
                        if (index % 2 === 0) {
                            return <div key={index} className="d-flex gap-3 animation-from-left">
                                {
                                    category.map((categoryImg) => {
                                        return <div key={categoryImg} className={`flex-grow-1 ${styles['category-img']}`}>
                                            <img className="w-100" src={categoryImg} alt="category" />
                                        </div>
                                    })
                                }
                            </div>
                        } else {
                            return <div key={index} className="d-flex gap-3 animation-from-right">
                                {
                                    category.map((categoryImg) => {
                                        return <div key={categoryImg} className={`flex-grow-1 ${styles['category-img']}`}>
                                            <img className="w-100" src={categoryImg} alt="category" />
                                        </div>
                                    })
                                }
                            </div>
                        }
                    })
                }
            </div>
        </div>
    );
}

export default Category;