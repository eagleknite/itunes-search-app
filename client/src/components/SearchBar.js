// Required dependencies and components
import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { fetchSearchResults, setCurrentSearchTerm } from '../store/searchResultsSlice';
import MediaTypeFilter from './MediaTypeFilter';
import ResultsGrid from './ResultsGrid';
import SortOptions from './SortOptions';

// SearchBar component definition
function SearchBar() {
    // Fetching total results count from the store
    const totalResults = useSelector((state) => state.searchResults.totalResults);
    
    // Component's state for current page and pagination
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(totalResults / 50);
    
    // State for search term, media type, and sorting option
    const [term, setTerm] = useState('');
    const [media, setMedia] = useState('all');
    const [sort, setSort] = useState('releaseDate');
    
    // Redux dispatch function
    const dispatch = useDispatch();
    
    // Fetching search results and current search term from the store
    const results = useSelector(state => state.searchResults.items);
    const currentSearchTerm = useSelector(state => state.searchResults.currentSearchTerm);

    // React-router hooks for navigation and search parameters
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    // Effect to update current page from URL parameters
    useEffect(() => {
        const pageParam = searchParams.get('page');
        if (pageParam) setCurrentPage(Number(pageParam));
    }, [searchParams]);

    // Function to handle search
    const handleSearch = useCallback(() => {
        if (term) {
            dispatch(setCurrentSearchTerm(term));  // Setting current search term in store
            dispatch(fetchSearchResults({ term, media, sort, page: currentPage }));  // Dispatching search request
            setSearchParams({ page: currentPage });  // Updating URL with current page
            navigate(`/search?page=${currentPage}`);  // Navigating to updated URL
        }
    }, [dispatch, term, media, sort, currentPage, setSearchParams, navigate]);

    // Effect to trigger search when current page changes
    useEffect(() => {
        if (term) {
            handleSearch();
        }
    }, [currentPage, handleSearch, term]);

    // Effect to trigger search when sort option changes
    useEffect(() => {
        if (term) {
            handleSearch();
        }
    }, [sort, handleSearch, term]);

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        handleSearch();
    }

    // Effect to set term from store's current search term
    useEffect(() => {
        if (currentSearchTerm) {
            setTerm(currentSearchTerm);
        }
    }, [currentSearchTerm]);

    return (
        <div className="p-4">
            <div className="max-w-xl mx-auto bg-gray-100 p-4 rounded-md shadow-md">
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        id='searchTerm'
                        value={term}
                        onChange={(e) => setTerm(e.target.value)}
                        placeholder="🔍 Search..."
                        className="w-full p-2 border rounded-md mr-2 mb-2"
                    />
                    <div className="flex justify-between items-center">
                        <MediaTypeFilter selectedMedia={media} onMediaChange={setMedia} />
                        <button onClick={handleSearch} className="bg-blue-500 text-white p-2 rounded-md ml-2 hover:bg-blue-600 transition-colors">Search</button>
                        <SortOptions selectedSort={sort} onSortChange={setSort} />
                    </div>
                </form>
            </div>
            <ResultsGrid />
            {(term || results.length > 0) && (  // Only show the buttons if there's a search term
                <div className="flex justify-center mt-4">
                    <button disabled={currentPage === 1} onClick={() => setCurrentPage(prev => prev - 1)}>Previous</button>
                    {Array.from({ length: totalPages }).map((_, index) => (
                        <button
                            key={index}
                            className={`mx-1 p-2 rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-white text-blue-500 border border-blue-500'}`}
                            onClick={() => {
                                setCurrentPage(index + 1);
                                handleSearch();
                            }}
                        >
                            {index + 1}
                        </button>
                    ))}
                    <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(prev => prev + 1)}>Next</button>
                </div>
            )}
        </div>
    )
}

export default SearchBar;
