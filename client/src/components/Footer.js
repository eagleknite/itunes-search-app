import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";

function Footer() {
    return (
        <div className="sticky top-0 z-50 bg-gradient-to-r from-blue-500 to-blue-700 text-white p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <p className="text-sm">© 2023 Search App</p>
                <div className="flex space-x-4">
                    <Link to="/about" className="text-sm hover:text-blue-500 transition-colors duration-300">
                        <FontAwesomeIcon icon={faEnvelope} /> Contact
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Footer;
