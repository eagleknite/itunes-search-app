function Item({ item, isFavorite, addToFavorites, removeFromFavorites, onItemClick }) {
    return (
        <div 
            // Styling for the item container, with hover effects and a rounded border
            className="border rounded-md p-3 relative hover:shadow-lg transition-shadow duration-300 cursor-pointer"
            onClick={onItemClick}
        >
            <img src={item.artworkUrl100} alt={item.trackName || item.collectionName} className="mx-auto mb-2 w-full" />
            
            <h3 className="text-center text-lg font-bold mb-2">{item.trackName || item.collectionName}</h3>
            
            <p className="text-center text-sm mb-2">{item.shortDescription}</p>
            {(item.collectionPrice || item.trackRentalPrice) && (
                <div className="flex justify-center items-center space-x-2 mb-2">
                    {item.collectionPrice && <span className="text-sm bg-blue-200 text-blue-700 p-1 rounded">Purchase: ${item.collectionPrice}</span>}
                    {item.trackRentalPrice && <span className="text-sm bg-yellow-200 text-yellow-700 p-1 rounded">Rent: ${item.trackRentalPrice}</span>}
                </div>
            )}

            {item.isStreamable && <span className="bg-green-500 text-white rounded-full p-1 text-xs absolute top-2 left-2">Streamable</span>}
            
            {(item.trackExplicitness === "explicit" || item.collectionExplicitness === "explicit") && 
                <span className="bg-red-500 text-white rounded-full p-1 text-xs absolute bottom-2 left-2">Explicit</span>
            }

            {isFavorite ?
                <button 
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                    onClick={(e) => { e.stopPropagation(); removeFromFavorites(item); }}  // Use stopPropagation to prevent triggering container's click event
                >
                    Remove
                </button> :
                <button 
                    className="absolute top-2 right-2 bg-blue-500 text-white rounded-full p-1 hover:bg-blue-600"
                    onClick={(e) => { e.stopPropagation(); addToFavorites(item); }}  // Use stopPropagation to prevent triggering container's click event
                >
                    Add
                </button>
            }
        </div>
    );
}

export default Item;
