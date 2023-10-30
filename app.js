const question1={
    numberOfQuestion: 1,
    textOfQuestion: "How many planets are in the solar system?",
    answers: [8,9,10,12],
}
const question2={
    numberOfQuestion: 2,
    textOfQuestion: "What is the freezing point of water?",
    answers: [0,-5,-6,1]
}
const question3={
    numberOfQuestion: 3,
    textOfQuestion: "What is the longest river in the world?",
    answers: ["Nile", "Amazon", "Yangtze"]
}
const question4={
    numberOfQuestion: 4,
    textOfQuestion: "How many chromosomes are in the human genome?",
    answers: [42, 44, 46]
}
const question5={
    numberOfQuestion: 5,
    textOfQuestion: "Which of these characters are friends with Harry Potter?",
    answers: ["Ron Weasley", "Draco Malfoy", "Hermione Granger"]
}
const question6={
    numberOfQuestion: 6,
    textOfQuestion: "What is the capital of Canada?",
    answers: ["Toronto", "Ottawa", "Vancouver"]
}
const question7={
    numberOfQuestion: 7,
    textOfQuestion: "What is the Jewish New Year called?",
    answers: ["Hanukkah", "Yom Kippur", "Kwanzaa"]
}
let Questions=[question1 , question2 , question3 , question4 , question5 , question6 , question7]
let counter=0;
function FormCreate(Questions){
    let elem = document.querySelector(".title");
    let text = document.createElement('h3');
    text.innerText = `Question ${Questions[counter].numberOfQuestion}/7`;
    elem.appendChild(text);
    let elem2 = document.querySelector(".question");
    let text2 = document.createElement('h3');
    text2.innerText = Questions[counter].textOfQuestion;
    elem2.appendChild(text2);
    for(let i=0; i<Questions[counter].answers.length; i++)
    {
        let elem3=document.querySelector(".buttons");
        let text3=document.createElement('button');
        text3.innerText=Questions[counter].answers[i];
        elem3.appendChild(text3);
    }
    

}
FormCreate(Questions)