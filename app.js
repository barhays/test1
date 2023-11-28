
import { themes } from "./constants/themes.js";
const questions = themes[localStorage.getItem('current_topic')];
const wronganswercolor = "red";
const correctanswercolor = "green";
let answerschecked = false;
let counter = localStorage.getItem('counter')
const title = document.querySelector(".title");
const question = document.querySelector(".question");
const buttons = document.querySelector(".buttons");
const moreInfo = document.querySelector(".moreInfo");
const nextButton = document.querySelector(".nextButton");
const againButton = document.querySelector(".againButton");
let time;
const openPopupButton = document.getElementById('openPopupButton');
const popupMenu = document.getElementById('popupMenu');
const lightThemeButton = document.getElementById('lightThemeButton');
const darkThemeButton = document.getElementById('darkThemeButton');
const progressBar = document.querySelector(".progressbar")


function setTheme(theme) {
    let body = document.body;

    if (theme === 'dark') {
        body.classList.add('dark-theme');
    } else {
        body.classList.remove('dark-theme');
    }
}
function onFormCreate(questions) {
    document.getElementById('sec').innerText = localStorage.getItem("timercount")
    let interval = setInterval(() => {
        time = document.getElementById('sec').innerText
        if (time != 0) {
            document.getElementById('sec').innerText--
            localStorage.setItem("timercount", document.getElementById('sec').innerText)
        }
        else {
            clearInterval(interval);
            if (counter < questions.length) {
                counter++;
                localStorage.setItem('counter', counter)
                answerschecked = false;
                localStorage.setItem("timercount", 10)
                onDeleteItems();

                if (counter === questions.length) {

                    onDeleteItems();
                    onFinishWindow();
                    handleAgainButtonClick();
                    handlerSelectTopicButtonClick();

                } else {

                    onCreate();

                }
            }
        }
    }, 1000)
    let titleText = document.createElement('h3');
    titleText.innerText = `Question ${questions[localStorage.getItem('counter')].numberOfQuestion}/${questions.length}`;
    title.appendChild(titleText);

    let questionText = document.createElement('h3');
    questionText.innerText = questions[localStorage.getItem('counter')].textOfQuestion;
    question.appendChild(questionText);

    for (let i = 0; i < questions[localStorage.getItem('counter')].answers.length; i++) {
        let button = document.createElement('button');
        button.innerText = questions[localStorage.getItem('counter')].answers[i];
        buttons.appendChild(button);
    }

    if (questions[localStorage.getItem('counter')].rightanswer.length > 1) {
        let moreInfotext = document.createElement('h3');
        moreInfotext.innerText = "This question have more then one answer";
        moreInfo.appendChild(moreInfotext);
    };

    let button = document.createElement('button');
    button.innerText = "Next";
    button.addEventListener('click', () => {
        clearInterval(interval);
    });
    nextButton.appendChild(button);

    let button2 = document.createElement('button');
    button2.innerText = "Right Answer";
    document.querySelector('.AnswersButton').appendChild(button2);
}


function onDeleteItems() {
    let selectTopicButton = document.querySelector(".selectTopicButton")
    let answerbut = document.querySelector('.AnswersButton')
    answerbut.innerHTML = '';
    document.getElementById('sec').innerHTML = '';
    selectTopicButton.innerHTML = '';
    againButton.innerHTML = '';
    nextButton.innerHTML = '';
    title.innerHTML = '';
    question.innerHTML = '';
    buttons.innerHTML = '';
    moreInfo.innerHTML = '';
    progressBar.innerHTML = '';
}

function onFinishWindow() {
    let titleText = document.createElement('h3');
    titleText.innerText = "Congratulations, you have successfully passed the test.";
    title.appendChild(titleText);

    let MoreInfoText = document.createElement('h3');
    MoreInfoText.innerText = "Number of correct answers:" + localStorage.getItem('rightanswercount');
    moreInfo.appendChild(MoreInfoText);

    let button = document.createElement('button');
    button.innerText = "Take the test again";
    againButton.appendChild(button);

    let selectTopicButton = document.querySelector(".selectTopicButton")
    let selectbutton = document.createElement('button');
    selectbutton.innerText = "Go back to select topic";
    selectTopicButton.appendChild(selectbutton);
    localStorage.setItem('counter', 0);
}

