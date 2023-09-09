
# Client (Frontend) for iTunes Search App

The client for the iTunes Search App provides a user-friendly interface to search for media on iTunes.

## Getting Started

To start the client:

```bash
npm run start
```

This will start the React development server and open the app in your default web browser.

## Features

- **Search Bar**: Allows users to search for media on iTunes.
- **Media Type Filter**: Enables users to filter results by media type (e.g., music, movies).
- **Sort Options**: Lets users sort the search results by different criteria.
- **Results Grid**: Displays search results in a grid format. Each item can be added to favorites.
- **Favorites List**: Shows a list of favorite media items that a user has saved.

## Components Breakdown

1. **SearchBar**: The main component to input search queries and select filters.
2. **MediaTypeFilter**: A dropdown to select the type of media for filtering search results.
3. **SortOptions**: Allows users to sort search results based on different criteria.
4. **ResultsGrid**: A grid display of search results.
5. **Item**: Represents a single media item in the search results or favorites list.

## Dependencies

- **React & ReactDOM**: For building the user interface.
- **React-Redux**: To manage the application state.
- **React-Router-Dom**: For routing and navigation within the app.
- **Axios**: To make HTTP requests to the backend.
- **FontAwesome**: For icons used throughout the app.
- **TailwindCSS**: A utility-first CSS framework for rapid UI development.

## Proxy

To handle requests to the backend, a proxy is set to `http://localhost:5000`.

## Development

For a detailed breakdown of scripts available:

- `npm run start`: Starts the development server.
- `npm run build`: Creates a production-ready build.
- `npm run test`: Runs tests using React's testing library and Jest.
- `npm run eject`: Ejects from `create-react-app`. Note: this is a one-way operation.

## Browsers Support

The app is configured to target:

- Production: Browsers with more than 0.2% market share, excluding Opera Mini.
- Development: The last versions of Chrome, Firefox, and Safari.
