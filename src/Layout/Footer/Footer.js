
function Footer() {
    return (
        <div className="w-100 bg-black">
            <div className="container bg-black">
                <div className="row py-5">
                    <div className="col-sm py-5">
                        <div className={`text-uppercase h5 font-italic text-white font-weight-light pb-4`}>Customer service</div>
                        <ul>
                            <li className={`text-capitalize font-italic text-light font-weight-light opacity-50`}>help & contact us</li>
                            <li className={`text-capitalize font-italic text-light font-weight-light opacity-50`}>return & refunds</li>
                            <li className={`text-capitalize font-italic text-light font-weight-light opacity-50`}>online stores</li>
                            <li className={`text-capitalize font-italic text-light font-weight-light opacity-50`}>term & condition</li>
                        </ul>
                    </div>
                    <div className="col-sm py-5">
                        <div className={`text-uppercase h5 font-italic text-white font-weight-light pb-4`}>company</div>
                        <ul>
                            <li className={`text-capitalize font-italic text-light font-weight-light opacity-50`}>what we do</li>
                            <li className={`text-capitalize font-italic text-light font-weight-light opacity-50`}>available services</li>
                            <li className={`text-capitalize font-italic text-light font-weight-light opacity-50`}>latest post</li>
                            <li className={`font-italic text-light font-weight-light opacity-50`}>FAQs</li>
                        </ul>
                    </div>
                    <div className="col-sm py-5">
                        <div className={`text-uppercase h5 font-italic text-white font-weight-light pb-4`}>social media</div>
                        <ul>
                            <li className={`text-capitalize font-italic text-light font-weight-light opacity-50`}>twitter</li>
                            <li className={`text-capitalize font-italic text-light font-weight-light opacity-50`}>instagram</li>
                            <li>
                                <a href="https://www.facebook.com/tt.tungpt" target="_blank" className={`text-decoration-none text-capitalize font-italic text-light font-weight-light opacity-50`} rel="noreferrer">facebook</a>
                            </li>
                            <li className={`text-capitalize font-italic text-light font-weight-light opacity-50`}>pinterest</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;