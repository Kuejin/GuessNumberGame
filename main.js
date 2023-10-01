// 랜덤번호 지정
// 유저가 번호를 입력한다. 그리고 go라는 버튼을 누름
// 유저가 랜덤번호를 맞추면, 맞췄습니다!
// 랜덤번호 < 유저번호 Down!
// 랜덤번호 > 유저번호 Up!
// Reset 버튼을 누르면 게임리 리셋된다.
// 5번의 기회를 다쓰면 게임이 끝난다. (더이상 추측 불가, 버튼이 disable)
// 유저가 1~100 범위 밖의 숫자를 입력하면 알려준다. 기회를 깎지 않는다.
// 유저가 이미 입력한 숫자를 또 입력하면 알려준다. 기회를 깎지 않는다.
// ------------------------------1. 랜덤한 숫자 생성------------------------------
let computerNumber = 0;
function pickRandomNumber(){
	computerNumber = Math.floor(Math.random()*100+1); // 1~100 까지의 숫자를 만들어줌
	console.log("정답", computerNumber);
}

// ------------------------------2. 필요한 id 값들을 불러와서 변수로 지정------------------------------
let playButton = document.getElementById("play-button");
let userInput = document.getElementById("user-input");
let resultArea = document.getElementById("result-area");
let resetButton = document.getElementById("reset-button");
let chances = 5;
let gameOver = false;
let chanceArea = document.getElementById("chance-area");
let history=[];

// ------------------------------3. 불러온 변수들에 이벤트 속성을 부여------------------------------
playButton.addEventListener("click",play);
resetButton.addEventListener("click",reset);
userInput.addEventListener("focus",function(){userInput.value='';})

// ------------------------------4. 이벤트 속성에 동작할 내용을 함수로 지정------------------------------
function play(){
	let userValue = userInput.value;
	if(userValue<1 || userValue>100){
		resultArea.textContent = "1~100 숫자를 입력하세요"
		return;
	}
	if(history.includes(userValue)){
		resultArea.textContent = "이미 쓴겨~~ 딴 거 써!"
		return;
	}
	chances--;
	chanceArea.textContent = `남은기회: ${chances}`
	if(userValue<computerNumber){
		resultArea.textContent = "Up!" // resultArea 부분의 텍스트를 up!으로 바꾸자
	}else if(userValue>computerNumber){
		resultArea.textContent = "Down!"
	}else{
		resultArea.textContent = "Good!"
		gameOver=true;
	}
	history.push(userValue);
	console.log(history);
	if(chances===0){
		gameOver=true;
	}
	if(gameOver===true){
		playButton.disabled = true;
	}
}
function reset(){
	// user input 창이 정리되고
	userInput.value = "";
	// 새로운 번호가 생성된다.
	pickRandomNumber();
	resultArea.textContent = "결과가 이곳에 나옵니다"
}

// ------------------------------5. 함수 실행------------------------------
pickRandomNumber();