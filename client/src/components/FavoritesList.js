// Necessary imports from Redux and local files
import { useDispatch, useSelector } from "react-redux";
import { removeFavorite } from "../store/favoritesSlice";
import Item from "../utils/Item";

// FavoritesList component definition
function FavoritesList() {
    // Get the list of favorite items from Redux state
    const favorites = useSelector(state => state.favorites);
    
    
    // Initialize dispatch function for Redux actions
    const dispatch = useDispatch();

    // Handler to remove an item from the favorites list
    const handleRemoveFromFavorites = (item) => {
        dispatch(removeFavorite(item));
    };

    // Handler to open the item's link in a new tab when clicked
    const handleItemClick = (item) => {
        if (item.collectionViewUrl) {
            window.open(item.collectionViewUrl, "_blank");
        }
    };
    
    // JSX rendering of the FavoritesList component
    return (
        <div className="p-4">
            <h2 className="mb-4 text-2xl font-bold text-center">Favorites</h2>
            { /* Conditional rendering: Show a message if favorites list is empty */ }
            {favorites.length === 0 &&
                <p className="text-center mb-4 text-gray-600">
                    Your favorites list is empty. To add items, click on the "Add" button on each item in the search results.
                </p>
            }
            { /* Grid layout for displaying favorite items */ }
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {favorites.map(item => (
                    <Item 
                        key={item.trackId || item.collectionId} 
                        item={item}
                        isFavorite={true}
                        removeFromFavorites={handleRemoveFromFavorites}
                        onItemClick={() => handleItemClick(item)}
                    />
                ))}
            </div>
        </div>
    );
}

// Export the FavoritesList component
export default FavoritesList;

