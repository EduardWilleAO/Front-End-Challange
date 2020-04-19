var questionCounter = 0;
var count = 0;

var answerArray = [];

/** init function and the render that creates the page content */
function init_buttons() {
    var btnPro = document.getElementById("btn_pro");
    var btnNone = document.getElementById("btn_none");
    var btnContra = document.getElementById("btn_contra");
    var btnSkip = document.getElementById("btn_skip");
    var btnCheck = document.getElementById("btn_weight");

    /** Creating an onclick to send a request te re render the page with a new count */
    btnPro.onclick = function () {
        if (btnCheck.checked == true) {
            answerArray.splice(count, 0, { "answer": "pro", "checked": "yes" });
            btnCheck.checked = true;
        } else {
            answerArray.splice(count, 0, { "answer": "pro", "checked": "no" });
            btnCheck.checked = false;
        }
        prepareRender();
    }
    btnNone.onclick = function () {
        if (btnCheck.checked == true) {
            answerArray.splice(count, 0, { "answer": "none", "checked": "yes" });
            btnCheck.checked = true;
        } else {
            answerArray.splice(count, 0, { "answer": "none", "checked": "no" });
            btnCheck.checked = false;
        }
        prepareRender();
    }
    btnContra.onclick = function () {
        if (btnCheck.checked == true) {
            answerArray.splice(count, 0, { "answer": "contra", "checked": "yes" });
            btnCheck.checked = true;
        } else {
            answerArray.splice(count, 0, { "answer": "contra", "checked": "no" });
            btnCheck.checked = false;
        }
        prepareRender();
    }
    btnSkip.onclick = function () {
        // not sure if any party gets points from this answer so it's here just in case
        if (btnCheck.checked == true) {
            answerArray.splice(count, 0, { "answer": "", "checked": "yes" });
            btnCheck.checked = true;
        } else {
            answerArray.splice(count, 0, { "answer": "", "checked": "no" });
            btnCheck.checked = false;
        }
        prepareRender();
    }
}

function prepareRender() {
    if (count == subjects.length-1) {
        var endQuestion = prompt("Submitting answers: *grote partijen*, *kleine partijen*, *alle partijen* or hit enter to cancel");
        if (endQuestion == "grote partijen") {
            toggleEndScreen("big");
        } else if (endQuestion == "kleine partijen") {
            toggleEndScreen("small");
        } else if (endQuestion == "alle partijen") {
            toggleEndScreen("all");
        } else {
            alert("Going back to previous page");
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
    /** Clears page for the next render otherwise items would duplicate */
    clear();

    /** If statement to check if the count is undefined */
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

/** Functions for editing page content */
function prevPage() {
    answerArray.splice((count-1), 1);

    if (count == 0) {
        // var confirm = confirm("Are you sure you want to go back to start?"); */
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

    /** 
     * function to check total amount of possible points assigned to the parties, 
     * then changes the amount used in percentages to that.
     */
    total_checks = 0;
    for (b = 0; b <= answerArray.length - 1; b++) {
        console.log(answerArray[b].checked);
        if (answerArray[b].checked == "yes") {
            total_checks = total_checks + 2;
        } else {
            total_checks = total_checks + 1;
        }
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
                if (answerArray[i].checked == "yes") {
                    party.score = party.score + 2;
                } else {
                    party.score = party.score + 1;
                }
            }
        }
    }
}

function retrieveData(p, i) {
    p.innerHTML = parties[i].name + " " + Math.floor(100 / total_checks * parties[i].score) + "%";
}

function dataDump(answer) {
    var container = document.getElementById("result_content");

    parties.sort((a, b) => parseFloat(b.score) - parseFloat(a.score));

    for (i = 0; i < parties.length; i++) {
        var p = document.createElement("p");
        console.log(answer, parties[i].size);

        if (answer == "big" && parties[i].size >= 1) retrieveData(p, i); 
        else if (answer == "small" && parties[i].size <= 1) retrieveData(p, i); 
        else if (answer == "all") retrieveData(p, i); 

        container.appendChild(p);
    }
}

/** Functions for toggeling the display of the 3 scenes */
function toggleQuestions() {
    document.getElementById("toggleQuestions").style.display = "block";
    document.getElementById("toggleQuestionsContainer").style.display = "none";
} 

function toggleStart() {
    document.getElementById("toggleQuestions").style.display = "none";
    document.getElementById("toggleQuestionsContainer").style.display = "block";
}

function toggleEndScreen(answer) {
    document.getElementById("toggleQuestions").style.display = "none";
    document.getElementById("toggleEndContainer").style.display = "block";

    calculateResult();
    dataDump(answer);
}