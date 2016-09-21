//save every 4 seconds
window.setInterval(function save() {
    //gather all test info and save
    var data = {};
    data.cards = JSON.stringify(collectNotecards());
    data.essay = collectEssay();
    data.sources = JSON.stringify(collectSources());
    data.title = document.title.replace("Edit ", "");

    $.post("/main/save", data);
}, 4000);

function collectNotecards() {
    //get all the information about all the notecards
    var cards = [];
    $(".notecards").children().each(function (i) {
        if (i === 0) return;
        var data = {};
        var card = $(this).children().first();
        data.numb = card.find(".notecard-number").text().trim().slice(1);
        data.fact = card.find(".notecard-fact").text().trim();
        data.source = card.find(".notecard-source").text().trim().replace("(", "").replace(")", "");
        data.page = card.find(".notecard-page").text().trim().slice(4);
        data.tags = [];
        card.find(".notecard-tags").children().each(function(){
            data.tags.push($(this).text())
        });
        cards.push(data);
    });
    return cards;
}

function collectEssay() {
    //grab the essay
    return $("#textarea").val().trim();
}

function collectSources() {
    //get all the sources
    var sources = [];
    $("#source-list-container").children().each(function () {
        var source = $(this);
        var data = {};
        data.numb = source.find(".number").text().trim();
        data.url = source.find(".url").text().trim();
        sources.push(data);
    });
    return sources;
}