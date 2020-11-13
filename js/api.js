const API_KEY="37e5149981c94a579feaba00cbdcb473"
const base_url= "https://api.football-data.org/";

  const fetchAPI = (endpoint) => {
    return fetch(base_url + endpoint, {
      headers: new Headers({
        'X-Auth-Token' : API_KEY
      }),
    })
    .then()
  }
// Blok kode yang akan di panggil jika fetch berhasil
function status(response) {
  if (response.status !== 200) {
    console.log("Error : " + response.status);
    // Method reject() akan membuat blok catch terpanggil
    return Promise.reject(new Error(response.statusText));
  } else {
    // Mengubah suatu objek menjadi Promise agar bisa "di-then-kan"
    return Promise.resolve(response);
  }
}
// Blok kode untuk memparsing json menjadi array JavaScript
function json(response) {
  return response.json();
}
// Blok kode untuk meng-handle kesalahan di blok catch
function error(error) {
  // Parameter error berasal dari Promise.reject()
  console.log("Error : " + error);
}
// Blok kode untuk melakukan request data json
function getTeam() {

  if ('caches' in window) {
    caches.match(base_url + "v2/competitions/2001/teams").then(function(response) {
      if (response) {
        response.json().then(function (data) {
          var teamHTML = "";


          data.teams.forEach(function(team) {
            teamHTML += `
       <div class="col s4">
         <div class="card small">
            <div class="card-image">
              <img src="${team.crestUrl}" class="responsive-img">
            </div>
            <div class="card-content">
              <p class="flow-text">${team.shortName}</p>
            </div>
            <div class="indigo darken-3">
            <div class="card-action">   
              <a href="./article.html?id=${team.id}">Club Detail</a>
            </div>
            </div>
          </div>
        </div>
      </div>
                `;
          });
          // Sisipkan komponen card ke dalam elemen dengan id #content
          document.getElementById("team").innerHTML = teamHTML;
        })
      }
    })
  }

  fetchAPI("v2/competitions/2001/teams")
    .then(status)
    .then(json)
    .then(function(data) {
      // Objek/array JavaScript dari response.json() masuk lewat data.
      // Menyusun komponen card artikel secara dinamis
      var teamHTML = "";
     console.log(data);
     
      data.teams.forEach(function(team) {
        teamHTML += `
        
        <div class="col s4">
        <div class="card small">
           <div class="card-image">
             <img src="${team.crestUrl}" class="responsive-img">
           </div>
           <div class="card-content">
             <p class="flow-text">${team.shortName}</p>
           </div>
           <div class="indigo darken-3">
           <div class="card-action">
             <a href="./article.html?id=${team.id}">Club Detail</a>
             </div>
           </div>
         </div>
       </div>
     </div>

            `;
      });
      // Sisipkan komponen card ke dalam elemen dengan id #content
      document.getElementById("team").innerHTML = teamHTML;


    })
    .catch(error);
}

