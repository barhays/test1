document.getElementById("Planets").addEventListener('click',()=>{
    localStorage.setItem("current_topic", 0)
    QuizPage();
})
document.getElementById("Sport").addEventListener('click',()=>{
    localStorage.setItem("current_topic", 1)
    QuizPage();
})

function QuizPage(){
    window.location.href='index.html';
    localStorage.setItem('counter', 0);
    localStorage.setItem('rightanswercount', 0)  
}
