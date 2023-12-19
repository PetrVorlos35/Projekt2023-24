
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

function generateRndPlayer() {
  
}

function getRandomLetter() {
  var alphabet = 'abcdefghijklmnopqrstuvwxyz';

  var randomIndex = Math.floor(Math.random() * alphabet.length);

  var randomLetter = alphabet.charAt(randomIndex);

  return randomLetter;
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
