var count = 0;

var answerArray = [];

/** init function and the render that creates the page content */
function init_buttons() {
    var btnPro = document.getElementById("btn_pro");
    var btnNone = document.getElementById("btn_none");
    var btnContra = document.getElementById("btn_contra");
    var btnSkip = document.getElementById("btn_skip");

    /** Creating an onclick to send a request te re render the page with a new count */
    btnPro.onclick = function () {
        answerArray.splice(count, 1, { "answer": "pro" });
        prepareRender();
    }
    btnNone.onclick = function () {
        answerArray.splice(count, 1, { "answer": "none" });
        prepareRender();
    }
    btnContra.onclick = function () {
        answerArray.splice(count, 1, { "answer": "contra" });
        prepareRender();
    }
    btnSkip.onclick = function () {
        answerArray.splice(count, 1, { "answer": ""});
        prepareRender();
    }
};

function prepareRender() {

    console.log("prep" + count);
    if (count == subjects.length - 1) {
        count++;

        clear();
        deactivateButtons();

        //renderQuestionWeighing();
        var wrapperContainer = document.getElementById("statement_wrapper");

        var title = document.createElement("h1");
        var description = document.createElement("p");
        var button = document.createElement("button");

        title.setAttribute("id", "statement_title");
        title.innerHTML = "Zijn er onderwerpen die u extra belangerijk vindt?";

        description.setAttribute("id", "statement_description");
        description.innerHTML = "Aangevinkte stellingen tellen extra mee bij het berekenen van het resultaat.";

        button.onclick = function () {
            calculateWeight();
            prepareRender();
            return;
        }
        button.setAttribute("id", "float_right")
        button.setAttribute("class", "btn-answer");
        button.innerHTML = "Ga verder";

        wrapperContainer.appendChild(title);
        wrapperContainer.appendChild(description);
        wrapperContainer.appendChild(button);

        renderAllQuestions();

        return;
    } else if (count == subjects.length) {
        clear();
        deactivateButtons();
        renderPartyScreen();
        count++;
        return;
    } else if (count == undefined) {
        count = 1;
    }

    count++;
    render(count);
};

function render(count) {
    /** Clears page for the next render otherwise items would duplicate */
    clear();

    /** If statement to check if the count is undefined */
    if (!count == "" || count == "0") {
    } else {
        console.log("The counter is either set to 0 or undefined");
        count = 0;
    }

    var wrapperContainer = document.getElementById("statement_wrapper");

    var title = document.createElement("h1");
    var description = document.createElement("p");

    title.setAttribute("id", "statement_title");
    title.innerHTML = count + 1 + ". " + subjects[count].title;

    description.setAttribute("id", "statement_description");
    description.innerHTML = subjects[count].statement;

    wrapperContainer.appendChild(title);
    wrapperContainer.appendChild(description);

    console.log(count);
    if (answerArray[count]) {
        console.log("activated");
        if (answerArray[count].answer == "pro" || answerArray[count].answer == "none" || answerArray[count].answer == "contra") {
            saveButtonInput();
        }
    } else {
        resetButtonColor();
    }
};

function renderPartyScreen() {
    var wrapperContainer = document.getElementById("statement_wrapper");

    var title = document.createElement("h1");
    var description = document.createElement("p");

    var btn1 = document.createElement("button");
    var btn2 = document.createElement("button");
    var btn3 = document.createElement("button");

    btn1.setAttribute("class", "btn-answer btn-parties");
    btn2.setAttribute("class", "btn-answer btn-parties");
    btn3.setAttribute("class", "btn-answer btn-parties");

    btn1.innerHTML = "<i class='fas fa-republican'></i> <span class='PartySelectText'>Selecteer Zittende Partijen</span>";
    btn2.innerHTML = "<i class='fas fa-democrat'></i> <span class='PartySelectText'>Selecteer Seculiere Partijen</span>";
    btn3.innerHTML = "<i class='fas fa-check-double'></i> <span class='PartySelectText'>Selecteer Alle Partijen</span>";

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
};

function renderAllQuestions() {
    for (i = 0; i <= subjects.length-1; i++) {
        var container = document.getElementById("statement_wrapper");

        var smallContainer = document.createElement("div");
        smallContainer.style.display = "inline-block";
        smallContainer.style.margin = "2px 25px";

        var checkbox = document.createElement("input");
        var title = document.createElement("li");
        var hr = document.createElement("hr");

        checkbox.setAttribute("id", "checkbox"+i);
        checkbox.setAttribute("type", "checkbox");
        title.innerHTML = subjects[i].title;

        smallContainer.appendChild(checkbox);
        smallContainer.appendChild(title);
        smallContainer.appendChild(hr);

        container.appendChild(smallContainer);
    };
};

