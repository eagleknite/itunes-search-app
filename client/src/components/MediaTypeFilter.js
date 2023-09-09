// MediaTypeFilter component definition
function MediaTypeFilter({ selectedMedia, onMediaChange }) {

    // A predefined list of media types with their labels and values
    const mediaTypes = [
        { label: 'All', value: 'all' },
        { label: 'Movie', value: 'movie' },
        { label: 'Podcast', value: 'podcast' },
        { label: 'Music', value: 'music' },
        { label: 'Audiobook', value: 'audiobook' },
        { label: 'Short Film', value: 'shortFilm' },
        { label: 'TV Show', value: 'tvShow' },
        { label: 'Software', value: 'software' },
        { label: 'Ebook', value: 'ebook' }
    ];

    // Component's JSX rendering
    return (
        // Dropdown selector for media types
        <select
            // The currently selected media type
            value={selectedMedia}
            // When the selected media changes, call the passed onMediaChange function
            onChange={(e) => onMediaChange(e.target.value)}
            className="bg-gray-200 p-2 rounded-md"
        >
            {/* Loop through each media type and render it as an option in the dropdown */}
            {mediaTypes.map(type => (
                <option key={type.value} value={type.value}>
                    {type.label}
                </option>
            ))}
        </select>
    )
}

// Exporting the MediaTypeFilter component
export default MediaTypeFilter;
