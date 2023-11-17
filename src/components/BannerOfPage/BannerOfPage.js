import styles from './BannerOfPage.module.css'

function BannerOfPage({ bigTitle, subtitle, orderTitle }) {
    return (
        <div className={`${styles['banner-of-page']} d-flex justify-content-between align-items-center mb-3`}>
            <h1 className="text-uppercase font-italic">{bigTitle}</h1>
            <h5 className="text-uppercase font-italic font-weight-500">{orderTitle}<span className='opacity-50'>{subtitle}</span></h5>
        </div>
    );
}

export default BannerOfPage;