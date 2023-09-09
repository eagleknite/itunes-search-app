import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { setError, clearError, setLoading } from './uiSlice';
import axios from 'axios';

// Define an asynchronous action to fetch search results from an external API
export const fetchSearchResults = createAsyncThunk('search/fetchSearchResults', async ({ term, media, sort, page = 1 }, { dispatch }) => {
    // Clear any previous error messages
    dispatch(clearError());
    // Indicate in the UI that loading has started
    dispatch(setLoading(true));
    
    try {
        // Make a GET request to the API with the provided search parameters
        const response = await axios.get(`/api/search?term=${term}&media=${media}&sort=${sort}&page=${page}`);
        
        // Indicate in the UI that loading has completed
        dispatch(setLoading(false));
        
        // Return the search results and total results from the response
        return {
            results: response.data.results,
            totalResults: response.data.totalResults,
        };
    } catch (error) {
        // If an error occurs, set an error message in the UI
        dispatch(setError("Failed to fetch search results."));
        
        // Indicate in the UI that loading has completed
        dispatch(setLoading(false));
        
        // Re-throw the error so it can be handled by any extra reducers if necessary
        throw error;
    }
});

// Create a slice of the Redux store to manage search results
const searchResultsSlice = createSlice({
    name: 'searchResults', // Name of the slice
    initialState: { // Initial state of the slice
        items: [], // List of search result items
        totalResults: 0, // Total number of search results
        currentSearchTerm: '', // Current search term entered by the user
    },
    reducers: {
        // Reducer to set the current search term
        setCurrentSearchTerm: (state, action) => {
            state.currentSearchTerm = action.payload;
        },
        // Reducer to clear the current search results
        clearSearchResults: (state) => {
            state.items = [];
            state.totalResults = 0;
        },
    },
    extraReducers: (builder) => {
        // Handle the fulfilled (successful) state of the fetchSearchResults asynchronous action
        builder.addCase(fetchSearchResults.fulfilled, (state, action) => {
            state.items = action.payload.results; // Update the list of search result items
            state.totalResults = action.payload.totalResults; // Update the total number of search results
        });
    },
});

// Export the action creators for use in components
export const { setCurrentSearchTerm, clearSearchResults } = searchResultsSlice.actions;

// Export the reducer to be added to the Redux store
export default searchResultsSlice.reducer;
