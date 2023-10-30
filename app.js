const question1={
    numberOfQuestion: 1,
    textOfQuestion: "How many planets are in the solar system?",
    answers: [8,9,10,12],
    rightanswer: [8]
}
const question2={
    numberOfQuestion: 2,
    textOfQuestion: "What is the freezing point of water?",
    answers: [0,-5,-6,1],
    rightanswer: [0]
}
const question3={
    numberOfQuestion: 3,
    textOfQuestion: "What is the longest river in the world?",
    answers: ["Nile", "Amazon", "Yangtze"],
    rightanswer: ["Nile"]
    
}
const question4={
    numberOfQuestion: 4,
    textOfQuestion: "How many chromosomes are in the human genome?",
    answers: [42, 44, 46, 58, 72],
    rightanswer: [46]
}
const question5={
    numberOfQuestion: 5,
    textOfQuestion: "Which of these characters are friends with Harry Potter?",
    answers: ["Ron Weasley", "Draco Malfoy", "Hermione Granger"],
    rightanswer: ["Ron Weasley", "Hermione Granger"]
}
const question6={
    numberOfQuestion: 6,
    textOfQuestion: "What is the capital of Canada?",
    answers: ["Toronto", "Ottawa", "Vancouver"],
    rightanswer: ["Ottawa"]
}
const question7={
    numberOfQuestion: 7,
    textOfQuestion: "What is the Jewish New Year called?",
    answers: ["Hanukkah", "Yom Kippur", "Kwanzaa", "Rosh Hashanah"],
    rightanswer: ["Rosh Hashanah"]
}

let Questions = [question1 , question2 , question3 , question4 , question5 , question6 , question7]

let counter=0;

let answersChecked=false;

function FormCreate(Questions){
    let title = document.querySelector(".title");
    let titleText = document.createElement('h3');
    titleText.innerText = `Question ${Questions[counter].numberOfQuestion}/7`;
    title.appendChild(titleText);
    let question = document.querySelector(".question");
    let questionText = document.createElement('h3');
    questionText.innerText = Questions[counter].textOfQuestion;
    question.appendChild(questionText);
    for(let i=0; i<Questions[counter].answers.length; i++)
    {
        let buttons=document.querySelector(".buttons");
        let button=document.createElement('button');
        button.innerText=Questions[counter].answers[i];
        buttons.appendChild(button);
    }
    if(Questions[counter].rightanswer.length>1)
    {
        let moreInfo = document.querySelector(".moreInfo");
        let moreInfotext = document.createElement('h3');
        moreInfotext.innerText = "This question have more then one answer";
        moreInfo.appendChild(moreInfotext);
    }
}

function DeleteItems(){
    let deleteTitle = document.querySelector(".title")
    let deleteQuestion=document.querySelector(".question")
    let deleteButtons=document.querySelector(".buttons")
    let deleteMoreInfo=document.querySelector(".moreInfo")
    deleteTitle.innerHTML = '';
    deleteQuestion.innerHTML = '';
    deleteButtons.innerHTML = '';
    deleteMoreInfo.innerHTML = '';
}

function FinishWindow(){
    let title = document.querySelector(".title");
    let titleText = document.createElement('h3');
    titleText.innerText = "Congratulations, you have successfully passed the test.";
    title.appendChild(titleText);
    let moreInfo = document.querySelector(".moreInfo");
    let MoreInfoText = document.createElement('h3');
    MoreInfoText.innerText = "Number of correct answers:";
    moreInfo.appendChild(MoreInfoText);
    let againButton = document.querySelector(".againButton");
    let button = document.createElement('button');
    button.innerText = "Take the test again";
    againButton.appendChild(button);
}

function NextButtonCreate(){
    let nextButton = document.querySelector(".nextButton");
    let button = document.createElement('button');
    button.innerText = "Next";
    nextButton.appendChild(button);
}

onCreate();

function onCreate()
{
    FormCreate(Questions)
    NextButtonCreate()
    
    if(answersChecked==true)
    {
        let nextbttn=document.querySelector(".nextButton");
        nextbttn.querySelector("button").addEventListener('click',()=>{
            counter++;
            if(counter <= Questions.length-1)
            {
                DeleteItems();
                FormCreate(Questions);
            }
            else
            {
                let deleteNextButton=document.querySelector(".nextButton")
                deleteNextButton.innerHTML = '';
                DeleteItems();
                FinishWindow();  
                let againbttn=document.querySelector(".againButton");
                againbttn.querySelector("button").addEventListener('click',() =>{
                    
                    counter=0;
                    DeleteItems();
                    let deleteAgainButton=document.querySelector(".againButton")
                    deleteAgainButton.innerHTML = '';
                    onCreate();
            })
            }
        })
    }
}




