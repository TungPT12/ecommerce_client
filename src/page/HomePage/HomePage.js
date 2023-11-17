import Banner from "../../components/Banner/Banner";
import Category from "../../components/Category/Category";
import ProductList from "../../components/ProductList/ProductList";
import OtherInfo from "../../components/OtherInfo/OtherInfo";

function HomePage({ children }) {
    window.scrollTo(0, 0)
    return (
        <div>
            {children}
            <div className="container d-flex flex-column gap-5">
                <Banner />
                <Category />
                <ProductList />
                <OtherInfo />
            </div>
        </div>
    );
}

export default HomePage;