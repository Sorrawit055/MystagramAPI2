const info = (res) => {
  const profile = document.querySelector(".profile");
  let html = "";
  html += `
  <!-- Sidebar/menu -->

<nav class="w3-sidebar w3-collapse w3-white w3-animate-left" style="z-index:3;width:300px;" id="mySidebar"><br>
  <div class="w3-container">
    <a href="#" onclick="w3_close()" class="w3-hide-large w3-right w3-jumbo w3-padding w3-hover-grey" title="close menu">
      <i class="fa fa-remove"></i>
    </a>
    <h1>PROFILE</h1>
    <img src="${res.profile_image.large}" style="width:45%;" class="w3-round"><br><br>
    <h3><b>${res.username}</b></h3>
  </div>

  <div class="w3-bar-block">
    <a href="#portfolio" onclick="w3_close()" class="w3-bar-item w3-button w3-padding w3-text-teal"><i class="fa fa-th-large fa-fw w3-margin-right"></i>Followers: ${res.followers_count}</i></a> 
    <a href="#about" onclick="w3_close()" class="w3-bar-item w3-button w3-padding"><i class="fa fa-user fa-fw w3-margin-right"></i>Like ${res.total_likes}</a> 
    <a href="#contact" onclick="w3_close()" class="w3-bar-item w3-button w3-padding"><i class="fa fa-envelope fa-fw w3-margin-right"></i>Location : ${res.location}</a>
  </div>
  <div class="w3-panel w3-large">
    <i class="fa fa-facebook-official w3-hover-opacity"></i>
    <i class="fa fa-instagram w3-hover-opacity"></i>
    <i class="fa fa-snapchat w3-hover-opacity"></i>
    <i class="fa fa-pinterest-p w3-hover-opacity"></i>
    <i class="fa fa-twitter w3-hover-opacity"></i>
    <i class="fa fa-linkedin w3-hover-opacity"></i>
  </div>
</nav>

<!-- Overlay effect when opening sidebar on small screens -->
<div class="w3-overlay w3-hide-large w3-animate-opacity" onclick="w3_close()" style="cursor:pointer" title="close side menu" id="myOverlay"></div>

<!-- !PAGE CONTENT! -->
<div class="w3-main" style="margin-left:300px">

  <!-- Header -->
  <header id="portfolio">
    <a href="#"><img src="/w3images/avatar_g2.jpg" style="width:65px;" class="w3-circle w3-right w3-margin w3-hide-large w3-hover-opacity"></a>
    <span class="w3-button w3-hide-large w3-xxlarge w3-hover-text-grey" onclick="w3_open()"><i class="fa fa-bars"></i></span>
    <div class="w3-container">
    <h1><b>My Photo</b></h1>
    <h5>${res.bio}</h5>
    <div class="w3-section w3-bottombar w3-padding-16">
      <button class="w3-button w3-white"><i class="fa fa-diamond w3-margin-right"></i>Like : ${res.total_likes} </button>
      <button class="w3-button w3-white w3-hide-small"><i class="fa fa-photo w3-margin-right"></i>Photos :  ${res.total_photos}</button>
      <button class="w3-button w3-white w3-hide-small"><i class="fa fa-map-pin w3-margin-right"></i>Collections : ${res.total_collections}</button>
    </div>
    </div>
  </header>
  
  
    </div>
  </div>
    `
  profile.innerHTML = html;
};
const photo = (res) => {
  const gallery = document.querySelector(".gallery");
  let html = "";
  res.forEach((element) => {
    html += `
    <!-- First Photo Grid-->
    <div class="w3-row-padding">
      <div class="w3-third w3-container w3-margin-bottom">
        <img src="" alt="Norway" style="width:100%" class="w3-hover-opacity">
     
      </div>
      <div class="w3-third w3-container w3-margin-bottom">
      <img src = "${element.urls.small}"class = "gallery-image"alt = "" >    
          <div class="w3-container w3-white">
          <p><b>TEST</b></p>
          <p>TEST</p>
        </div>
      </div>
  
    `;
 });
  gallery.innerHTML = html;
};

const callAPI = async (username) => {
  try {
    console.log("username --> ", username);
    const response = await fetch("/api/searchUser", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username }),
    });
    const res = await response.json();
    //check response return from our API
    console.log("response ----> ", res);
    info(res);
  } catch (error) {
    console.log("message error --->", error);
    //Do Something
  }
};
const callphoto = async (username) => {
  try {
    console.log("username --> ", username);
    const response = await fetch("/api/photo", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username
      })
    });
    const res = await response.json();
    //check response return from our API
    console.log("response ----> ", res);
    photo(res);
  } catch (error) {
    console.log("message error --->", error);
    //Do Something
  }
};


const main = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  console.log(queryString);
  const username = urlParams.get('username');
  if (urlParams.has('username')) {
    console.log(callAPI);
    callAPI(username);
    callphoto(username);
  } else {
    console.log("no username")
  }

};

main();
