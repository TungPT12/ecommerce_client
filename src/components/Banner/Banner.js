import { Link } from 'react-router-dom';
import bannerImg from '../../assets/images/banner1.jpg'
import styles from './Banner.module.css'
import { useInView } from 'react-intersection-observer';

function Banner() {
    const { ref: refBanner, inView: inViewBanner } = useInView({
        threshold: 0
    });
    return (
        <div ref={refBanner} className="banner mt-2 position-relative font-family-Ubuntu">
            <div className={`position-absolute justify-content-center w-25 ms-5 d-flex h-100 flex-column ${inViewBanner ? 'animation-from-left' : ''} z-1`}>
                <p className='text-uppercase font-italic mb-1 font-weight-500 font-weight-light opacity-50'>new inspiration 2020</p>
                <h2 className='text-uppercase font-italic font-weight-900'>20% off on new season</h2>
                <Link to="/" className={`w-fit-content bg-dark text-decoration-none text-light px-3 py-2 ${styles['browse_collection-btn']}`}>Browse collections</Link>
            </div>
            <img loading='lazy' className={`w-100 ${inViewBanner ? "animation-from-right" : ""}`} src={bannerImg} alt='banner' />
        </div>
    );
}

export default Banner;