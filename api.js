
const nameToFind = "kevin";
const pageSize = 25; // Number of players per page
let page = 1; // Page number
const foundPlayers = [];

function fetchPlayers() {
  const apiUrl = `https://www.balldontlie.io/api/v1/players?search=${nameToFind}&page=${page}&per_page=${pageSize}`;

  axios.get(apiUrl)
    .then(response => {
      if (response.status === 200) {
        const players = response.data.data;

        if (players.length > 0) {
          foundPlayers.push(...players);
          // Check if there are more pages
          if (players.length === pageSize) {
            // Fetch the next page
            page++;
            fetchPlayers();
          } else {
            // All players have been retrieved, log the results
            foundPlayers.forEach(player => {
              console.log(player);
            });
          }
        } else {
          console.log('No more players found.');
        }
      } else {
        console.log(`Failed to retrieve player data. Status code: ${response.status}`);
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

// Start fetching players
fetchPlayers();
