//INITIAL DATA
let currentQuestion = 0;
let correctAswers = 0;

showQuestion();

//EVENTOS
document.querySelector('.scoreArea button').addEventListener('click', resetEvent);


//FUNCTIONS
function showQuestion() {
    if(questions[currentQuestion]) {
        let q = questions[currentQuestion];

        let pct = Math.floor((currentQuestion / questions.length) * 100);
        document.querySelector('.progress--bar').style.width = `${pct}%`;

        document.querySelector('.scoreArea').style.display = 'none';
        document.querySelector('.questionArea').style.display = 'block';

        document.querySelector('.question').innerHTML = q.question;

        let optionsHtml = '';
        for(let i in q.options) {
            optionsHtml += `<div data-op="${i}" class="option"><span>${parseInt(i)+1}</span>${q.options[i]}</div>`;
        }
        document.querySelector('.options').innerHTML = optionsHtml;

        document.querySelectorAll('.options .option').forEach(item => {
            addEventListener('click', OptionClickEvent);
        });
        
    }else{
        finishQuiz();
    }
}

function OptionClickEvent(e) {
    let clickedOption = parseInt(e.target.getAttribute('data-op'));
    
    if(questions[currentQuestion].answer === clickedOption) {
        correctAswers++;
    } 

    currentQuestion++;
    showQuestion();
}

function finishQuiz() {
    let points = Math.floor((correctAswers / questions.length) * 100);

    if(points < 30) {
        document.querySelector('.scoreText1').innerHTML = 'Tá ruim hein?!'
        document.querySelector('.scorePct').style.color = 'red'
    }else if (points >= 30 && points < 70) {
        document.querySelector('.scoreText1').innerHTML = 'Muito bom!'
        document.querySelector('.scorePct').style.color = '#ffff00'


    }else if (points >= 70) {
        document.querySelector('.scoreText1').innerHTML = 'PARABENS!'
        document.querySelector('.scorePct').style.color = '#0D630d'


    }

    document.querySelector('.scorePct').innerHTML = `Acertou ${points}%`;
    document.querySelector('.scoreText2').innerHTML = `Voce respondeu ${questions.length} questões e acertou ${correctAswers}`


    document.querySelector('.scoreArea').style.display = 'block';
    document.querySelector('.questionArea').style.display = 'none';
    document.querySelector('.progress--bar').style.width = `100%`;

}

function resetEvent() {
    correctAswers = 0;
    currentQuestion = 0;
    showQuestion();
}