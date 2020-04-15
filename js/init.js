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
    if (count == subjects.length-1) {
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
    for (a = 0; a <= parties.length-1; a++) {
        parties[a].score = 0;
    }
    
    for (let i = 0; i < subjects.length; i++) {
        // loops through the parties in subjects
        // then takes the name and looks for it in the parties array
        for (let p = 0; p < subjects[i].parties.length - 1; p++) {
            // check name, 
            // look for name in parties array, 
            // add points there
            var party = parties.find(a => a.name == subjects[i].parties[p].name);

            if (subjects[i].parties[p].position == answerArray[i].answer) {
                party.score = party.score + 1;
            }
        }
    }
}

function dataDump() {
    var container = document.getElementById("result_content");

    parties.sort((a, b) => parseFloat(b.score) - parseFloat(a.score));

    for (i = 0; i < parties.length; i++) {
        var p = document.createElement("p");
        p.innerHTML = parties[i].name + " " + Math.floor(100 / subjects.length * parties[i].score) + "%";
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

    calculateResult();
    dataDump();
}