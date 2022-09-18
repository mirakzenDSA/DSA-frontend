function open_tab(element, game, current) {
    var i, tabcontent;

    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    var children = element.parentNode.childNodes;
    for (var i = 0; i < children.length; ++i) {
        if (children[i].nodeName == "BUTTON") {
            children[i].style.color = "#bdbebf";
        }
    }
    element.style.color = "#b59351";

    document.getElementById(game).style.display = "block";
}