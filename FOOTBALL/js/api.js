let base_url= "https://api.football-data.org/";

  const fetchAPI = (endpoint) => {
    return fetch(base_url + endpoint, {
      headers: new Headers({
        'X-Auth-Token' : '37e5149981c94a579feaba00cbdcb473',
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
function getArticles() {

  if ('caches' in window) {
    caches.match(base_url + "v2/competitions/2001/teams").then(function(response) {
      if (response) {
        response.json().then(function (data) {
          let articlesHTML = "";
          data.teams.forEach(function(article) {
            articlesHTML += `
            <div class="col s6 m4">
            <div class="card-panel grey lighten-5 z-depth-1">
              <div class="row center-align">
                <a href="./article.html?id=${article.id}">
                <div class="col s4">
                  <img src="${article.crestUrl}" class="responsive-img">
                </div>
                <div class="col s8">
                  <h5 class="flow-text">${article.shortName}</h5>
                </div>
                </a>
              </div>
            </div>
          </div>
                `;
          });
          // Sisipkan komponen card ke dalam elemen dengan id #content
          document.getElementById("articles").innerHTML = articlesHTML;
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
      let articlesHTML = "";
     console.log(data);
     
      data.teams.forEach(function(article) {
        articlesHTML += `
        
      <div class="col s6 m4">
        <div class="card-panel grey lighten-5 z-depth-1">
          <div class="row center-align">
            <a href="./article.html?id=${article.id}">
            <div class="col s4">
              <img src="${article.crestUrl}" class="responsive-img">
            </div>
            <div class="col s8">
              <h5 class="flow-text">${article.shortName}</h5>
            </div>
            </a>
          </div>
        </div>
      </div>

            `;
      });
      // Sisipkan komponen card ke dalam elemen dengan id #content
      document.getElementById("articles").innerHTML = articlesHTML;
    })
    .catch(error);
}

function getArticleById() {
  return new Promise(function(resolve, reject) {
  // Ambil nilai query parameter (?id=)
  let urlParams = new URLSearchParams(window.location.search);
  let idParam = urlParams.get("id");

  if ("caches" in window) {
    caches.match(base_url + "v2/teams/" + idParam).then(function(response) {
      if (response) {
        response.json().then(function(data) {
          let articleHTML = `
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
<tr>
   <td>${data.squad[12].name}</td>
   <td>${data.squad[12].position}</td>
   <td>${data.squad[12].nationality}</td>
</tr>
<tr>
   <td>${data.squad[13].name}</td>
   <td>${data.squad[13].position}</td>
   <td>${data.squad[13].nationality}</td>
</tr>
<tr>
   <td>${data.squad[14].name}</td>
   <td>${data.squad[14].position}</td>
   <td>${data.squad[14].nationality}</td>
</tr>
<tr>
   <td>${data.squad[15].name}</td>
   <td>${data.squad[15].position}</td>
   <td>${data.squad[15].nationality}</td>
</tr>
<tr>
   <td>${data.squad[16].name}</td>
   <td>${data.squad[16].position}</td>
   <td>${data.squad[16].nationality}</td>
</tr>
<tr>
   <td>${data.squad[17].name}</td>
   <td>${data.squad[17].position}</td>
   <td>${data.squad[17].nationality}</td>
</tr>  
<tr>
   <td>${data.squad[18].name}</td>
   <td>${data.squad[18].position}</td>
   <td>${data.squad[18].nationality}</td>
</tr>
<tr>
   <td>${data.squad[19].name}</td>
   <td>${data.squad[19].position}</td>
   <td>${data.squad[19].nationality}</td>
</tr>  
<tr>
   <td>${data.squad[20].name}</td>
   <td>${data.squad[20].position}</td>
   <td>${data.squad[20].nationality}</td>
</tr>
<tr>
   <td>${data.squad[21].name}</td>
   <td>${data.squad[21].position}</td>
   <td>${data.squad[21].nationality}</td>
</tr>
<tr>
   <td>${data.squad[22].name}</td>
   <td>${data.squad[22].position}</td>
   <td>${data.squad[22].nationality}</td>
</tr>
<tr>
   <td>${data.squad[23].name}</td>
   <td>${data.squad[23].position}</td>
   <td>${data.squad[23].nationality}</td>
</tr>
<tr>
   <td>${data.squad[24].name}</td>
   <td>${data.squad[24].position}</td>
   <td>${data.squad[24].nationality}</td>
</tr>
<tr>
   <td>${data.squad[25].name}</td>
   <td>${data.squad[25].position}</td>
   <td>${data.squad[25].nationality}</td>
</tr> 
  </tbody>
</table></div>
          `;
          // Sisipkan komponen card ke dalam elemen dengan id #content
          document.getElementById("body-content").innerHTML = articleHTML;
          resolve(data);
        });
      }
    });
  }

  fetchAPI( 'v2/teams/' + idParam)
    .then(status)
    .then(json)
    .then(function(data) {
      // Objek JavaScript dari response.json() masuk lewat variabel data.
      console.log(data);
      // Menyusun komponen card artikel secara dinamis
      let articleHTML = `

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
<tr>
   <td>${data.squad[12].name}</td>
   <td>${data.squad[12].position}</td>
   <td>${data.squad[12].nationality}</td>
</tr>
<tr>
   <td>${data.squad[13].name}</td>
   <td>${data.squad[13].position}</td>
   <td>${data.squad[13].nationality}</td>
</tr>
<tr>
   <td>${data.squad[14].name}</td>
   <td>${data.squad[14].position}</td>
   <td>${data.squad[14].nationality}</td>
</tr>
<tr>
   <td>${data.squad[15].name}</td>
   <td>${data.squad[15].position}</td>
   <td>${data.squad[15].nationality}</td>
</tr>
<tr>
   <td>${data.squad[16].name}</td>
   <td>${data.squad[16].position}</td>
   <td>${data.squad[16].nationality}</td>
</tr>
<tr>
   <td>${data.squad[17].name}</td>
   <td>${data.squad[17].position}</td>
   <td>${data.squad[17].nationality}</td>
</tr>  
<tr>
   <td>${data.squad[18].name}</td>
   <td>${data.squad[18].position}</td>
   <td>${data.squad[18].nationality}</td>
</tr>
<tr>
   <td>${data.squad[19].name}</td>
   <td>${data.squad[19].position}</td>
   <td>${data.squad[19].nationality}</td>
</tr>  
<tr>
   <td>${data.squad[20].name}</td>
   <td>${data.squad[20].position}</td>
   <td>${data.squad[20].nationality}</td>
</tr>
<tr>
   <td>${data.squad[21].name}</td>
   <td>${data.squad[21].position}</td>
   <td>${data.squad[21].nationality}</td>
</tr>
<tr>
   <td>${data.squad[22].name}</td>
   <td>${data.squad[22].position}</td>
   <td>${data.squad[22].nationality}</td>
</tr>
<tr>
   <td>${data.squad[23].name}</td>
   <td>${data.squad[23].position}</td>
   <td>${data.squad[23].nationality}</td>
</tr>
<tr>
   <td>${data.squad[24].name}</td>
   <td>${data.squad[24].position}</td>
   <td>${data.squad[24].nationality}</td>
</tr>
<tr>
   <td>${data.squad[25].name}</td>
   <td>${data.squad[25].position}</td>
   <td>${data.squad[25].nationality}</td>
</tr>   
  </tbody>
</table>
</div>

        `;
      // Sisipkan komponen card ke dalam elemen dengan id #content
      document.getElementById("body-content").innerHTML = articleHTML;
      // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
      resolve(data);
    });
  });
}

function getSavedArticles() {
  getAll().then(function(articles) {
    console.log(articles);
    // Menyusun komponen card artikel secara dinamis
    let articlesHTML = "";
    articles.forEach(function(article) {
      let description = article.name.substring(0,500);
      articlesHTML += `
      <div class="col s6 m4">
       <div class="card-panel grey lighten-5 z-depth-1">
         <div class="row center-align">
           <a href="./article.html?id=${article.id}&saved=true">
             <div class="col s4">
                <img src="${article.crestUrl}" class="responsive-img">
              </div>
             <div class="col s8">
                <h5 class="flow-text">${article.shortName}</h5>
             </div>
           </a>
         </div>
       </div>
     </div>
                `;
    });
    // Sisipkan komponen card ke dalam elemen dengan id #body-content
    document.getElementById("body-content").innerHTML = articlesHTML;
  });
}

function getSavedArticleById() {
  let urlParams = new URLSearchParams(window.location.search);
  let idParam = parseInt(urlParams.get("id"));
  
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
                          <td>${article.squad[0].name}</td>
                          <td>${article.squad[0].position}</td>
                          <td>${article.squad[0].nationality}</td>
                       </tr>
                       <tr>
                          <td>${article.squad[1].name}</td>
                          <td>${article.squad[1].position}</td>
                          <td>${article.squad[1].nationality}</td>
                       </tr>
                       <tr>
                          <td>${article.squad[2].name}</td>
                          <td>${article.squad[2].position}</td>
                          <td>${article.squad[2].nationality}</td>
                       </tr>
                       <tr>
                          <td>${article.squad[3].name}</td>
                          <td>${article.squad[3].position}</td>
                          <td>${article.squad[3].nationality}</td>
                      </tr>
                      <tr>
                          <td>${article.squad[4].name}</td>
                          <td>${article.squad[4].position}</td>
                          <td>${article.squad[4].nationality}</td>     
                       </tr>
                       <tr>
                          <td>${article.squad[5].name}</td>
                          <td>${article.squad[5].position}</td>
                          <td>${article.squad[5].nationality}</td>
                       </tr>
                       <tr>
                          <td>${article.squad[6].name}</td>
                          <td>${article.squad[6].position}</td>
                          <td>${article.squad[6].nationality}</td>
                       </tr>
                       <tr>
                          <td>${article.squad[7].name}</td>
                          <td>${article.squad[7].position}</td>
                          <td>${article.squad[7].nationality}</td>
                       </tr>
                       <tr>
                          <td>${article.squad[8].name}</td>
                          <td>${article.squad[8].position}</td>
                          <td>${article.squad[8].nationality}</td>
                       </tr>
                       <tr>
                          <td>${article.squad[9].name}</td>
                          <td>${article.squad[9].position}</td>
                          <td>${article.squad[9].nationality}</td>
                       </tr>
                       <tr>
                          <td>${article.squad[10].name}</td>
                          <td>${article.squad[10].position}</td>
                          <td>${article.squad[10].nationality}</td>
                       </tr>
                       <tr>
                          <td>${article.squad[11].name}</td>
                          <td>${article.squad[11].position}</td>
                          <td>${article.squad[11].nationality}</td>
                      </tr>
                      <tr>
                          <td>${article.squad[12].name}</td>
                          <td>${article.squad[12].position}</td>
                          <td>${article.squad[12].nationality}</td>
                      </tr>
                      <tr>
                          <td>${article.squad[13].name}</td>
                          <td>${article.squad[13].position}</td>
                          <td>${article.squad[13].nationality}</td>
                      </tr>
                      <tr>
                          <td>${article.squad[14].name}</td>
                          <td>${article.squad[14].position}</td>
                          <td>${article.squad[14].nationality}</td>
                      </tr>
                      <tr>
                          <td>${article.squad[15].name}</td>
                          <td>${article.squad[15].position}</td>
                          <td>${article.squad[15].nationality}</td>
                      </tr>
                      <tr>
                          <td>${article.squad[16].name}</td>
                          <td>${article.squad[16].position}</td>
                          <td>${article.squad[16].nationality}</td>
                      </tr>
                      <tr>
                          <td>${article.squad[17].name}</td>
                          <td>${article.squad[17].position}</td>
                          <td>${article.squad[17].nationality}</td>
                      </tr>  
                      <tr>
                          <td>${article.squad[18].name}</td>
                          <td>${article.squad[18].position}</td>
                          <td>${article.squad[18].nationality}</td>
                      </tr>
                      <tr>
                          <td>${article.squad[19].name}</td>
                          <td>${article.squad[19].position}</td>
                          <td>${article.squad[19].nationality}</td>
                      </tr>  
                      <tr>
                          <td>${article.squad[20].name}</td>
                          <td>${article.squad[20].position}</td>
                          <td>${article.squad[20].nationality}</td>
                      </tr>
                      <tr>
                          <td>${article.squad[21].name}</td>
                          <td>${article.squad[21].position}</td>
                          <td>${article.squad[21].nationality}</td>
                      </tr>
                      <tr>
                          <td>${article.squad[22].name}</td>
                          <td>${article.squad[22].position}</td>
                          <td>${article.squad[22].nationality}</td>
                      </tr>
                      <tr>
                          <td>${article.squad[23].name}</td>
                          <td>${article.squad[23].position}</td>
                          <td>${article.squad[23].nationality}</td>
                      </tr>
                      <tr>
                          <td>${article.squad[24].name}</td>
                          <td>${article.squad[24].position}</td>
                          <td>${article.squad[24].nationality}</td>
                      </tr>
                      <tr>
                          <td>${article.squad[25].name}</td>
                          <td>${article.squad[25].position}</td>
                          <td>${article.squad[25].nationality}</td>
                      </tr>     
                   </tbody>
                 </table>
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
          let articlesHTML = "";
          data.teams.forEach(function(article) {
            articlesHTML += `
            <h3>${article.group}</h3>
            <p>${article.type}</p>   
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
                <td>${article.table[0].position}</td>
                <td>
                <img src="${article.table[0].team.crestUrl}" width="50" height="50">
                </td>
                <td>${article.table[0].team.name}</td>
                <td>${article.table[0].playedGames}</td>
                <td>${article.table[0].won}</td>
                <td>${article.table[0].draw}</td>
                <td>${article.table[0].lost}</td>
                <td>${article.table[0].goalsFor}</td>
                <td>${article.table[0].goalsAgainst}</td>
                <td>${article.table[0].goalDifference}</td>
                <td>${article.table[0].points}</td>
              </tr>
              <tr>
                <td>${article.table[1].position}</td>
                <td>
                <img src="${article.table[1].team.crestUrl}" width="50" height="50">
                </td>
                <td>${article.table[1].team.name}</td>
                <td>${article.table[1].playedGames}</td>
                <td>${article.table[1].won}</td>
                <td>${article.table[1].draw}</td>
                <td>${article.table[1].lost}</td>
                <td>${article.table[1].goalsFor}</td>
                <td>${article.table[1].goalsAgainst}</td>
                <td>${article.table[1].goalDifference}</td>
                <td>${article.table[1].points}</td>
              </tr>
              <tr>
                <td>${article.table[2].position}</td>
                <td>
                <img src="${article.table[2].team.crestUrl}" width="50" height="50">
                </td>
                <td>${article.table[2].team.name}</td>
                <td>${article.table[2].playedGames}</td>
                <td>${article.table[2].won}</td>
                <td>${article.table[2].draw}</td>
                <td>${article.table[2].lost}</td>
                <td>${article.table[2].goalsFor}</td>
                <td>${article.table[2].goalsAgainst}</td>
                <td>${article.table[2].goalDifference}</td>
                <td>${article.table[2].points}</td>
              </tr>
              <tr>
              <td>${article.table[3].position}</td>
              <td>
              <img src="${article.table[3].team.crestUrl}" width="50" height="50">
              </td>
              <td>${article.table[3].team.name}</td>
              <td>${article.table[3].playedGames}</td>
              <td>${article.table[3].won}</td>
              <td>${article.table[3].draw}</td>
              <td>${article.table[3].lost}</td>
              <td>${article.table[3].goalsFor}</td>
              <td>${article.table[3].goalsAgainst}</td>
              <td>${article.table[3].goalDifference}</td>
              <td>${article.table[3].points}</td>
            </tr>
            </tbody>
       </table>  
                `;
          });
          // Sisipkan komponen card ke dalam elemen dengan id #content
          document.getElementById("articles").innerHTML = articlesHTML;
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
      let articlesHTML = "";
     console.log(data);
     
      data.standings.forEach(function(article) {
        articlesHTML += ` 
        <h3>${article.group}</h3>
        <p>${article.type}</p>   
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
            <td>${article.table[0].position}</td>
            <td>
            <img src="${article.table[0].team.crestUrl}" width="50" height="50">
            </td>
            <td>${article.table[0].team.name}</td>
            <td>${article.table[0].playedGames}</td>
            <td>${article.table[0].won}</td>
            <td>${article.table[0].draw}</td>
            <td>${article.table[0].lost}</td>
            <td>${article.table[0].goalsFor}</td>
            <td>${article.table[0].goalsAgainst}</td>
            <td>${article.table[0].goalDifference}</td>
            <td>${article.table[0].points}</td>
          </tr>
          <tr>
            <td>${article.table[1].position}</td>
            <td>
            <img src="${article.table[1].team.crestUrl}" width="50" height="50">
            </td>
            <td>${article.table[1].team.name}</td>
            <td>${article.table[1].playedGames}</td>
            <td>${article.table[1].won}</td>
            <td>${article.table[1].draw}</td>
            <td>${article.table[1].lost}</td>
            <td>${article.table[1].goalsFor}</td>
            <td>${article.table[1].goalsAgainst}</td>
            <td>${article.table[1].goalDifference}</td>
            <td>${article.table[1].points}</td>
          </tr>
          <tr>
            <td>${article.table[2].position}</td>
            <td>
            <img src="${article.table[2].team.crestUrl}" width="50" height="50">
            </td>
            <td>${article.table[2].team.name}</td>
            <td>${article.table[2].playedGames}</td>
            <td>${article.table[2].won}</td>
            <td>${article.table[2].draw}</td>
            <td>${article.table[2].lost}</td>
            <td>${article.table[2].goalsFor}</td>
            <td>${article.table[2].goalsAgainst}</td>
            <td>${article.table[2].goalDifference}</td>
            <td>${article.table[2].points}</td>
          </tr>
          <tr>
          <td>${article.table[3].position}</td>
          <td>
          <img src="${article.table[3].team.crestUrl}" width="50" height="50">
          </td>
          <td>${article.table[3].team.name}</td>
          <td>${article.table[3].playedGames}</td>
          <td>${article.table[3].won}</td>
          <td>${article.table[3].draw}</td>
          <td>${article.table[3].lost}</td>
          <td>${article.table[3].goalsFor}</td>
          <td>${article.table[3].goalsAgainst}</td>
          <td>${article.table[3].goalDifference}</td>
          <td>${article.table[3].points}</td>
        </tr>
        </tbody>
   </table>  
            `;
      });
      // Sisipkan komponen card ke dalam elemen dengan id #content
      document.getElementById("articles").innerHTML = articlesHTML;
    })
    .catch(error);
}


