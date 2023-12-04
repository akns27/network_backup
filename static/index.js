let cardContainers = document.querySelectorAll(".card-container");
let today = new Date();

cardContainers.forEach((container) => {
  let card = container.querySelector(".card");
  let specialCard = container.querySelector(".special-card");

  card.addEventListener("mouseover", () => {
    specialCard.style.display = "block"; // special-card를 보이게 설정
    card.style.display = "none";
  });

  card.addEventListener("mouseout", () => {
    specialCard.style.display = "none"; // special-card를 숨김
    card.style.display = "block";
  });
});

let year = today.getFullYear();
let month = today.getMonth() + 1; // JavaScript에서 월은 0-11로 표현됨
let day = today.getDate();

let formattedMonth = month < 10 ? `0${month}` : month;
let formattedDay = day < 10 ? `0${day}` : day;

let dateString = `🗓️ ${year}.${formattedMonth}.${formattedDay}`;

document.getElementById("Topdiv").textContent = dateString;

// 사용자의 위치를 얻는 함수
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
}

// 위치 정보를 받았을 때 실행되는 함수
function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  getNeighborhoodKakao(latitude, longitude); // 올바른 함수 이름으로 수정
}

// 지오코딩 API를 사용하여 도시 이름을 얻는 함수
function getNeighborhoodKakao(latitude, longitude) {
  let geocodingAPI =
    "https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?x=" +
    longitude +
    "&y=" +
    latitude;
  let headers = {
    Authorization: "KakaoAK a32e4b600b4b34cb0413f2f68b542223",
  };

  fetch(geocodingAPI, { headers: headers })
    .then((response) => response.json())
    .then((data) => {
      var neighborhood = data.documents[0].region_3depth_name; // 동네 이름 추출
      updateNeighborhoodName(neighborhood);
    })
    .catch((error) => console.log(error));
}

// HTML 요소의 내용을 업데이트하는 함수
function updateNeighborhoodName(neighborhoodName) {
  document.getElementById("location").textContent = neighborhoodName;
}


// 오류 처리 함수
function showError(error) {
  console.log("Error in getting geolocation ", error);
  updateNeighborhoodName('봉림동'); // 위치 정보를 가져오는데 실패한 경우 '대저동'으로 설정
}

function updateDustLevelStatus() {
  var dustLevel = parseInt(document.getElementById("dustLevel").textContent.trim());
  var dustLevelStatus = document.getElementById("dustLevelStatus");

  if (dustLevel >= 10 && dustLevel <= 30) {
    dustLevelStatus.textContent = "좋음";
    dustLevelStatus.className = "good";
  } else if (dustLevel >= 31 && dustLevel <= 80) {
    dustLevelStatus.textContent = "보통";
    dustLevelStatus.className = "moderate";
  } else if (dustLevel >= 81 && dustLevel <= 150) {
    dustLevelStatus.textContent = "나쁨";
    dustLevelStatus.className = "poor";
  } else if (dustLevel > 150) {
    dustLevelStatus.textContent = "매우 나쁨";
    dustLevelStatus.className = "very-poor";
  } else {
    // 데이터가 없거나 읽을 수 없는 값인 경우
    dustLevelStatus.textContent = "데이터를 읽을 수 없음";
    dustLevelStatus.className = "unknown";
  }
}
//.
// 페이지가 로드되면 상태를 업데이트합니다.
window.addEventListener('DOMContentLoaded', (event) => {
  updateDustLevelStatus();
});

window.onload = function () {
  getLocation();
};
