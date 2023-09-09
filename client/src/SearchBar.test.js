import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import SearchBar from './components/SearchBar';
import SortOptions from './components/SortOptions';
import ResultsGrid from './components/ResultsGrid';
import MediaTypeFilter from './components/MediaTypeFilter';
import FavoritesList from './components/FavoritesList';
import Item from './utils/Item';
import { MemoryRouter } from 'react-router-dom';

const mockStore = configureMockStore();
const store = mockStore({
    searchResults: {
        items: [{
            trackId: 1,
            artworkUrl100: "test.jpg",
            trackName: "Test Track",
            shortDescription: "Description"
        }],
        totalResults: 1
    },
    favorites: [{
        trackId: 1,
        artworkUrl100: "test.jpg",
        trackName: "Test Track",
        shortDescription: "Description"
    }],
    selectedItem: null,
    ui: {
        loading: false,
        error: null
    }
})

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

test('SortOptions renders correctly and triggers callback', () => {
    const onSortChange = jest.fn();
    const { getByLabelText } = render(<SortOptions selectedSort="releaseDate" onSortChange={onSortChange} />);
    const select = getByLabelText('Sort By:');
    fireEvent.change(select, { target: { value: 'artistName' } });
    expect(onSortChange).toHaveBeenCalledWith('artistName');
});

test('ResultsGrid renders items', () => {
    const mockData = [
        {
            trackId: 1,
            artworkUrl100: "test.jpg",
            trackName: "Test Track",
            shortDescription: "Description"
        }
    ];
    const { getByText } = render(
        <Provider store={store}>
            <ResultsGrid items={mockData} />
        </Provider>
    );
    expect(getByText('Test Track')).toBeInTheDocument();
});

test('MediaTypeFilter renders media types and triggers callback', () => {
    const onMediaChange = jest.fn();
    const { getByRole } = render(<MediaTypeFilter selectedMedia="all" onMediaChange={onMediaChange} />);
    const select = getByRole('combobox');
    fireEvent.change(select, { target: { value: 'movie' } });
    expect(onMediaChange).toHaveBeenCalledWith('movie');
});

test('FavoritesList renders items and removes favorites', async () => {
    const mockData = [
        {
            trackId: 1,
            artworkUrl100: "test.jpg",
            trackName: "Test Track",
            shortDescription: "Description"
        }
    ];
    const { getByText, queryByText } = render(
        <Provider store={store}>
            <FavoritesList items={mockData} />
        </Provider>
    );
    
    expect(getByText('Test Track')).toBeInTheDocument();
    
    fireEvent.click(getByText('Remove'));
    
    console.log("Favorites in Store after Remove:", store.getState().favorites);  // Logging the updated favorites in store
    
    await waitFor(() => {
        expect(queryByText('Test Track')).toBeNull();
    }, { timeout: 10000 });  // Increasing the timeout
});

test('Item renders correctly and triggers add and remove', () => {
    const mockData = {
        trackId: 1,
        artworkUrl100: "test.jpg",
        trackName: "Test Track",
        shortDescription: "Description"
    };
    const addFavorite = jest.fn();
    const removeFavorite = jest.fn();
    
    // Testing the "Add" functionality
    const { getByText, rerender } = render(
        <Item item={mockData} isFavorite={false} addToFavorites={addFavorite} removeFromFavorites={removeFavorite} />
    );
    fireEvent.click(getByText('Add'));
    expect(addFavorite).toHaveBeenCalledTimes(1);

    // Testing the "Remove" functionality
    rerender(<Item item={mockData} isFavorite={true} addToFavorites={addFavorite} removeFromFavorites={removeFavorite} />);
    fireEvent.click(getByText('Remove'));
    expect(removeFavorite).toHaveBeenCalledTimes(1);
});



