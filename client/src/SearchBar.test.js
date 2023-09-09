// Import necessary libraries and components
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import SearchBar from './components/SearchBar';
import SortOptions from './components/SortOptions';
import ResultsGrid from './components/ResultsGrid';
import MediaTypeFilter from './components/MediaTypeFilter';
import Item from './utils/Item';
import { MemoryRouter } from 'react-router-dom';

// Create a mock Redux store for testing
const mockStore = configureMockStore();
const store = mockStore({
    // Mock initial state of the Redux store
    // ... (details omitted for brevity)
});

// Test case for SearchBar component snapshot
test('SearchBar snapshot', () => {
    const { asFragment } = render(
        <Provider store={store}>
            <MemoryRouter>
                <SearchBar />
            </MemoryRouter>
        </Provider>
    );
    expect(asFragment()).toMatchSnapshot();
});

// Test case for SortOptions component rendering and callback triggering
test('SortOptions renders correctly and triggers callback', () => {
    const onSortChange = jest.fn();
    const { getByLabelText } = render(<SortOptions selectedSort="releaseDate" onSortChange={onSortChange} />);
    const select = getByLabelText('Sort By:');
    fireEvent.change(select, { target: { value: 'artistName' } });
    expect(onSortChange).toHaveBeenCalledWith('artistName');
});

// Test case to check if ResultsGrid component renders the items correctly
test('ResultsGrid renders items', () => {
    const mockData = [
        // Mock data for testing
        // ... (details omitted for brevity)
    ];
    const { getByText } = render(
        <Provider store={store}>
            <ResultsGrid items={mockData} />
        </Provider>
    );
    expect(getByText('Test Track')).toBeInTheDocument();
});

// Test case for MediaTypeFilter component rendering and callback triggering
test('MediaTypeFilter renders media types and triggers callback', () => {
    const onMediaChange = jest.fn();
    const { getByRole } = render(<MediaTypeFilter selectedMedia="all" onMediaChange={onMediaChange} />);
    const select = getByRole('combobox');
    fireEvent.change(select, { target: { value: 'movie' } });
    expect(onMediaChange).toHaveBeenCalledWith('movie');
});

// Test case to check if Item component renders correctly and triggers add and remove functions
test('Item renders correctly and triggers add and remove', () => {
    const mockData = {
        // Mock data for testing
        // ... (details omitted for brevity)
    };
    const addFavorite = jest.fn();
    const removeFavorite = jest.fn();
    
    // Testing the "Add" functionality of the Item component
    const { getByText, rerender } = render(
        <Item item={mockData} isFavorite={false} addToFavorites={addFavorite} removeFromFavorites={removeFavorite} />
    );
    fireEvent.click(getByText('Add'));
    expect(addFavorite).toHaveBeenCalledTimes(1);

    // Testing the "Remove" functionality of the Item component
    rerender(<Item item={mockData} isFavorite={true} addToFavorites={addFavorite} removeFromFavorites={removeFavorite} />);
    fireEvent.click(getByText('Remove'));
    expect(removeFavorite).toHaveBeenCalledTimes(1);
});