function getTeamById() {
  return new Promise(function(resolve, reject) {
  // Ambil nilai query parameter (?id=)
  const urlParams = new URLSearchParams(window.location.search);
  const idParam = urlParams.get("id");

  if ("caches" in window) {
    caches.match(base_url + "v2/teams/" + idParam).then(function(response) {
      if (response) {
        response.json().then(function(data) {


          let teamHTML = `
          <div class="col s12 m4">
        <div class="card-panel hoverable grey lighten-5 z-depth-1">
          <div class="row center-align">
            <div class="col s4">
              <img src="${data.crestUrl.replace(/^http:\/\//i, "https://")}" class="responsive-img">
            </div>
            <div class="col s8">
              <h5 class="flow-text  black-text">${data.name}</h5>
              <h5 class="flow-text">${data.shortName}</h5>
              <p><i class="material-icons">flag</i>${data.area.name}</p>
              <p><i class="material-icons">email</i>${data.email}</p>
              <p> <i class="material-icons">phone</i>${data.phone}</p> 
              <p<${data.venue}</p>
              <p> ${data.website}</P>
            </div>
            <div class="row center-align">
            <div class="col s4 offset-s6">
            <div class="teal accent-3">
            <p>${data.activeCompetitions[0].name}</P>
            </div>
            </div>
            <div class="col s4 offset-s6">
            <div class="green lighten-2">
            <p>${data.activeCompetitions[1].name}</P>
            </div>
            </div>
            </div>
          </div>

          <div class="col s6">
  <div class="center-align white-text blue-grey darken-4">
  <h4>Squad Team</h4>
  </div>
  </div>
  <table>
  <thead class=""striped">
    <tr>
        <th>Name</th>
        <th>Position</th>
        <th>Nationality</th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>${data.squad[0].name}</td>
      <td>${data.squad[0].position}</td>
      <td>${data.squad[0].nationality}</td>
    </tr>
    <tr>
      <td>${data.squad[1].name}</td>
      <td>${data.squad[1].position}</td>
      <td>${data.squad[1].nationality}</td>
    </tr>
    <tr>
    <td>${data.squad[2].name}</td>
    <td>${data.squad[2].position}</td>
    <td>${data.squad[2].nationality}</td>
  </tr>
  <tr>
    <td>${data.squad[3].name}</td>
    <td>${data.squad[3].position}</td>
    <td>${data.squad[3].nationality}</td>
</tr>
<tr>
   <td>${data.squad[4].name}</td>
   <td>${data.squad[4].position}</td>
   <td>${data.squad[4].nationality}</td>
</tr>
<tr>
   <td>${data.squad[5].name}</td>
   <td>${data.squad[5].position}</td>
   <td>${data.squad[5].nationality}</td>
</tr>
<tr>
   <td>${data.squad[6].name}</td>
   <td>${data.squad[6].position}</td>
   <td>${data.squad[6].nationality}</td>
</tr>
<tr>
   <td>${data.squad[7].name}</td>
   <td>${data.squad[7].position}</td>
   <td>${data.squad[7].nationality}</td>
</tr>
<tr>
   <td>${data.squad[8].name}</td>
   <td>${data.squad[8].position}</td>
   <td>${data.squad[8].nationality}</td>
</tr>
<tr>
   <td>${data.squad[9].name}</td>
   <td>${data.squad[9].position}</td>
   <td>${data.squad[9].nationality}</td>
</tr>
<tr>
   <td>${data.squad[10].name}</td>
   <td>${data.squad[10].position}</td>
   <td>${data.squad[10].nationality}</td>
</tr>
<tr>
   <td>${data.squad[11].name}</td>
   <td>${data.squad[11].position}</td>
   <td>${data.squad[11].nationality}</td>
</tr>  
  </tbody>
</table>
</div>
         `;
          // Sisipkan komponen card ke dalam elemen dengan id #content
          document.getElementById("body-content").innerHTML = teamHTML;
          resolve(data);
        });
      };
    });
  }

  fetchAPI( 'v2/teams/' + idParam)
    .then(status)
    .then(json)
    .then(function(data) {
      // Objek JavaScript dari response.json() masuk lewat variabel data.
      console.log(data);
      // Menyusun komponen card artikel secara dinamis
      var teamHTML =`
     

  <div class="col s12 m4">
        <div class="card-panel hoverable grey lighten-5 z-depth-1">
          <div class="row center-align">
            <div class="col s4">
              <img src="${data.crestUrl}" class="responsive-img">
            </div>
            <div class="col s8">
              <h5 class="flow-text  black-text">${data.name}</h5>
              <h5 class="flow-text">${data.shortName}</h5>
              <p><i class="material-icons">flag</i>${data.area.name}</p>
              <p><i class="material-icons">email</i>${data.email}</p>
              <p> <i class="material-icons">phone</i>${data.phone}</p> 
              <p<${data.venue}</p>
              <p> ${data.website}</P>
            </div>
            <div class="row center-align">
            <div class="col s4 offset-s6">
            <div class="teal accent-3">
            <p>${data.activeCompetitions[0].name}</P>
            </div>
            </div>
            <div class="col s4 offset-s6">
            <div class="green lighten-2">
            <p>${data.activeCompetitions[1].name}</P>
            </div>
            </div>
            </div>
          </div>

          <div class="col s6">
  <div class="center-align white-text blue-grey darken-4">
  <h4>Squad Team</h4>
  </div>
  </div>
  <table>
  <thead class=""striped">
    <tr>
        <th>Name</th>
        <th>Position</th>
        <th>Nationality</th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>${data.squad[0].name}</td>
      <td>${data.squad[0].position}</td>
      <td>${data.squad[0].nationality}</td>
    </tr>
    <tr>
      <td>${data.squad[1].name}</td>
      <td>${data.squad[1].position}</td>
      <td>${data.squad[1].nationality}</td>
    </tr>
    <tr>
    <td>${data.squad[2].name}</td>
    <td>${data.squad[2].position}</td>
    <td>${data.squad[2].nationality}</td>
  </tr>
  <tr>
    <td>${data.squad[3].name}</td>
    <td>${data.squad[3].position}</td>
    <td>${data.squad[3].nationality}</td>
</tr>
<tr>
   <td>${data.squad[4].name}</td>
   <td>${data.squad[4].position}</td>
   <td>${data.squad[4].nationality}</td>
</tr>
<tr>
   <td>${data.squad[5].name}</td>
   <td>${data.squad[5].position}</td>
   <td>${data.squad[5].nationality}</td>
</tr>
<tr>
   <td>${data.squad[6].name}</td>
   <td>${data.squad[6].position}</td>
   <td>${data.squad[6].nationality}</td>
</tr>
<tr>
   <td>${data.squad[7].name}</td>
   <td>${data.squad[7].position}</td>
   <td>${data.squad[7].nationality}</td>
</tr>
<tr>
   <td>${data.squad[8].name}</td>
   <td>${data.squad[8].position}</td>
   <td>${data.squad[8].nationality}</td>
</tr>
<tr>
   <td>${data.squad[9].name}</td>
   <td>${data.squad[9].position}</td>
   <td>${data.squad[9].nationality}</td>
</tr>
<tr>
   <td>${data.squad[10].name}</td>
   <td>${data.squad[10].position}</td>
   <td>${data.squad[10].nationality}</td>
</tr>
<tr>
   <td>${data.squad[11].name}</td>
   <td>${data.squad[11].position}</td>
   <td>${data.squad[11].nationality}</td>
</tr>  
  </tbody>
</table>
</div>
          `;
          
      // Sisipkan komponen card ke dalam elemen dengan id #content
      document.getElementById("body-content").innerHTML = teamHTML;
      // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
      resolve(data);
    });
  });
}

