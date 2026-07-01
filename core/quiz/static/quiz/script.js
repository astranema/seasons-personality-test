import { Questions_manager } from "./questions_manager.js";

async function main() {
    // reallllyyy bruteforce way of doing this, once django is integrated we should probably feed it to the frontend from the server
    const response = await fetch("http://localhost:8000/json");
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

function answer_question(isAgree, qm, question_text) {
    qm.modify_score(isAgree);
    qm.next_question();
    question_text.textContent = qm.get_current_question().text;
    if (qm.questions_answered >= 40) {
        alert(qm.scores[0]);
        alert(qm.scores[1]);
        alert(qm.scores[2]);
        alert(qm.scores[3]);
    }
}


main();
