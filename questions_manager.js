/* class which manages the user's scores and question data. */
export class Questions_manager {
    constructor(jsonString) {
        // spring, summer, autumn, winter
        this.scores = [0, 0, 0, 0];
        this.question_number = 8;
        this.questions_answered = 0;
        this.questions = JSON.parse(jsonString);
    }
    next_question() {
        this.questions_answered += 1;
        // sets the question number to a new question in the list. assumes 40 questions.
        this.question_number += 23;
        this.question_number = this.question_number % 40;
    }
    // returns an object with the current question's text, aspect, and whether it is negative.
    get_current_question() {
        return this.questions[this.question_number];
    }
    // answer_was_yes is a boolean (yes when Agree, no when Disagree)
    modify_score(answer_was_yes) {
        const current_question = this.get_current_question();
        if ((answer_was_yes && !current_question.negative) || (!answer_was_yes && current_question.negative)) {
            switch (current_question.aspect) {
                case "spring":
                    this.scores[0] += 1;
                    break;
                case "summer":
                    this.scores[1] += 1;
                    break;
                case "autumn":
                    this.scores[2] += 1;
                    break;
                case "winter":
                    this.scores[3] += 1;
                    break;
                default:
                    alert("CRITICAL ERROR");
            }
        }
    }
}
