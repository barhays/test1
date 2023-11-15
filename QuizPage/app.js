
import { themes } from "../topics.js";
const questions = themes[localStorage.getItem('current_topic')];
const wronganswercolor ="red";
const correctanswercolor = "green";
let answerschecked = false;
let counter = localStorage.getItem('counter')
const title = document.querySelector(".title");
const question = document.querySelector(".question");
const buttons = document.querySelector(".buttons");
const moreInfo = document.querySelector(".moreInfo");
const nextButton = document.querySelector(".nextButton");
const againButton = document.querySelector(".againButton");

function FormCreate(questions) {

    let titleText = document.createElement('h3');
    titleText.innerText = `Question ${questions[localStorage.getItem('counter')].numberOfQuestion}/${questions.length}`;
    title.appendChild(titleText);

    let questionText = document.createElement('h3');
    questionText.innerText = questions[localStorage.getItem('counter')].textOfQuestion;
    question.appendChild(questionText);

    for(let i = 0; i < questions[localStorage.getItem('counter')].answers.length; i++) {
        let button = document.createElement('button');
        button.innerText = questions[localStorage.getItem('counter')].answers[i];
        buttons.appendChild(button);
    }

    if(questions[localStorage.getItem('counter')].rightanswer.length>1) {
        let moreInfotext = document.createElement('h3');
        moreInfotext.innerText = "This question have more then one answer";
        moreInfo.appendChild(moreInfotext);
    };

    let button = document.createElement('button');
    button.innerText = "Next";
    nextButton.appendChild(button);
}

function DeleteItems() {
    let selectTopicButton = document.querySelector(".selectTopicButton")
    selectTopicButton.innerHTML = '';
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
    MoreInfoText.innerText = "Number of correct answers:"+ localStorage.getItem('rightanswercount');
    moreInfo.appendChild(MoreInfoText);

    let button = document.createElement('button');
    button.innerText = "Take the test again";
    againButton.appendChild(button);

    let selectTopicButton = document.querySelector(".selectTopicButton")
    let selectbutton = document.createElement('button');
    selectbutton.innerText = "Go back to select topic";
    selectTopicButton.appendChild(selectbutton);
}

function AgainButtonClick() {
    againButton.querySelector("button").addEventListener('click',() => {
        counter = 0;
        answerschecked = false;
        localStorage.setItem('counter', 0);
        localStorage.setItem('rightanswercount', 0);
        DeleteItems();
        onCreate();
    })
}
function SelectTopic(){
    document.querySelector(".selectTopicButton").querySelector("button").addEventListener('click',() => {
        localStorage.removeItem("current_topic")
        window.location.href='homePage.html';
    })
}
function AnswersButtonClick() {
    let answers = new Set();
    let rightanswercount = localStorage.getItem('rightanswercount')
    buttons.querySelectorAll("button").forEach(elem => {
    elem.addEventListener('click', (e)=> {
            if(answerschecked == false) {

                if(questions[localStorage.getItem('counter')].rightanswer.length == 1) {

                    if(questions[localStorage.getItem('counter')].rightanswer[0] == e.target.innerText) {

                        e.target.style.backgroundColor = correctanswercolor;
                        answerschecked = true;
                        rightanswercount++;
                        localStorage.setItem('rightanswercount', rightanswercount)
                    }else {

                        e.target.style.backgroundColor = wronganswercolor;
                        answerschecked = true;
                    }
                }else {

                    if(answers.size !== questions[localStorage.getItem('counter')].rightanswer.length) {

                        answers.add(e.target.innerText);

                        if(questions[localStorage.getItem('counter')].rightanswer.includes(e.target.innerText)) {

                            e.target.style.backgroundColor = correctanswercolor;
                            rightanswercount = +rightanswercount + 1/questions[localStorage.getItem('counter')].rightanswer.length;
                            console.log(rightanswercount)
                            console.log( 1/questions[localStorage.getItem('counter')].rightanswer.length)
                        }else {

                            e.target.style.backgroundColor = wronganswercolor;

                        } 
                        if(answers.size == questions[localStorage.getItem('counter')].rightanswer.length) {
                            localStorage.setItem('rightanswercount', Math.round(rightanswercount))
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
                localStorage.setItem('counter', counter)
                answerschecked = false;
                DeleteItems();

                if(counter === questions.length) {

                    DeleteItems();
                    FinishWindow();  
                    AgainButtonClick();
                    SelectTopic();

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