function getSavedTeams() {
  getAll().then(function(teams) {
    console.log(teams);
    // Menyusun komponen card artikel secara dinamis
    var teamsHTML = "";
    teams.forEach(function(team) {
      var description = team.name.substring(0,500);
      teamsHTML += `  
     <div class="col s4">
         <div class="card small">
            <div class="card-image">
              <img src="${team.crestUrl}" class="responsive-img">
            </div>
            <div class="card-content">
              <p class="flow-text">${team.shortName}</p>
            </div>
            <div class="indigo darken-3">
            <div class="card-action">   
              <a href="./article.html?id=${team.id}&saved=true">Club Detail</a>
            </div>
            </div>
          </div>
        </div>
      </div>
                `;
    });
    // Sisipkan komponen card ke dalam elemen dengan id #body-content
    document.getElementById("body-content").innerHTML = teamsHTML;
  });
}

function getSavedArticleById() {
  var urlParams = new URLSearchParams(window.location.search);
  var idParam = parseInt(urlParams.get("id"));
  
  getById(idParam).then(function(article) {
    articleHTML = '';
    var articleHTML = `
<div class="col s12 m4">
    <div class="card-panel hoverable grey lighten-5 z-depth-1">
      <div class="row center-align">
        <div class="col s4">
          <img src="${article.crestUrl.replace(/^http:\/\//i, "https://")}" class="responsive-img">
        </div>
        <div class="col s8">
          <h5 class="flow-text  black-text">${article.name}</h5>
          <h5 class="flow-text">${article.shortName}</h5>
          <p><i class="material-icons">flag</i>${article.area.name}</p>
          <p><i class="material-icons">email</i>${article.email}</p>
          <p> <i class="material-icons">phone</i>${article.phone}</p> 
          <p<${article.venue}</p>
          <p> ${article.website}</P>
        </div>
               <div class="row center-align">
                 <div class="col s4 offset-s6">
                    <div class="teal accent-3">
                     <p>${article.activeCompetitions[0].name}</P>
                    </div>
                 </div>
                 <div class="col s4 offset-s6">
                   <div class="green lighten-2">
                     <p>${article.activeCompetitions[1].name}</P>
                   </div>
                 </div>
               </div>
            </div>
         </div>
  `;
    // Sisipkan komponen card ke dalam elemen dengan id #content
    document.getElementById("body-content").innerHTML = articleHTML;
  });
}

