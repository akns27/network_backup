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
  getCityKakao(latitude, longitude); // 올바른 함수 이름으로 수정
}

// 지오코딩 API를 사용하여 도시 이름을 얻는 함수
function getCityKakao(latitude, longitude) {
  let geocodingAPI =
    "https://dapi.kakao.com/v2/local/geo/coord2address.json?x=" +
    longitude +
    "&y=" +
    latitude;
  let headers = {
    Authorization: "KakaoAK a32e4b600b4b34cb0413f2f68b542223",
  };

  fetch(geocodingAPI, { headers: headers })
    .then((response) => response.json())
    .then((data) => {
      var city = data.documents[0].address.region_1depth_name; // 도시 이름 추출
      updateCityName(city);
    })
    .catch((error) => console.log(error));
}

// HTML 요소의 내용을 업데이트하는 함수
function updateCityName(cityName) {
  document.getElementById("location").textContent = cityName;
}

// 오류 처리 함수
function showError(error) {
  // 오류 처리 로직
}

function updateDustLevelStatus() {
  var dustLevel = parseInt(document.getElementById("dustLevel").textContent);
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
  } else if (dustLevel >= 161) {
    dustLevelStatus.textContent = "매우 나쁨";
    dustLevelStatus.className = "very-poor";
  }
}

// 페이지 로드 시 먼지 농도 상태 업데이트
window.onload = function () {
  getLocation();
  updateDustLevelStatus();
};

/*
$(".popup-btn").click(function(){  <- html에서 popup-btn이라고 클래스로 지정된 값들이 클릭되었을때
  $(".popup-view").show(); <- popup-view클래스를 가지고 있는 요소들을 보여줌
});
$(".popup-btn").click(function(){
  $(".popup-view").hide(); <- popup-view 클래스를 가지고 있는 요소들을 가림
});
이 소스는 전체적으로 어떤 하나의 요소를 클릭했을 때 팝업이 뜨고 팝업이 가려지는 소스

let currentIndex = 0;
$(".slider").hide().first().show();

setInterval(function(){
  
  let nextIndex = (currentIndex + 1) % 3;

  $(".slider").eq(currentIndex).fadeOut(1200);
  $(".slider").eq(nextIndex).fadeIn(1200);

  currentIndex = nextIndex;
},3000);
-> 이 소스는 3000ms(3초) 마다 이미지 슬라이딩 하는거임
총 3장의 사진이 있다고 가정했을 때, 3초마다 한장씩 이미지가 부드럽게 사라졌다가 다음 사진이 부드럽게 보여졌다가
이런거임. 이런 것도 참고해봐도 괜찮을 것 같고...

선택된 요소에 대해서 특정 소스 작성할거면,
$(this).find(); -> find안에 있는 클래스명이나 아이디를 찾아서 소스를 이러쿵 저러쿵 사용하면 되고...

뭐 이런것들 참고해서 물어보면 됨
chatGPT에게 영어로 물어보면 더 자세하고 친절하게 알려줌
다음 페이지에 chatGPT한테 예시 코드같은 거 보여달라고 한 창 띄웠으니까 영어는 알아서 해석하시고...
첫번째 소스랑 전체적으로 비슷한 느낌일 것 같음.

이정도 참고 자료만 제공할 수 있을 듯 합니다...
*/