/** Functions for editing page content */
function prevPage() {
    if (count == 0) {

        toggleStart();
        return;
    } else if (count == 30) {

        document.getElementById("statement_actions").style.display = "block";
        render();
    } else if (count == 31) {

        //for some reason I need 2 count--; will be fixed later.
        count--;
        count--;
        prepareRender();
        return;
    } else if (count == 32) {

        document.getElementById("toggleEndContainer").style.display = "none";
        document.getElementById("statement_wrapper").style.display = "block";
        document.getElementById("statement_actions").style.display = "block";
        document.getElementById("result_content").innerHTML = "";

        clear();
        deactivateButtons();
        renderPartyScreen();

        count--;
        return;
    }
    if (count == undefined) {
        count = 1;
    } else {
        count--;
    }
    render(count);
};

function clear() {
    var wrapperContainer = document.getElementById("statement_wrapper");

    wrapperContainer.innerHTML = "";
};

function deactivateButtons() {
    var actionsContainer = document.getElementById("statement_actions");
    actionsContainer.style.display = "none";
};

function activateButtons() {
    var actionsContainer = document.getElementById("statement_actions");

    actionsContainer.display = "block";
};

function saveButtonInput() {
    resetButtonColor();

    if (answerArray[count].answer == "pro") {
        document.getElementById("btn_pro").style.backgroundColor = "#01B4DC";
    } else if (answerArray[count].answer == "none") {
        document.getElementById("btn_none").style.backgroundColor = "#01B4DC";
    } else if (answerArray[count].answer == "contra") {
        document.getElementById("btn_contra").style.backgroundColor = "#01B4DC";
    }
};

function resetButtonColor() {
    document.getElementById("btn_pro").style.backgroundColor = "black";
    document.getElementById("btn_none").style.backgroundColor = "black";
    document.getElementById("btn_contra").style.backgroundColor = "black";
};

function calculateWeight() {
    for (i = 0; i <= subjects.length - 1; i++) {
        var checkbox = document.getElementById("checkbox"+i);
        if (checkbox.checked == true) {
            answerArray[i].checked = true;
        } else {
            answerArray[i].checked = false;
        }
    }
};

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
        //console.log(answerArray[b].checked);
        if (answerArray[b].checked == true) {
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
                if (answerArray[i].checked == true) {
                    party.score = party.score + 2;
                } else {
                    party.score = party.score + 1;
                }
            }
        }
    }
};

function dataDump(answer) {
    var container = document.getElementById("result_content");

    parties.sort((a, b) => parseFloat(b.score) - parseFloat(a.score));

    var firstCheck = true;

    for (i = 0; i < parties.length; i++) {
        var p = document.createElement("p");
        var p2 = document.createElement("p");

        p.setAttribute("class", "resultString");
        p2.setAttribute("class", "resultBar");
       
        if (firstCheck == true && (answer == "big" && parties[i].size >= 1 || answer == "small" && parties[i].size >= 1 || answer == "all")) {
            var topParty = document.createElement("p");

            topParty.innerHTML = "Uw mening komt het best overeen met: <br><b>" + parties[i].name + "</b>";
            topParty.style.textAlign = "center";
            topParty.style.paddingBottom = "50px";

            container.appendChild(topParty);
            firstCheck = false;
        }

        if (answer == "big" && parties[i].size >= 1 || answer == "small" && parties[i].size <= 1 || answer == "all") {
            var calc = Math.floor(100 / total_checks * parties[i].score);

            p.innerHTML = parties[i].name
            p2.innerHTML =  calc + "%";

            p2.style.background = "-webkit-linear-gradient(left, #01B4DC " + calc + "%, white " + calc + "%)";

            append();
        }

        function append() {
            container.appendChild(p);
            container.appendChild(p2);
        }
    }
};

/** Functions for toggeling the display of the 3 scenes */
function toggleQuestions() {
    document.getElementById("toggleQuestions").style.display = "block";
    document.getElementById("toggleStart").style.display = "none";
};

function toggleStart() {
    document.getElementById("toggleQuestions").style.display = "none";
    document.getElementById("toggleStart").style.display = "block";
};

function toggleEndScreen(answer) {
    document.getElementById("toggleEndContainer").style.display = "block";
    document.getElementById("statement_wrapper").style.display = "none";

    calculateResult();
    dataDump(answer);

    count++;
};