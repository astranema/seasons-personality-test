// reallllyyy bruteforce way of doing this, once django is integrated we should probably feed it to the frontend from the server
const jsonString = `[
    {
        "text": "I enjoy socializing",
        "aspect": "summer",
        "negative": false
    },
    {
        "text": "I like thinking about the dynamics between different people",
        "aspect": "summer",
        "negative": false
    },
    {
        "text": "I'm very interested and invested in romantic relationships",
        "aspect": "summer",
        "negative": false
    },
    {
        "text": "I make jokes more often than my peers",
        "aspect": "summer",
        "negative": false
    },
    {
        "text": "I am well liked by the people around me",
        "aspect": "summer",
        "negative": false
    },
    {
        "text": "I avoid social gatherings unless I have to attend",
        "aspect": "summer",
        "negative": true
    },
    {
        "text": "It's hard for me to change my tone depending on my social group, even with effort",
        "aspect": "summer",
        "negative": true
    },
    {
        "text": "I sometimes avoid parties or other social occasions because I simply have other things to do",
        "aspect": "summer",
        "negative": true
    },
    {
        "text": "I have lower energy than the people around me",
        "aspect": "summer",
        "negative": true
    },
    {
        "text": "I prefer being alone to being around others",
        "aspect": "summer",
        "negative": true
    },
    {
        "text": "I avoid telling lies unless its absolutely necessary",
        "aspect": "winter",
        "negative": false
    },
    {
        "text": "I am naturally sympathetic to other people's problems",
        "aspect": "winter",
        "negative": false
    },
    {
        "text": "I listen at least as much as I talk",
        "aspect": "winter",
        "negative": false
    },
    {
        "text": "I'm careful not to swear in the presence of children",
        "aspect": "winter",
        "negative": false
    },
    {
        "text": "In arguments, I back down when I realize I'm wrong instead of digging my heels in",
        "aspect": "winter",
        "negative": false
    },
    {
        "text": "It's difficult for me to calm down when I have a lot of energy",
        "aspect": "winter",
        "negative": true
    },
    {
        "text": "I have issues with authority figures",
        "aspect": "winter",
        "negative": true
    },
    {
        "text": "I get myself into dangerous situations",
        "aspect": "winter",
        "negative": true
    },
    {
        "text": "I am occasionally violent to those around me, even when I don't intend to be",
        "aspect": "winter",
        "negative": true
    },
    {
        "text": "When someone asks me to do something, it makes me want to do it less",
        "aspect": "winter",
        "negative": true
    },
    {
        "text": "I have many interests I would like to pursue",
        "aspect": "spring",
        "negative": false
    },
    {
        "text": "I investigate why things are the way they are",
        "aspect": "spring",
        "negative": false
    },
    {
        "text": "I make mental connections between different topics",
        "aspect": "spring",
        "negative": false
    },
    {
        "text": "I have a hobby which is extremely important to me, outside of work",
        "aspect": "spring",
        "negative": false
    },
    {
        "text": "I enjoy categorizing and sorting things",
        "aspect": "spring",
        "negative": false
    },
    {
        "text": "I don't get much out of art",
        "aspect": "spring",
        "negative": true
    },
    {
        "text": "I usually start things without outlining or planning them",
        "aspect": "spring",
        "negative": true
    },
    {
        "text": "I rarely talk about my interests or hobbies to others",
        "aspect": "spring",
        "negative": true
    },
    {
        "text": "I'm not a particularly creative person",
        "aspect": "spring",
        "negative": true
    },
    {
        "text": "Sometimes, something is just instinctually right or wrong. Not everything needs a logical explanation",
        "aspect": "spring",
        "negative": true
    },
    {
        "text": "I'm motivated by a sense of accomplishment",
        "aspect": "autumn",
        "negative": false
    },
    {
        "text": "I can get things done better than most of my peers",
        "aspect": "autumn",
        "negative": false
    },
    {
        "text": "I would be useful in an apocalypse",
        "aspect": "autumn",
        "negative": false
    },
    {
        "text": "I can dive right into activities I have little experience with without needing to plan",
        "aspect": "autumn",
        "negative": false
    },
    {
        "text": "I go above and beyond",
        "aspect": "autumn",
        "negative": false
    },
    {
        "text": "I have a hard time motivating myself to accomplish tasks",
        "aspect": "autumn",
        "negative": true
    },
    {
        "text": "I have trouble immediately getting things others would consider “common sense”",
        "aspect": "autumn",
        "negative": true
    },
    {
        "text": "I put work off until the last second",
        "aspect": "autumn",
        "negative": true
    },
    {
        "text": "I rarely exercise",
        "aspect": "autumn",
        "negative": true
    },
    {
        "text": "Other people would consider me lazy",
        "aspect": "autumn",
        "negative": true
    }
]`;
const questions = JSON.parse(jsonString);

// spring, summer, autumn, winter
const scores = [0, 0, 0, 0];
const button_container = document.getElementById("button-container");
const start_button = document.getElementById("begin-button");
const question_text = document.getElementById("question-text");
let question_number = 8;
let questions_answered = 0;

start_button.addEventListener('click', () => {
    start_button.remove();
    const yes_button = document.createElement('button');
    yes_button.className = 'answer-button';
    yes_button.textContent = 'Agree';
    yes_button.style.fontWeight = 'bold';
    yes_button.addEventListener('click', () => {
        questions_answered += 1;
        modify_score(true, scores);
        next_question();
    });
    const no_button = document.createElement('button');
    no_button.className = 'answer-button';
    no_button.textContent = 'Disagree';
    no_button.style.fontWeight = 'bold';
    no_button.addEventListener('click', () => {
        questions_answered += 1;
        modify_score(false, scores);
        next_question();
    });
    button_container.appendChild(yes_button);
    button_container.appendChild(no_button);
    next_question();
});

function next_question() {
    // sets the question number to a new question in the list. assumes 40 questions.
    question_number += 23;
    question_number = question_number % 40;
    question_text.textContent = questions[question_number].text;
    if (questions_answered >= 40) {
        alert(scores[0]);
        alert(scores[1]);
        alert(scores[2]);
        alert(scores[3]);
    }
}

// answer_was_yes is a boolean (yes when Agree, no when Disagree), scores is an array of 4 ints
function modify_score(answer_was_yes, scores) {
    if ((answer_was_yes && !questions[question_number].negative) || (!answer_was_yes && questions[question_number].negative)) {
        switch (questions[question_number].aspect) {
            case "spring":
                scores[0] += 1;
                break;
            case "summer":
                scores[1] += 1;
                break;
            case "autumn":
                scores[2] += 1;
                break;
            case "winter":
                scores[3] += 1;
                break;
            default:
                alert("CRITICAL ERROR");
        }
    }
}