function getStanding() {
  if ('caches' in window) {
    caches.match(base_url + "v2/competitions/2001/standings").then(function(response) {
      if (response) {
        response.json().then(function (data) {
         let standingsHTML = "";
          data.standings.forEach(function(standing) {
            standingsHTML += `
            <h3>${standing.group}</h3>
            <p>${standing.type}</p>   
        <table>
            <thead>
              <tr>
                  <th>Pos</th>
                  <th>Team</th>
                  <th></th>
                  <th>M</th>
                  <th>W</th>
                  <th>D</th>
                  <th>L</th>
                  <th>GF</th>
                  <th>GA</th>
                  <th>Gd</th>
                  <th>Pts</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>${standing.table[0].position}</td>
                <td>
                <img src="${standing.table[0].team.crestUrl}" width="50" height="50">
                </td>
                <td>${standing.table[0].team.name}</td>
                <td>${standing.table[0].playedGames}</td>
                <td>${standing.table[0].won}</td>
                <td>${standing.table[0].draw}</td>
                <td>${standing.table[0].lost}</td>
                <td>${standing.table[0].goalsFor}</td>
                <td>${standing.table[0].goalsAgainst}</td>
                <td>${standing.table[0].goalDifference}</td>
                <td>${standing.table[0].points}</td>
              </tr>
              <tr>
                <td>${standing.table[1].position}</td>
                <td>
                <img src="${standing.table[1].team.crestUrl}" width="50" height="50">
                </td>
                <td>${standing.table[1].team.name}</td>
                <td>${standing.table[1].playedGames}</td>
                <td>${standing.table[1].won}</td>
                <td>${standing.table[1].draw}</td>
                <td>${standing.table[1].lost}</td>
                <td>${standing.table[1].goalsFor}</td>
                <td>${standing.table[1].goalsAgainst}</td>
                <td>${standing.table[1].goalDifference}</td>
                <td>${standing.table[1].points}</td>
              </tr>
              <tr>
                <td>${standing.table[2].position}</td>
                <td>
                <img src="${standing.table[2].team.crestUrl}" width="50" height="50">
                </td>
                <td>${standing.table[2].team.name}</td>
                <td>${standing.table[2].playedGames}</td>
                <td>${standing.table[2].won}</td>
                <td>${standing.table[2].draw}</td>
                <td>${standing.table[2].lost}</td>
                <td>${standing.table[2].goalsFor}</td>
                <td>${standing.table[2].goalsAgainst}</td>
                <td>${standing.table[2].goalDifference}</td>
                <td>${standing.table[2].points}</td>
              </tr>
              <tr>
              <td>${standing.table[3].position}</td>
              <td>
              <img src="${standing.table[3].team.crestUrl}" width="50" height="50">
              </td>
              <td>${standing.table[3].team.name}</td>
              <td>${standing.table[3].playedGames}</td>
              <td>${standing.table[3].won}</td>
              <td>${standing.table[3].draw}</td>
              <td>${standing.table[3].lost}</td>
              <td>${standing.table[3].goalsFor}</td>
              <td>${standing.table[3].goalsAgainst}</td>
              <td>${standing.table[3].goalDifference}</td>
              <td>${standing.table[3].points}</td>
            </tr>
            </tbody>
       </table>  
                `;
          });
          // Sisipkan komponen card ke dalam elemen dengan id #content
          document.getElementById("standings").innerHTML = standingsHTML;
        })
      }
    })
  }  

  fetchAPI("v2/competitions/2001/standings")
    .then(status)
    .then(json)
    .then(function(data) {
      // Objek/array JavaScript dari response.json() masuk lewat data.
      // Menyusun komponen card artikel secara dinamis
      let standingsHTML = "";
     console.log(data);
     
      data.standings.forEach(function(standing) {
        standingsHTML += ` 
        <h3>${standing.group}</h3>
        <p>${standing.type}</p>   
    <table>
        <thead>
          <tr>
              <th>Pos</th>
              <th>Team</th>
              <th></th>
              <th>M</th>
              <th>W</th>
              <th>D</th>
              <th>L</th>
              <th>GF</th>
              <th>GA</th>
              <th>Gd</th>
              <th>Pts</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>${standing.table[0].position}</td>
            <td>
            <img src="${standing.table[0].team.crestUrl}" width="50" height="50">
            </td>
            <td>${standing.table[0].team.name}</td>
            <td>${standing.table[0].playedGames}</td>
            <td>${standing.table[0].won}</td>
            <td>${standing.table[0].draw}</td>
            <td>${standing.table[0].lost}</td>
            <td>${standing.table[0].goalsFor}</td>
            <td>${standing.table[0].goalsAgainst}</td>
            <td>${standing.table[0].goalDifference}</td>
            <td>${standing.table[0].points}</td>
          </tr>
          <tr>
            <td>${standing.table[1].position}</td>
            <td>
            <img src="${standing.table[1].team.crestUrl}" width="50" height="50">
            </td>
            <td>${standing.table[1].team.name}</td>
            <td>${standing.table[1].playedGames}</td>
            <td>${standing.table[1].won}</td>
            <td>${standing.table[1].draw}</td>
            <td>${standing.table[1].lost}</td>
            <td>${standing.table[1].goalsFor}</td>
            <td>${standing.table[1].goalsAgainst}</td>
            <td>${standing.table[1].goalDifference}</td>
            <td>${standing.table[1].points}</td>
          </tr>
          <tr>
            <td>${standing.table[2].position}</td>
            <td>
            <img src="${standing.table[2].team.crestUrl}" width="50" height="50">
            </td>
            <td>${standing.table[2].team.name}</td>
            <td>${standing.table[2].playedGames}</td>
            <td>${standing.table[2].won}</td>
            <td>${standing.table[2].draw}</td>
            <td>${standing.table[2].lost}</td>
            <td>${standing.table[2].goalsFor}</td>
            <td>${standing.table[2].goalsAgainst}</td>
            <td>${standing.table[2].goalDifference}</td>
            <td>${standing.table[2].points}</td>
          </tr>
          <tr>
          <td>${standing.table[3].position}</td>
          <td>
          <img src="${standing.table[3].team.crestUrl}" width="50" height="50">
          </td>
          <td>${standing.table[3].team.name}</td>
          <td>${standing.table[3].playedGames}</td>
          <td>${standing.table[3].won}</td>
          <td>${standing.table[3].draw}</td>
          <td>${standing.table[3].lost}</td>
          <td>${standing.table[3].goalsFor}</td>
          <td>${standing.table[3].goalsAgainst}</td>
          <td>${standing.table[3].goalDifference}</td>
          <td>${standing.table[3].points}</td>
        </tr>
        </tbody>
   </table>  
            `;
      });
      // Sisipkan komponen card ke dalam elemen dengan id #content
      document.getElementById("standings").innerHTML = standingsHTML;
    })
    .catch(error);
}
