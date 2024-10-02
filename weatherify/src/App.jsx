import { useState } from 'react';
import { createApi } from 'unsplash-js';
import './App.css'; // Create a CSS file for styles

const unsplash = createApi({
  accessKey: 'rLpidMgBSL5T9fRlqJkPYCjfJFSS-7l9Ml1-eZE2Ok8', // Replace with your actual Unsplash API access key
});

function App() {
  const [searchInput, setSearchInput] = useState('');
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const searchPhotos = () => {
    if (!searchInput.trim()) return; // Prevent empty search

    setLoading(true);
    setError('');

    unsplash.search.getPhotos({
      query: searchInput.trim(),
      page: 1,
      perPage: 10,
    })
      .then(result => {
        setLoading(false);
        if (result.errors) {
          setError(result.errors[0]);
        } else {
          setPhotos(result.response.results);
        }
      })
      .catch(err => {
        setLoading(false);
        setError('Error fetching photos');
        console.error('Error fetching photos:', err);
      });
  };

  return (
    <div className="App">
      <h1>Search Photos</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search photos"
          value={searchInput}
          onChange={e => setSearchInput(e.target.value)}
        />
        <button onClick={searchPhotos}>Search</button>
      </div>
      {loading && <p>Loading photos...</p>}
      {error && <p className="error-message">{error}</p>}
      <div className="photos-container">
        {photos.map(photo => (
          <div key={photo.id} className="photo-card">
            <img
              src={photo.urls.regular}
              alt={photo.alt_description}
              title={photo.alt_description}
              onClick={() => window.open(photo.urls.full)}
            />
            <p className="attribution">
              Photo by <a href={photo.user.links.html} target="_blank" rel="noopener noreferrer">{photo.user.name}</a> on <a href="https://unsplash.com" target="_blank" rel="noopener noreferrer">Unsplash</a>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
