//selecting all required elements
const quiz_box = document.querySelector("#quiz_box");
const result_box = document.querySelector("#result_box");
const process_ques = document.querySelector("#process-ques");
const question = document.querySelector("#que_text");
const option_list = document.querySelector("#option_list");
const btnNextQues = document.querySelector("#btn_next");
const btnRestart = document.querySelector("#btn_restart");
const bottom_number_que = document.querySelector("#number_ques");


let userScore = 0; // Điểm hiện tại
let questionAttemped = 0; // Số câu hiện tại
let currentPos  = 0; // index


// creating the new div tags which for icons
const correctIcon = '<div class="text-2xl absolute right-3"><i class="uil uil-check-circle"></i></div>';
const incorrectIcon = '<div class="text-2xl absolute right-3"><i class="uil uil-times-circle"></i></div>';

shuffle(questions);
renderQA(currentPos);
updateNumberQues(currentPos);

function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
}

function renderQA(index) {
    const listNumber = [0, 1, 2, 3]; // chuỗi để trộn option ngẫu nhiên
    shuffle(listNumber);
    question.innerHTML = "";
    option_list.innerHTML = "";
    const templateQuestion = `<h1 class="text-lg">${questions[index].question }</h1>`;
    const templateAnswers = `   <div class="options" id="opt1">
                                    <p>${questions[index].options[listNumber[0]]}</p>
                                </div>
                                <div class="options" id="opt2">
                                    <p>${questions[index].options[listNumber[1]]}</p>
                                </div>
                                <div class="options" id="opt3">
                                    <p>${questions[index].options[listNumber[2]]}</p>
                                </div>
                                <div class="options" id="opt4">
                                    <p>${questions[index].options[listNumber[3]]}</p>
                                </div>`

    question.insertAdjacentHTML("beforeend", templateQuestion);
    option_list.insertAdjacentHTML("beforeend", templateAnswers);

    // Sau khi render ra option, add event cho các option đó
    const options = option_list.querySelectorAll(".options");
    [...options].forEach(item => item.addEventListener("click", (e) => {
        const userAns = e.target.textContent.trim();
        const correcAns = questions[currentPos].answer;
        

        // Kiểm tra đúng sai
        if(userAns == correcAns){
            console.log("correct");
            userScore++;
            e.currentTarget.classList.add("correct");
            e.currentTarget.insertAdjacentHTML("beforeend", correctIcon);
            console.log("Correct Answer");
            console.log("Your correct answers = " + userScore);
    
        }
        else {
            console.log("incorrect");
            e.currentTarget.classList.add("incorrect");
            e.currentTarget.insertAdjacentHTML("beforeend", incorrectIcon);

            // Lặp qua các option và active option đúng
            [...options].forEach(item => {
                if (item.firstElementChild.textContent == correcAns) {
                    item.classList.add("correct");
                    item.insertAdjacentHTML("beforeend", correctIcon);
                    console.log("Auto selected correct answer.");
                }
            })
        }

        // Lặp qua các option còn lại và disable
        [...options].forEach(item => item.classList.add("pointer-events-none"));

        // Hiển thị nút next
        btnNextQues.classList.remove("hidden");
    }));
}

function updateNumberQues(questionAttemped){
    let template = `<p>${questionAttemped} of 5 questions</p>`
    bottom_number_que.innerHTML = template;

    process_ques.setAttribute("value", questionAttemped);
}

btnNextQues.addEventListener("click", (e) => {
    if (questionAttemped < 5) {
        questionAttemped++;
        currentPos++;
        renderQA(currentPos);
        updateNumberQues(questionAttemped);
        // Ấn nút next
        btnNextQues.classList.add("hidden");
    }
    else {
        showResult();
        return;
    }

});

function showResult() {
    quiz_box.classList.add("hidden"); // Ẩn quiz box
    result_box.classList.remove("hidden"); // Hiện result box
    const score = document.querySelector("#score");
    const template = `Your core is: <span class="text-2xl text-blue-600 font-bold">${userScore}/5</span>`
    score.innerHTML = template;
}

btnRestart.addEventListener("click", (e) => {
    userScore = 0;
    questionAttemped = 0;
    currentPos = 0;

    shuffle(questions);
    renderQA(currentPos);
    updateNumberQues(currentPos);

    quiz_box.classList.remove("hidden"); // Hiện quiz box
    result_box.classList.add("hidden"); // Ẩn result box
});