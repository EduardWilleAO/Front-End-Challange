var questionCounter = 0;
var count = 0;

var answerArray = [];
//var positionArray = [
//{ "name": "PVV", "position": "" },
//{ "name": "SP", "position": "" },
//{ "name": "D66", "position": "" },
//{ "name": "GroenLinks", "position": "" },
//{ "name": "Partij voor de Dieren", "position": "" },
//{ "name": "50Plus", "position": "" },
//{ "name": "VNL", "position": "" },
//{ "name": "Nieuwe Wegen", "position": "" },
//{ "name": "Forum voor Democratie", "position": "" },
//{ "name": "De Burger Beweging", "position": "" },
//{ "name": "Vrijzinnige Partij", "position": "" },
//{ "name": "Piratenpartij", "position": "" },
//{ "name": "Libertarische Partij", "position": "" },
//{ "name": "Lokaal in de Kamer", "position": "" },
//{ "name": "Niet Stemmers", "position": "" },
//{ "name": "VVD", "position": "" },
//{ "name": "PvdA",  "position": "" },
//{ "name": "CDA", "position": "" },
//{ "name": "ChristenUnie", "position": "" },
//{ "name": "SGP", "position": "" },
//{ "name": "OndernemersPartij", "position": "" },
//{ "name": "DENK", "position": "" },
//{ "name": "Artikel 1", "position": "" }];

// init function and the render that creates the page content
function init_buttons() {
    var buttonContainer = document.getElementById("statement_actions");

    var buttonEens = document.createElement("button");
    var buttonGeenVanBeiden = document.createElement("button");
    var buttonOneens = document.createElement("button");
    var buttonSkip = document.createElement("button");

    buttonEens.setAttribute("class", "btn-answer");
    buttonGeenVanBeiden.setAttribute("class", "btn-answer");
    buttonOneens.setAttribute("class", "btn-answer");
    buttonSkip.setAttribute("id", "btn-skip");

    buttonEens.innerHTML = "Eens";
    buttonGeenVanBeiden.innerHTML = "Geen Van Beiden";
    buttonOneens.innerHTML = "Oneens";
    buttonSkip.innerHTML = "Sla deze vraag over <i class='fas fa-arrow-right'></i>";

    // Creating an onclick to send a request te re render the page with a new count
    buttonEens.onclick = function () {
        answerArray.splice(count, 0, { "answer": "Eens" });
        //positionArray[count].position = "Eens";
        prepareRender();
    }
    buttonGeenVanBeiden.onclick = function () { answerArray.splice(count, 0, { "answer": "Geen Van Beiden" }); prepareRender(); }
    buttonOneens.onclick = function () { answerArray.splice(count, 0, { "answer": "Oneens" }); prepareRender(); }
    buttonSkip.onclick = function () { answerArray.splice(count, 0, { "answer": "" }); prepareRender(); }

    buttonContainer.appendChild(buttonEens);
    buttonContainer.appendChild(buttonGeenVanBeiden);
    buttonContainer.appendChild(buttonOneens);
    buttonContainer.appendChild(buttonSkip);
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

function logPro() {
    //var pro = 0;
    //for (i = 0; i <= subjects[0].parties.length-1; i++) {
    //    var answer = subjects[i].parties[i].position;
    //    if (answerArray[i] == "Eens") {
    //        pro++;
    //        console.log(pro);
    //        answerArray[i];
    //    }
    //}

    // Display all the items that agree with the button
    for (i = 0; i < subjects[0].parties.length - 1; i++) {
        if (subjects[0].parties[i].position == "pro") {
            subjects[0].parties[i].score = +1;
        }
    }

    

    var name = document.getElementById("content");
    var string = subjects[0].parties[0].name.toString();
    name.appendChild("hello");
}

logPro();

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
}