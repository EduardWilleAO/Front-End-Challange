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
    if (count == subjects.length - 1) {
        clear();
        deactivateButtons();
        renderPartyScreen();

        count++;
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

function renderPartyScreen() {
    var wrapperContainer = document.getElementById("statement_wrapper");

    var title = document.createElement("h1");
    var description = document.createElement("p");

    var btn1 = document.createElement("button");
    var btn2 = document.createElement("button");
    var btn3 = document.createElement("button");

    btn1.setAttribute("class", "btn-answer");
    btn2.setAttribute("class", "btn-answer");
    btn3.setAttribute("class", "btn-answer");

    btn1.innerHTML = "Selecteer Zittende Partijen";
    btn2.innerHTML = "Selecteer Seculiere Partijen";
    btn3.innerHTML = "Selecteer Alle Partijen";

    btn1.onclick = function () { toggleEndScreen("big"); }
    btn2.onclick = function () { toggleEndScreen("small"); }
    btn3.onclick = function () { toggleEndScreen("all"); }

    title.setAttribute("id", "statement_title");
    title.innerHTML = "Welke partijen wilt u meenemen in het resultaat?";

    description.setAttribute("id", "statement_description");
    description.innerHTML = "U kunt kiezen voor zittende partijen, die nu in de Tweede Kamer vertegenwoordigd zijn. Daarbij nemen we ook de partijen mee die in de peilingen op minimaal een zetel staan. U kunt alle partijen meenemen en u kunt een eigen selectie maken van tenminste drie partijen.";

    wrapperContainer.appendChild(title);
    wrapperContainer.appendChild(description);
    wrapperContainer.appendChild(btn1);
    wrapperContainer.appendChild(btn2);
    wrapperContainer.appendChild(btn3);
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

function deactivateButtons() {
    var actionsContainer = document.getElementById("statement_actions");
    actionsContainer.style.display = "none";
};

function activateButtons() {
    var actionsContainer = document.getElementById("statement_actions");

    actionsContainer.display = "block";
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

function dataDump(answer) {
    var container = document.getElementById("result_content");

    parties.sort((a, b) => parseFloat(b.score) - parseFloat(a.score));

    for (i = 0; i < parties.length; i++) {
        var p = document.createElement("p");
        var p2 = document.createElement("p");
        p.style.display = "inline-block";
        p2.style.display = "inline-block";
        p.style.margin = "0";
        p2.style.margin = "0";
        p.style.width = "50%";
        p2.style.width = "50%";

        //console.log(answer, parties[i].size);

        if (answer == "big" && parties[i].size >= 1) {
            console.log(parties[i].score);
            p.innerHTML = parties[i].name
            p2.innerHTML = Math.floor(100 / total_checks * parties[i].score) + "%";
            append();
        }
        else if (answer == "small" && parties[i].size <= 1) {
            p.innerHTML = parties[i].name
            p2.innerHTML = Math.floor(100 / total_checks * parties[i].score) + "%";
            append();
        }
        else if (answer == "all") {
            p.innerHTML = parties[i].name
            p2.innerHTML = Math.floor(100 / total_checks * parties[i].score) + "%";
            append();
        }

        function append() {
            container.appendChild(p);
            container.appendChild(p2);
        }
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
    document.getElementById("toggleEndContainer").style.display = "block";
    document.getElementById("statement_wrapper").style.display = "none";

    calculateResult();
    dataDump(answer);
}