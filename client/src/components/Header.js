import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearSearchResults } from '../store/searchResultsSlice'

function Header() {
    const dispatch = useDispatch();

    const handleClearResults = () => {
        dispatch(clearSearchResults());
    };

    return (
        <div className="sticky top-0 z-50 bg-gradient-to-r from-blue-500 to-blue-700 text-white p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <div>
                    <NavLink 
                        to="/" 
                        className={({ isActive }) => isActive ? "text-xl font-bold hover:text-blue-200 transition-colors duration-300 text-blue-300" : "text-xl font-bold hover:text-blue-200 transition-colors duration-300"}
                        onClick={handleClearResults}
                    >
                        Itunes Search App
                    </NavLink>
                    <p className="text-sm mt-1">Discover and favorite your media.</p>
                </div>
                <NavLink 
                    to="/favorites" 
                    className={({ isActive }) => isActive ? "text-lg hover:text-blue-200 transition-colors duration-300 text-blue-300" : "text-lg hover:text-blue-200 transition-colors duration-300"}
                    onClick={handleClearResults}
                >
                    Favorites
                </NavLink>

                <NavLink
                    to="/about"
                    className={({ isActive }) => isActive ? "text-lg hover:text-blue-200 transition-colors duration-300 text-blue-300" : "text-lg hover:text-blue-200 transition-colors duration-300"}
                    onClick={handleClearResults}
                >
                    About
                </NavLink>
            </div>
        </div>
    )
}

export default Header;
