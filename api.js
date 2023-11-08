
var nameToFind = "";
const pageSize = 25;
let page = 1;
const foundPlayers = [];

function getInput() {
    var userinput = document.getElementById("guess").value;
    nameToFind = userinput
    console.log(nameToFind);
}

function fetchPlayers() {

    
  var apiUrl = `https://www.balldontlie.io/api/v1/players?search=${nameToFind}&page=${page}&per_page=${pageSize}`;

  axios.get(apiUrl)
    .then(response => {
      if (response.status === 200) {
        const players = response.data.data;

        if (players.length > 0) {
          foundPlayers.push(...players);
          if (players.length === pageSize) {
            page++;
            fetchPlayers();
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
    })
    .catch(error => {
      console.error('Error:', error);
    });
}
