
var nameToFind = "";
const pageSize = 25;
let page = 1;
let foundPlayers = [];

function getInput() {
    var userinput = document.getElementById("guess").value;
    foundPlayers = [];
    page = 1;
    nameToFind = userinput; 
}

generateRndPlayer();

function generateRndPlayer() {
  const playersApiUrl = "https://www.balldontlie.io/api/v1/players";

axios.get(playersApiUrl)
  .then(response => {
    if (response.data && Array.isArray(response.data.data)) {
      const players = response.data.data;

      if (players.length > 0) {
        const randomPlayer = players[Math.floor(Math.random() * players.length)];
        console.log("Randomly selected player:", randomPlayer);
      } else {
        console.log("No player data found.");
      }
    } else {
      console.log("Invalid response format. Check the API response structure.");
    }
  })
  .catch(error => console.error("Error fetching player data:", error));

}




function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchPlayers() {
  var apiUrl = `https://www.balldontlie.io/api/v1/players?search=${nameToFind}&page=${page}&per_page=${pageSize}`;

  try {
    const response = await axios.get(apiUrl);
    if (response.status === 200) {
      const players = response.data.data;

      if (players.length > 0) {
        const playerPromises = players.map(async (player) => {
          const averagesResponse = await axios.get(`https://www.balldontlie.io/api/v1/season_averages?season=2023&player_ids[]=${player.id}`);

          if (averagesResponse.status === 200) {
            const playerAverages = averagesResponse.data.data;

            if (playerAverages.length > 0) {
              const playerWithAverages = {
                player: player,
                averages: playerAverages
              };

              foundPlayers.push(playerWithAverages);
            }
          } else {
            console.log(`Failed to retrieve season averages. Status code: ${averagesResponse.status}`);
          }

          await delay(1000);
        });

        await Promise.all(playerPromises);

        if (players.length === pageSize) {
          page++;
          await fetchPlayers();
        } else {
          foundPlayers.forEach(player => {
            console.log(player);
          });
        }
      } else {
        console.log('No more players found.');
        page = 1;
      }
    } else {
      console.log(`Failed to retrieve player data. Status code: ${response.status}`);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}
