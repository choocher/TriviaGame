var card = $("#quiz-area");
var countStartNumber = 30;

// Question set
var questions = [{
    question: "Care Bears were all the rage during the 80s. Which Care Bear was green?",
    answers: ["Best Friend Bear", "Good Luck Bear", "Funshine Bear", "Birthday Bear"],
    correctAnswer: "Good Luck Bear",
    image: "assets/images/Good_Luck_Bear_New.png"
}, {
    question: "During the 80s, everyone wanted a pair of Ray-Ban sunglasses. What film helped to start this trend?",
    answers: ["The Godfather", "Lethal Weapon", "Top Gun", "Dirty Harry"],
    correctAnswer: "Top Gun",
    image: "assets/images/TopGun_TomCruise_1024x768.jpg"
}, {
    question: "What was the highest grossing movie of the 1980s?",
    answers: ["Kramer Vs. Kramer", "E.T.", "Jaws", "Rocky"],
    correctAnswer: "E.T.",
    image: "assets/images/Loc-ETBTM45.jpg"
}, {
    question: "Which of these characters was not one of the Cosby children?",
    answers: ["Marsha", "Denise", "Vanessa", "Theo"],
    correctAnswer: "Marsha",
    image: "assets/images/CosbyShow_withDenise.jpg",
}, {
    question: "During the 1980s if you wanted to be fashionable, which of these things would you own?",
    answers: ["Moccasins", "Jelly shoes", "Saddle shoes", "T-Bars"],
    correctAnswer: "Jelly shoes",
    image: "assets/images/Jelly-Shoes-2.jpg",
}, {
    question: "In the 80s, Bruce Willis played which of these characters?",
    answers: ["John Hancock", "John McClane", "Martin Riggs", "Robert Neville"],
    correctAnswer: "John McClane",
    image: "assets/images/john_mcclane_DieHard.jpg",
}, {
    question: "Which one of these toys made its debut in the 80s?",
    answers: ["G.I. Joe", "Strawberry Shortcake", "Troll Doll", "Suzy Homemaker"],
    correctAnswer: "Strawberry Shortcake",
    image: "assets/images/Classic_Strawberry_Shortcake.jpg",
}, {
    question: "What 80s fashion trend was inspired by the movie Flashdance?",
    answers: ["Bell Bottoms", "Crocs", "Ear Muffs", "Legwarmers"],
    correctAnswer: "Legwarmers",
    image: "assets/images/FlashDance.jpg",
}, {
    question: "In the 80s, Nintendo released their NES or Nintendo Entertainment System. What game came with the system?",
    answers: ["Breakout", "Frogger", "Tetris", "Super Mario Bros."],
    correctAnswer: "Super Mario Bros.",
    image: "assets/images/MarioBros.jpg",
}, {
    question: "In the 80s if you turned on your television and saw the characters Tootie, Blair and Natalie, what show would you be watching?",
    answers: ["Saved by the Bell", "Lavern and Shirley", "The Facts of Life", "Family Matters"],
    correctAnswer: "The Facts of Life",
    image: "assets/images/The_Facts_of_Life.jpg",
}, {
    question: "Which of these films did NOT win an Oscar in the 80s?",
    answers: ["Rain Man", "Star Wars", "Chariots of Fire", "The Last Emperor"],
    correctAnswer: "Star Wars",
    image: "assets/images/StarWars_1977.jpg",
}, {
    question: "Which of these toys, sold by Mattel, became a trend during the 80s?",
    answers: ["Rainbow Brite", "Strawberry Shortcake", "Pound Puppies", "Care Bears"],
    correctAnswer: "Rainbow Brite",
    image: "assets/images/RainbowBrite.jpg",
}, {
    question: "What men's hairstyle was trendy in the 80s?",
    answers: ["The Crop", "The Mullet", "Mop Top", "The flip"],
    correctAnswer: "The Mullet",
    image: "assets/images/Mullet_GeorgeClooney.jpg",
}];

// Variable to hold our setInterval
var timer;

