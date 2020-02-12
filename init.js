function init() {
    var container = document.getElementById("statement_actions");

    var buttonEens = document.createElement("button");
    var buttonGeenVanBeiden = document.createElement("button");
    var buttonOneens = document.createElement("button");

    buttonEens.setAttribute("class", "btn-answer");
    buttonGeenVanBeiden.setAttribute("class", "btn-answer");
    buttonOneens.setAttribute("class", "btn-answer");

    buttonEens.innerHTML = "Eens";
    buttonGeenVanBeiden.innerHTML = "Geen Van Beiden";
    buttonOneens.innerHTML = "Oneens";

    container.appendChild(buttonEens);
    container.appendChild(buttonGeenVanBeiden);
    container.appendChild(buttonOneens);

    console.log(container);
}

init();