function handleAgainButtonClick() {
    againButton.querySelector("button").addEventListener('click', () => {
        counter = 0;
        answerschecked = false;
        localStorage.setItem('counter', 0);
        localStorage.setItem('rightanswercount', 0);
        onDeleteItems();
        onCreate();
    })
}
function handlerSelectTopicButtonClick() {
    document.querySelector(".selectTopicButton").querySelector("button").addEventListener('click', () => {
        localStorage.removeItem("current_topic")
        window.location.href = 'homePage.html';
    })
}
function handleAnswersButtonClick() {
    let answers = new Set();
    let rightanswercount = localStorage.getItem('rightanswercount')
    buttons.querySelectorAll("button").forEach(elem => {
        elem.addEventListener('click', (e) => {
            if (answerschecked == false) {

                if (questions[localStorage.getItem('counter')].rightanswer.length == 1) {

                    if (questions[localStorage.getItem('counter')].rightanswer[0] == e.target.innerText) {

                        e.target.style.backgroundColor = correctanswercolor;
                        answerschecked = true;
                        rightanswercount++;
                        localStorage.setItem('rightanswercount', rightanswercount)
                    } else {

                        e.target.style.backgroundColor = wronganswercolor;
                        answerschecked = true;
                    }
                } else {

                    if (answers.size !== questions[localStorage.getItem('counter')].rightanswer.length) {

                        answers.add(e.target.innerText);

                        if (questions[localStorage.getItem('counter')].rightanswer.includes(e.target.innerText)) {

                            e.target.style.backgroundColor = correctanswercolor;
                            rightanswercount = +rightanswercount + 1 / questions[localStorage.getItem('counter')].rightanswer.length;
                        } else {

                            e.target.style.backgroundColor = wronganswercolor;

                        }
                        if (answers.size == questions[localStorage.getItem('counter')].rightanswer.length) {
                            localStorage.setItem('rightanswercount', Math.round(rightanswercount))
                            answerschecked = true;

                        }
                    }
                }
            }
        })

    });
}
function handleNextButtonClick() {
    nextButton.querySelector("button").addEventListener('click', () => {

        if (counter < questions.length) {

            if (answerschecked) {

                counter++;
                localStorage.setItem('counter', counter)
                answerschecked = false;
                localStorage.setItem("timercount", 10)
                onDeleteItems();

                if (counter === questions.length) {

                    onDeleteItems();
                    onFinishWindow();
                    handleAgainButtonClick();
                    handlerSelectTopicButtonClick();

                } else {

                    onCreate();

                }
            }
        }
    })
}
function handleChangeTheme() {
    openPopupButton.addEventListener('click', function () {
        popupMenu.style.display = 'block';
    });

    lightThemeButton.addEventListener('click', function () {
        localStorage.setItem('themecolor', 'light')
        setTheme('light');
        popupMenu.style.display = 'none';
    });

    darkThemeButton.addEventListener('click', function () {
        localStorage.setItem('themecolor', 'dark')
        setTheme('dark');
        popupMenu.style.display = 'none';
    });
}
if (localStorage.getItem('themecolor') === 'dark') {
    setTheme('dark')
}
else {
    setTheme('light')
}
function progressBarCreate() {
    let progressbutt = document.createElement('progress');
    progressBar.appendChild(progressbutt);
    progressbutt.setAttribute("max", questions.length)
    progressbutt.setAttribute("value", counter)
}
function handleRightAnswer() {
    document.querySelector('.AnswersButton').querySelector("button").addEventListener('click', () => {
        buttons.querySelectorAll("button").forEach(elem => {
            if (answerschecked) {
                if (questions[localStorage.getItem('counter')].rightanswer[0] == elem.innerText) {

                    elem.style.backgroundColor = correctanswercolor;
                }
            }
        })
    })
}
handleChangeTheme();
onCreate();
function onCreate() {
    onFormCreate(questions);
    handleRightAnswer();
    handleAnswersButtonClick();
    handleNextButtonClick();
    progressBarCreate();
}