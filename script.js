const questions = [
    {
        question: "Which of the following is used to comment a single line in Python?",
        answers:[
            {text:"//", correct: false},
            {text:"#", correct: true},
            {text:"/*/", correct: false},
            {text:"--", correct: false},

        ]
    },
    {
        question: "What will be the output of the following Python code?",
        code: `
        numbers = [1, 2, 3, 4, 5] 
        result = [num * 2 for num in numbers if num % 2 == 0] 
        print(result)
        `,
        answers:[
            {text:"[4,8]", correct: true},
            {text:"[2,4,6,8,10]", correct: false},
            {text:"[2,4,8]", correct: false},
            {text:"[1,4,9,16,25]", correct: false},

        ]
    },
    {
        question: "What does the HTML acronym HTML stand for?",
        answers:[
            {text:"HyperText Markup Language", correct: true},
            {text:"High-level Text Management Language", correct: false},
            {text:"HyperText and links Text Markup Language", correct: false},
            {text:"HyperTransfer Text Management Language", correct: false},

        ]

    },
    {
        question: "What will be the output of the following JavaScript code?",
        code: `console.log(2 + '2');`,
        answers:[
            {text:"4", correct: false},
            {text:"22", correct: true},
            {text:"2+'2", correct: false},
            {text:"222", correct: false},

        ]

    }
];

const questionElement = document.getElementById("question");
const answerBtns = document.getElementById("answer-buttons");
const nextBtn = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextBtn.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    if(currentQuestion.code){
        const codeElement = document.createElement("code");
        codeElement.innerHTML = currentQuestion.code;
        questionElement.appendChild(codeElement);
    
    }


    
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerBtns.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;

        }
        button.addEventListener("click", selectAnswer);
    });

}

function resetState(){
    nextBtn.style.display = "none";
    while(answerBtns.firstChild){
        answerBtns.removeChild(answerBtns.firstChild);
    }

}
function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct == "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerBtns.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextBtn.style.display = "block";

}
function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextBtn.innerHTML = "Play Again";
    nextBtn.style.display = "block";
}
function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}
nextBtn.addEventListener("click",() =>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        //restart quiz
        startQuiz();
    }
});


startQuiz();
