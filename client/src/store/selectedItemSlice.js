import { createSlice } from '@reduxjs/toolkit';

// Create a slice of the Redux store to manage the state of a selected item
const selectedItemSlice = createSlice({
    name: 'selectedItem', // Name of the slice
    initialState: null, // Initial state of the slice (no item selected by default)
    reducers: {
        // Reducer to set the state with the selected item
        setSelectedItem: (state, action) => action.payload,
        
        // Reducer to clear the selected item (set back to the initial state)
        clearSelectedItem: () => null,
    },
});

// Export the action creators for use in components
export const { setSelectedItem, clearSelectedItem } = selectedItemSlice.actions;

// Export the reducer to be added to the Redux store
export default selectedItemSlice.reducer;