var game = {

    questions: questions,
    currentQuestion: 0,
    counter: countStartNumber,
    correct: 0,
    incorrect: 0,

    countdown: function () {
        game.counter--;
        $("#counter-number").text(game.counter);
        if (game.counter === 0) {
            console.log("TIME UP");
            game.timeUp();
        }
    },

    loadQuestion: function () {

        timer = setInterval(game.countdown, 1000);

        card.html("<h2>" + questions[this.currentQuestion].question + "</h2>");

        for (var i = 0; i < questions[this.currentQuestion].answers.length; i++) {
            card.append("<button class='answer-button' id='button' data-name='" + questions[this.currentQuestion].answers[i]
                + "'>" + questions[this.currentQuestion].answers[i] + "</button>");
        }
    },

    nextQuestion: function () {
        game.counter = countStartNumber;
        $("#counter-number").text(game.counter);
        game.currentQuestion++;
        game.loadQuestion();
    },

    timeUp: function () {

        clearInterval(timer);

        $("#counter-number").html(game.counter);

        card.html("<h2>Out of Time!</h2>");
        card.append("<h3>The Correct Answer was: " + questions[this.currentQuestion].correctAnswer);
        card.append("<img src = '" + questions[game.currentQuestion].image + "' class='correct-answer-image' />");

        if (game.currentQuestion === questions.length - 1) {
            setTimeout(game.results, 3 * 1000);
        }
        else {
            setTimeout(game.nextQuestion, 3 * 1000);
        }
    },

//* trying to add in image on a loop
    results: function () {

        clearInterval(timer);

        card.html("<h2>All done, heres how you did!</h2>");

        $("#counter-number").text(game.counter);

        card.append("<h3>Correct Answers: " + game.correct + "</h3>");
        card.append("<h3>Incorrect Answers: " + game.incorrect + "</h3>");
        card.append("<h3>Unanswered: " + (questions.length - (game.incorrect + game.correct)) + "</h3>");
        card.append("<br><button id='start-over'>Start Over?</button>");
    },

    clicked: function (e) {
        clearInterval(timer);
        if ($(e.target).attr("data-name") === questions[this.currentQuestion].correctAnswer) {
            this.answeredCorrectly();
        }
        else {
            this.answeredIncorrectly();
        }
    },

    answeredIncorrectly: function () {

        game.incorrect++;

        clearInterval(timer);

        card.html("<h2>Nope!</h2>");
        card.append("<h3>The Correct Answer was: " + questions[game.currentQuestion].correctAnswer + "</h3>");
        card.append("<img src = '" + questions[game.currentQuestion].image + "' class='correct-answer-image' />");

        if (game.currentQuestion === questions.length - 1) {
            setTimeout(game.results, 3 * 1000);
        }
        else {
            setTimeout(game.nextQuestion, 3 * 1000);
        }
    },

    answeredCorrectly: function () {

        clearInterval(timer);

        game.correct++;

        card.html("<h2>Correct!</h2>");
        card.append("<img src = '" + questions[game.currentQuestion].image + "' class='correct-answer-image' />");

        if (game.currentQuestion === questions.length - 1) {
            setTimeout(game.results, 3 * 1000);
        }
        else {
            setTimeout(game.nextQuestion, 3 * 1000);
        }
    },

    reset: function () {
        this.currentQuestion = 0;
        this.counter = countStartNumber;
        this.correct = 0;
        this.incorrect = 0;
        this.loadQuestion();
    }
};

// CLICK EVENTS

$(document).on("click", "#start-over", function () {
    game.reset();
});

$(document).on("click", ".answer-button", function (e) {
    game.clicked(e);
});

// Adding image 
$('<img />', {
    src: 'test.png',
    width: '200px',
    height: '100px'
}).appendTo($('#empty').empty())

$(document).on("click", "#start", function () {
    $("#sub-wrapper").prepend("<h2>Time Remaining: <span id='counter-number'>30</span> Seconds</h2>");
    game.loadQuestion();
});