// Functional component to render sort options for search results
function SortOptions({ selectedSort, onSortChange }) {
  return (
    <div className="ml-4">
       
        <label htmlFor="sortOptions" className="mr-2">Sort By:</label>
        
        <select
            id="sortOptions"
            value={selectedSort}  // Current selected sort value
            onChange={(e) => onSortChange(e.target.value)}  // Handle sort option change
            className="border p-2 rounded-md"  // Styling for the dropdown
        >
            <option value="releaseDate">Release Date</option>
            <option value="trackPrice">Price</option>
            <option value="primaryGenreName">Genre</option>
            <option value="artistName">Artist</option>
            <option value="collectionName">Album</option>
        </select>
    </div>
  )
}

export default SortOptions;
