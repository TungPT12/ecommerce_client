import { Link } from 'react-router-dom';
import styles from './NotFoundProduct.module.css'

function NotFoundProduct() {
    return (
        <div className='py-4'>
            <h1 className={`${styles['title']} text-capitalize`}>
                this product does not exist
            </h1>
            <Link className='' to="/">
                Click here to return home
            </Link>
        </div>
    );
}

export default NotFoundProduct;