{/* <script>
  window.onload = () => {
    // Initialize Unsplash API with your access key
    const { createApi } = window.Unsplash; // Access createApi from the Unsplash object
    const unsplash = createApi({
      accessKey: 'YOUR_ACCESS_KEY_HERE', // Replace with your actual Unsplash API access key
    });

    // Function to search photos based on user input
    function searchPhotos() {
      const query = document.getElementById('searchInput').value.trim();

      // Make API request to search for photos
      unsplash.search.getPhotos({
        query: query,
        page: 1,
        perPage: 10,
      }).then(result => {
        if (result.errors) {
          console.error('Error occurred:', result.errors[0]);
        } else {
          console.log('Photos found:', result.response.results);
          displayPhotos(result.response.results); // Display photos on the webpage
        }
      }).catch(error => {
        console.error('Error fetching photos:', error);
      });
    }

    // Function to display fetched photos on the webpage
    function displayPhotos(photos) {
      const photosContainer = document.getElementById('photosContainer');
      photosContainer.innerHTML = ''; // Clear previous photos

      // Iterate through fetched photos and create image elements
      photos.forEach(photo => {
        const img = document.createElement('img');
        img.src = photo.urls.regular; // Display regular size image
        img.alt = photo.alt_description; // Set alt text for accessibility
        img.title = photo.alt_description; // Set title for tooltip

        // Link for triggering download
        img.onclick = () => {
          window.open(photo.urls.full); // Opens the photo in a new tab to trigger download
        };

        // Create attribution paragraph
        const attribution = document.createElement('p');
        attribution.className = 'attribution';
        attribution.innerHTML = `Photo by <a href="${photo.user.links.html}" target="_blank">${photo.user.name}</a> on <a href="https://unsplash.com" target="_blank">Unsplash</a>`;
        
        // Append elements to photos container
        photosContainer.appendChild(img); // Append image to photos container
        photosContainer.appendChild(attribution); // Append attribution
      });
    }

    // Bind the search function to the button click
    document.querySelector('button').onclick = searchPhotos;
  };
</script> */}
