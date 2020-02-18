var questionCounter = 0;
var count = 0;

var answerArray = [];
//var positionArray = ["PVV", "SP", "D66", "GroenLinks", "Partij voor de Dieren", "50Plus", "VNL", "Nieuwe Wegen", "Forum voor Democratie", "De Burger Bewegin", "Vrijzinnige Partij", "Piratenpartij", "Libertarische Partij", "Lokaal in de Kamer", "Niet Stemmers", "VVD", "PvdA", "CDA", "ChristenUnie", "SGP", "OndernemersPartij", "DENK", "Artikel 1"];
var positionArray = [
{ "name": "PVV" },
{ "name": "SP" },
{ "name": "D66" },
{ "name": "GroenLinks" },
{ "name": "Partij voor de Dieren" },
{ "name": "50Plus" },
{ "name": "VNL" },
{ "name": "Nieuwe Wegen" },
{ "name": "Forum voor Democratie" },
{ "name": "De Burger Beweging" },
{ "name": "Vrijzinnige Partij" },
{ "name": "Piratenpartij" },
{ "name": "Libertarische Partij" },
{ "name": "Lokaal in de Kamer" },
{ "name": "Niet Stemmers" },
{ "name": "VVD" },
{ "name": "PvdA" },
{ "name": "CDA" },
{ "name": "ChristenUnie" },
{ "name": "SGP" },
{ "name": "OndernemersPartij" },
{ "name": "DENK" },
{ "name": "Artikel 1" }];

// init function and the render that creates the page content
function init_buttons() {
    var btnPro = document.getElementById("btn-pro");
    var btnNone = document.getElementById("btn-none");
    var btnContra = document.getElementById("btn-contra");
    var btnSkip = document.getElementById("btn-skip");

    // Creating an onclick to send a request te re render the page with a new count
    btnPro.onclick = function () {
        answerArray.splice(count, 0, { "answer": "Eens" });
        prepareRender();
    }
    btnNone.onclick = function () {
        answerArray.splice(count, 0, { "answer": "Geen Van Beiden" });
        prepareRender();
    }
    btnContra.onclick = function () {
        answerArray.splice(count, 0, { "answer": "Oneens" });
        prepareRender();
    }
    btnSkip.onclick = function () {
        answerArray.splice(count, 0, { "answer": "" });
        prepareRender();
    }
}

function prepareRender() {
    if (count == 29) {
        if (confirm("Are you sure you want to submit your answers?")) {
            toggleEndScreen();
        }
        return;
    }
    if (count == undefined) {
        count = 1;
    } else {
        count++;
    }
    render(count);
}

function render(count) {
    // Clears page for the next render otherwise items would duplicate
    clear();

    // If statement to check if the count is undefined
    if (!count == "" || count == "0") {
        questionCounter = count;
    } else {
        console.log("The counter is either set to 0 or undefined");
        questionCounter = 0;
    }

    var wrapperContainer = document.getElementById("statement_wrapper");

    var title = document.createElement("h1");
    var description = document.createElement("p");

    title.setAttribute("id", "statement_title");
    title.innerHTML = questionCounter + 1 + ". " + subjects[questionCounter].title;

    description.setAttribute("id", "statement_description");
    description.innerHTML = subjects[questionCounter].statement;

    wrapperContainer.appendChild(title);
    wrapperContainer.appendChild(description);
}

// Functions for editing page content
function prevPage() {
    answerArray.splice((count-1), 1);

    if (count == 0) {
        //var confirm = confirm("Are you sure you want to go back to start?");
        if (confirm('Are you sure you want to go back to start?')) {
            toggleStart();
        }
        return;
    }
    if (count == undefined) {
        count = 1;
    } else {
        count--;
    }
    render(count);
}

function clear() {
    var wrapperContainer = document.getElementById("statement_wrapper");

    wrapperContainer.innerHTML = "";
}

function calculateResult(questionNumber, opinion) {
    for (i = 0; i < subjects[questionNumber].parties.length; i++) {
        if (subjects[questionNumber].parties[i].position == opinion) {
            if (!positionArray[i].score) {
                positionArray[i].score = +1;
            } else {
                positionArray[i].score = positionArray[i].score + 1;
            }
        }
    }
    console.log(positionArray);
}

function dataDump() {
    var container = document.getElementById("endSecondary");

    for (i = 0; i < positionArray.length; i++) {
        var container = document.getElementById("result_content");
        var p = document.createElement("p");

        if (!positionArray[i].score) {
            p.innerHTML = positionArray[i].name + " " + "0";
        } else {
            p.innerHTML = positionArray[i].name + " " + positionArray[i].score;
        }

        container.appendChild(p);
    }
}

// Functions for toggeling the display of the 3 scenes
function toggleQuestions() {
    document.getElementById("toggleQuestions").style.display = "block";
    document.getElementById("toggleQuestionsContainer").style.display = "none";
} 

function toggleStart() {
    document.getElementById("toggleQuestions").style.display = "none";
    document.getElementById("toggleQuestionsContainer").style.display = "block";
}

function toggleEndScreen() {
    document.getElementById("toggleQuestions").style.display = "none";
    document.getElementById("toggleEndContainer").style.display = "block";

    dataDump();
}