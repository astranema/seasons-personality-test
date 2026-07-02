import { Questions_manager } from "./questions_manager.js";

async function main() {
    // response from quiz app's ./json view
    // TODO: Make this address dynamic
    const response = await getUrlData("http://localhost:8000/json");
    // json containing question values. modifiable at <root>/core/quiz/questions.json
    const json = await response.json();
    const button_container = document.getElementById("button-container");
    const start_button = document.getElementById("begin-button");
    const question_text = document.getElementById("question-text");
    const qm = new Questions_manager(json);
    start_button.addEventListener('click', () => {
        start_button.remove();
        createNoButton(qm, button_container, question_text);
        createYesButton(qm, button_container, question_text);
        // modifies textContent to the first question
        question_text.textContent = qm.get_current_question().text
    });
}

/* creates the button labelled "Agree". Code is almost identical to createNoButton but its
not worth making a helper function
qm is a Questions_maanger, button_container is where the button will be placed, and
question_text is the text that changes when the button is pushed*/
function createYesButton(qm, button_container, question_text) {
    const yes_button = document.createElement('button');
    yes_button.className = 'answer-button';
    yes_button.textContent = 'Agree';
    yes_button.style.fontWeight = 'bold';
    yes_button.addEventListener('click', () => {
        answer_question(true, qm, question_text);
    });
    button_container.appendChild(yes_button);
}

function createNoButton(qm, button_container, question_text) {
    const no_button = document.createElement('button');
    no_button.className = 'answer-button';
    no_button.textContent = 'Disagree';
    no_button.style.fontWeight = 'bold';
    no_button.addEventListener('click', () => {
        answer_question(false, qm, question_text);
    });
    button_container.appendChild(no_button);
}

/* isAgree is a boolean representing if the user pressed 'Agree' (the Disagree button will
call this function with the value false. qm is the Questions_manager, question_text is the text
that is modified by this function)
This function modifies the scores in accordance with the current question and which button was
pressed, cycle to the next question, and redirect to the results page. */
function answer_question(isAgree, qm, question_text) {
    qm.modify_score(isAgree);
    qm.next_question();
    question_text.textContent = qm.get_current_question().text;
    if (qm.questions_answered >= 40) {
        window.location.href = `http://localhost:8000/results?p=${qm.get_spring()}&s=${qm.get_summer()}&a=${qm.get_autumn()}&w=${qm.get_winter()}`;
    }
}

async function getUrlData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        return response;
    }
    catch (error) {
        alert(error.message);
    }
}


main();
