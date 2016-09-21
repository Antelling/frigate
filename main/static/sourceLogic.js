//now we want to make the source slide up button functional
$("#sources-button").click(function slideSourcesUp() {
    //animates sliding up the sources panel, and rotates the button
    if (sourcesUp) {
        $("#sources-button").animateRotate(180, 0, 500, 'swing', function () {
        });
        $("#sources-container").animate({
            top: window.innerHeight - 80
        }, 500);
    } else {
        $("#sources-button").animateRotate(0, 180, 500, 'swing', function () {
        });

        slideTopToShowSources()
    }
    sourcesUp = !sourcesUp;
});

function slideTopToShowSources() {
    var number = $("#source-list-container > div").length;
    var offset = number * 52 + 80;
    var top = window.innerHeight - offset;
    top = top > 51 ? top : 51;
    $("#sources-container").animate({
        top: top
    }, 500);
}

//k now let's make clicking the + add a source
$("#new-source-button").click(function addNewSource() {
    //adds a new source to the list of sources
    var url = prompt("url: ");
    if (!url) {
        return;
    }
    var number = Number($("#source-list-container").children().last().children().first().text()) + 1;
    $("#source-list-container").append("<div class=line id=source-" + number + ">" +
        "<span class=number>" + number + "</span>" +
        "<span class=url>" + url + "</span>" +
        '<span class="glyphicon glyphicon-trash source-delete" aria-hidden="true"></span></div>');

    if (sourcesUp) {
        slideTopToShowSources();
    }
});


$("#source-list-container").on("click", ".source-delete", function deleteSource() {
    //deletes notecards when they are clicked
    var srsly = confirm("delete this source?");
    if (!srsly) {
        return;
    }
    $(this).parent().remove();
    slideTopToShowSources();
});