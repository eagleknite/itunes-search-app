// Required dependencies and actions from slices
import { useDispatch, useSelector } from "react-redux";
import { setSelectedItem } from "../store/selectedItemSlice";
import { addFavorite, removeFavorite } from "../store/favoritesSlice";
import Item from "../utils/Item";

// ResultsGrid component definition
function ResultsGrid() {
    // Fetching search results and favorites from the store
    const results = useSelector(state => state.searchResults.items);
    const favorites = useSelector(state => state.favorites);
    
    // Redux dispatch function
    const dispatch = useDispatch();

    // Function to handle item click
    const handleItemClick = (item) => {
        // Set the selected item in the store
        dispatch(setSelectedItem(item));

        // If the item has a collectionViewUrl, open it in a new tab
        if (item.collectionViewUrl) {
            window.open(item.collectionViewUrl, "_blank");
        }
    };

    // Loop to check if all items have a trackId or collectionId (for audiobooks)
    results.forEach(item => {
        if (!item.trackId && !item.collectionId) {
            console.error("Item without trackId or collectionId:", item);
        }
    });

    // Function to handle adding item to favorites
    const handleAddToFavorites = (item) => {
        dispatch(addFavorite(item));
    };

    // Function to handle removing item from favorites
    const handleRemoveFromFavorites = (item) => {
        dispatch(removeFavorite(item));
    };

    // Component's JSX rendering
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4 bg-gray-50 rounded-md">
            {results.map(item => (
                <Item
                    key={item.trackId || item.collectionId}
                    item={item}
                    // Check if current item is in favorites
                    isFavorite={favorites.some(fav => fav.trackId === item.trackid)}
                    addToFavorites={handleAddToFavorites}
                    removeFromFavorites={handleRemoveFromFavorites}
                    onItemClick={() => handleItemClick(item)}
                />
            ))}
        </div>
    );
}

// Exporting the ResultsGrid component
export default ResultsGrid;
