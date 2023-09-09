import { configureStore } from '@reduxjs/toolkit';

// Importing the individual reducers from slices
import searchResultsReducer from './searchResultsSlice';
import selectedItemReducer from './selectedItemSlice';
import uiReducer from './uiSlice';
import favoritesReducer from './favoritesSlice';

// Configuring the Redux store with the imported reducers
const store = configureStore({
    reducer: {
        // Assigning the searchResults section of the state to the searchResultsReducer
        searchResults: searchResultsReducer,
        
        // Assigning the selectedItem section of the state to the selectedItemReducer
        selectedItem: selectedItemReducer,
        
        // Assigning the ui section of the state to the uiReducer
        ui: uiReducer,
        
        // Assigning the favorites section of the state to the favoritesReducer
        favorites: favoritesReducer,
    },
});

// Exporting the configured store to be used in the application
export default store;


