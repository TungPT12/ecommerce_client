import { useInView } from 'react-intersection-observer';
import styles from './OtherInfo.module.css'

function OtherInfo() {
    const { ref, inView } = useInView();
    return (
        <div ref={ref}>
            <div className={`row ${styles['delivery-policy']} justify-content-center`}>
                <div className={`col ${inView ? 'animation-from-left' : ""}`}>
                    <h4 className='font-italic text-uppercase'>free shipping</h4>
                    <p className='opacity-50 font-italic '>Free shipping worlwide</p>
                </div>
                <div className={`col ${inView ? 'animation-from-top' : ""}`}>
                    <h4 className='font-italic text-uppercase'>24 x 7 service</h4>
                    <p className='opacity-50 font-italic '>Free shipping worlwide</p>
                </div>
                <div className={`col ${inView ? 'animation-from-right' : ""}`}>
                    <h4 className='font-italic text-uppercase'>festival offer</h4>
                    <p className='opacity-50 font-italic '>Free shipping worlwide</p>
                </div>
            </div>
            <div className="row my-5 justify-content-between">
                <div className={`col ${inView ? 'animation-from-left' : ""}`}>
                    <h3 className='text-uppercase font-family-Ubuntu font-italic m-0'>let's be friend</h3>
                    <p className='font-italic opacity-50'>Nisi nisi tempor consequat laboris nisi.</p>
                </div>
                <div className={`col ${inView ? 'animation-from-right' : ""}`}>
                    <form className={`${styles['other-info__form']} w-100 d-flex`}>
                        <input className={` ${styles['contact-input']} px-3`} placeholder="Enter your email address" />
                        <button className={`${styles['contact-submit']} bg-dark text-light h-100`}>Subscribe</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default OtherInfo;