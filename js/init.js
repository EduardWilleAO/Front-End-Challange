var questionCounter = 0;
var count = 0;

var answerArray = [];

// init function and the render that creates the page content
function init_buttons() {
    var btnPro = document.getElementById("btn-pro");
    var btnNone = document.getElementById("btn-none");
    var btnContra = document.getElementById("btn-contra");
    var btnSkip = document.getElementById("btn-skip");

    // Creating an onclick to send a request te re render the page with a new count
    btnPro.onclick = function () {
        answerArray.splice(count, 0, { "answer": "pro" });
        prepareRender();
    }
    btnNone.onclick = function () {
        answerArray.splice(count, 0, { "answer": "none" });
        prepareRender();
    }
    btnContra.onclick = function () {
        answerArray.splice(count, 0, { "answer": "contra" });
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

function calculateResult() {
    for (i = 0; i < answerArray.length; i++) {
        for (a = 0; a < parties.length - 1; a++) {
            if (subjects[i].parties[a].position == answerArray[i].answer) {
                if (!parties[a].score) {
                    parties[a].score = +1;
                } else {
                    parties[a].score = parties[a].score + 1;
                }
            }
        }
    }
}

function dataDump() {
    var container = document.getElementById("result_content");
    var zero_container = document.getElementById("result_zero_container");

    parties.sort((a, b) => parseFloat(a.score) - parseFloat(b.score));

    for (i = 0; i < parties.length; i++) {
        var p = document.createElement("p");
        if (!parties[i].score) {
            p.innerHTML = parties[i].name + " " + "0%";
            zero_container.appendChild(p);
        } else {
            p.innerHTML = parties[i].name + " " + Math.floor(100 / 30 * parties[i].score) + "%";
            container.prepend(p);
        }
    }

    container.appendChild(zero_container);
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

    calculateResult();
    dataDump();
}