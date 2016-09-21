//now we want to make the notecard new slide up button functional
$("#new-notecard").click(function notecardSlideUp() {
    //we need to animate sliding up the panel, and rotate the button
    if (notecardUp) {
        $("#new-notecard").animateRotate(180, 0, 500, 'swing', function () {
        });
        $("#new-card-container").animate({
            top: window.innerHeight - 80
        }, 500);
    } else {
        $("#new-notecard").animateRotate(0, 180, 500, 'swing', function () {
        });
        $("#new-card-container").animate({
            top: window.innerHeight - 301
        }, 500);
        window.setTimeout(function(){
            $("#fact-box").focus();
        }, 501);
    }
    notecardUp = !notecardUp;
});

//now we do adding new notecards
$("#under").on("submit", function notecardSubmitHandler(e) {

    var fact = $("#fact-box").val();
    var tags = $("#tags-box").val();
    var source = $("#source-box").val();
    var page = $("#page-box").val();

    //let's make sure there is a fact
    if (fact === "") {
        alert("fact box is empty");
        e.preventDefault();
        throw "fact box is empty"
    }

    //let's make sure the source is a number
    if (isNaN(Number(source))) {
        alert("source needs to be a number");
        e.preventDefault();
        throw "invalid source";
    }

    //lets make sure the source one of the sources we have
    if (!doesSourceExist(source)) {
        alert("invalid source number");
        e.preventDefault();
        throw "invalid source";
    }

    $("#source-box").val("");
    $("#fact-box").val("");
    $("#tags-box").val("");
    $("#page-box").val("");

    var template = "<div id=NUMB><div class=notecard>" +
        "<div class=notecard-number>#NUMB</div>" +
        '<div class="notecard-page">pg. PAGE</div>' +
        "<div class=notecard-fact>FACT</div>" +
        '<span class="glyphicon glyphicon-trash notecard-delete" aria-hidden="true"></span>' +
        "<div class=notecard-tags>TAGS</div>" +
        "<div class=notecard-source>(SOURCE)</div>" +
        "</div></div>";

    if (!tags) {
        template = template.replace("<div class=notecard-tags>TAGS</div>", "");
    }
    if(!page) {
        template = template.replace('<div class="notecard-page">pg. PAGE</div>', '');
    }

    tags = tags.split(" ").map(function (tag) {
        return "<span>" + tag + "</span>";
    }).join("");

    var amountOfCards = amountOfNotecards();

    var notecard = template
        .replace(/NUMB/g, amountOfCards)
        .replace("PAGE", page)
        .replace("FACT", fact)
        .replace("TAGS", tags)
        .replace("SOURCE", source);

    $(".notecards").append(notecard);

    //now we need to mark that the source this notecard used is being used by a notecard
    colorSourcesYellow(source);

    e.preventDefault(); //because that won't even work
});

$("#notecard-container").on("click", ".notecard-delete", function deleteNotecard() {
    //deletes notecards when they are clicked
    var srsly = confirm("delete this notecard?");
    if (srsly) {
        var source = $(this).parent().children().last().text().trim().slice(1).replace(")", "");
        $(this).parent().parent().remove();
        doneTyping(); //makes sure the green color is good
        //but we still need to make sure all yellow sources should still be yellow
        colorSourcesYellow();
    }
});

function amountOfNotecards() {
    if($(".notecards").children().length < 2) {
        return "1";
    }
    return Number($(".notecards").children().last().children().first().children().first().text().trim().slice(1)) + 1;
}

function doesSourceExist(source) {
    return !!$("#source-" + source).html()
}
