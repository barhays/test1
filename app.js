const question1 = {
    numberOfQuestion: 1,
    textOfQuestion: "How many planets are in the solar system?",
    answers: [8,9,10,12],
    rightanswer: [8]
}
const question2 = {
    numberOfQuestion: 2,
    textOfQuestion: "What is the freezing point of water?",
    answers: [0,-5,-6,1],
    rightanswer: [0]
}
const question3 = {
    numberOfQuestion: 3,
    textOfQuestion: "What is the longest river in the world?",
    answers: ["Nile", "Amazon", "Yangtze"],
    rightanswer: ["Nile"]
    
}
const question4 = {
    numberOfQuestion: 4,
    textOfQuestion: "How many chromosomes are in the human genome?",
    answers: [42, 44, 46, 58, 72],
    rightanswer: [46]
}
const question5 = {
    numberOfQuestion: 5,
    textOfQuestion: "Which of these characters are friends with Harry Potter?",
    answers: ["Ron Weasley", "Draco Malfoy", "Hermione Granger"],
    rightanswer: ["Ron Weasley", "Hermione Granger"]
}
const question6 = {
    numberOfQuestion: 6,
    textOfQuestion: "What is the capital of Canada?",
    answers: ["Toronto", "Ottawa", "Vancouver"],
    rightanswer: ["Ottawa"]
}
const question7 = {
    numberOfQuestion: 7,
    textOfQuestion: "What is the Jewish New Year called?",
    answers: ["Hanukkah", "Yom Kippur", "Kwanzaa", "Rosh Hashanah"],
    rightanswer: ["Rosh Hashanah"]
}

const questions = [question1 , question2 , question3 , question4 , question5 , question6 , question7]
const wronganswercolor ="red";
const correctanswercolor = "green";
let counter = 0;
let answerschecked = false;
let rightanswercount = 0;
const title = document.querySelector(".title");
const question = document.querySelector(".question");
const buttons = document.querySelector(".buttons");
const moreInfo = document.querySelector(".moreInfo");
const nextButton = document.querySelector(".nextButton");
const againButton = document.querySelector(".againButton");

function FormCreate(questions) {

    let titleText = document.createElement('h3');
    titleText.innerText = `Question ${questions[counter].numberOfQuestion}/${questions.length}`;
    title.appendChild(titleText);

    let questionText = document.createElement('h3');
    questionText.innerText = questions[counter].textOfQuestion;
    question.appendChild(questionText);

    for(let i = 0; i < questions[counter].answers.length; i++) {
        let button = document.createElement('button');
        button.innerText = questions[counter].answers[i];
        buttons.appendChild(button);
    }

    if(questions[counter].rightanswer.length>1) {
        let moreInfotext = document.createElement('h3');
        moreInfotext.innerText = "This question have more then one answer";
        moreInfo.appendChild(moreInfotext);
    };

    let button = document.createElement('button');
    button.innerText = "Next";
    nextButton.appendChild(button);
}

function DeleteItems() {
    againButton.innerHTML = '';
    nextButton.innerHTML = '';
    title.innerHTML = '';
    question.innerHTML = '';
    buttons.innerHTML = '';
    moreInfo.innerHTML = '';
}

function FinishWindow() {
    let titleText = document.createElement('h3');
    titleText.innerText = "Congratulations, you have successfully passed the test.";
    title.appendChild(titleText);

    let MoreInfoText = document.createElement('h3');
    MoreInfoText.innerText = "Number of correct answers:"+ Math.round(rightanswercount);
    moreInfo.appendChild(MoreInfoText);

    let button = document.createElement('button');
    button.innerText = "Take the test again";
    againButton.appendChild(button);
}

function AgainButtonClick() {
    againButton.querySelector("button").addEventListener('click',() => {
        counter = 0;
        answerschecked = false;
        rightanswercount=0;
        DeleteItems();
        onCreate();
    })
}
function AnswersButtonClick() {
    let answers = new Set();
    buttons.querySelectorAll("button").forEach(elem => {
    elem.addEventListener('click', (e)=> {
            if(answerschecked == false) {

                if(questions[counter].rightanswer.length == 1) {

                    if(questions[counter].rightanswer[0] == e.target.innerText) {

                        e.target.style.backgroundColor = correctanswercolor;
                        answerschecked = true;
                        rightanswercount += 1/questions[counter].rightanswer.length

                    }else {

                        e.target.style.backgroundColor = wronganswercolor;
                        answerschecked = true;
                    }
                }else {

                    if(answers.size !== questions[counter].rightanswer.length) {

                        answers.add(e.target.innerText);

                        if(questions[counter].rightanswer.includes(e.target.innerText)) {

                            e.target.style.backgroundColor = correctanswercolor;
                            rightanswercount += 1/questions[counter].rightanswer.length;

                        }else {

                            e.target.style.backgroundColor = wronganswercolor;

                        } 
                        if(answers.size == questions[counter].rightanswer.length) {

                            answerschecked=true;

                        }
                    }
                }
            }  
        })
        
    }); 
}
function NextButtonClick() {
    nextButton.querySelector("button").addEventListener('click',()=> {

        if(counter < questions.length) {

            if(answerschecked) {

                counter++;
                answerschecked = false;
                DeleteItems();

                if(counter === questions.length) {

                    DeleteItems();
                    FinishWindow();  
                    AgainButtonClick();

                }else {

                    onCreate();
                    
                }
            }
        }
    })  
}
onCreate();
function onCreate() {
    FormCreate(questions)
    AnswersButtonClick();
    NextButtonClick();
}