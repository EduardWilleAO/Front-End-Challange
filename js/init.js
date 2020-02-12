questionCounter = 0;
count = 0;

answerArray = [];

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
    buttonSkip.setAttribute("class", "btn-answer");

    buttonEens.innerHTML = "Eens";
    buttonGeenVanBeiden.innerHTML = "Geen Van Beiden";
    buttonOneens.innerHTML = "Oneens";
    buttonSkip.innerHTML = "Sla deze vraag over";

    // Creating an onclick to send a request te re render the page with a new count
    buttonEens.onclick = function () { answerArray.splice(count, 0, { "answer": "Eens" }); prepareRender(); }
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