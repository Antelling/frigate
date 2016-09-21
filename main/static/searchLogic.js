$("#search-box").keypress(function(e) {
    if(e.keyCode == 13) {
        doTheSearch();
    }
});

$("#search-box").click(function(){
    $(this).select();
});

$("#search-button").click(doTheSearch);


function doTheSearch() {
    //hides notecards that do not comply with the search

    //get the info about all the notecards
    var roster = getInfoAboutCards();

    //now we get what they searched for, and determine if it's a tag
    var searchString = $("#search-box").val();

    //okay so we have tags, text, and regex
    //if it starts with an octothorpe, assume all words are tags
    //if it starts with a slash and ends with a slash, assume regex
    //else, text
    var searcher;
    switch (searchString.slice(0, 1)) {
        case "#":
            var tags = searchString.split(" ").map(function (tag) {
                if (tag.slice(0, 1) === "#" && tag.length > 1) {
                    return tag.slice(1);
                } else if (tag !== "") {
                    return tag;
                }
            });
            searcher = tags;
            break;
        default:
            searcher = searchString;
            break;
    }

    for (var id in roster) {
        if (roster.hasOwnProperty(id)) {
            if(isMatch(roster[id], searcher)){
                $("#" + id).show();
            } else {
                $("#" + id).hide();
            }
        }
    }

}

function getInfoAboutCards() {
    //gathers the tags, id, and text of all notecards
    //returns an object of schema object[id][text | tags]

    var total = {};

    var first = true;
    $(".notecards").children().each(function (i) {
        if (first) { //skip the first div, that's just the search bar
            first = false;
            return;
        }

        var node = $(this).first();
        var id = node.find(".notecard-number").text().trim().slice(1);
        var text = node.find(".notecard-fact").text().trim();
        var tags = [];
        node.find(".notecard-tags").children().each(function (i) {
            tags.push($(this).text().trim())
        });

        total[id] = {
            "text": text,
            "tags": tags
        }
    });

    return total;
}

function isMatch(card, searcher) {
    switch(getTypeName(searcher)) {
        case "string":
            return card.text.toLowerCase().indexOf(searcher.toLowerCase()) !== -1;
            break;
        case "Array":
            return arraysContainCollisions(searcher, card.tags);
            break;
    }
}

function arraysContainCollisions(a, b) {
    //determines if two arrays have duplicate items
    var contains = false;
    a.forEach(function(x) {
        b.forEach(function(y) {
            if (x === y) {
                contains = true;
            }
        });
    });
    return contains;
}

$("#notecard-container").on("click", ".notecard-tags > span", function putTagInSearchBox(){
    //when a tag is clicked, it will append it to the search box if the box contains tags
    //if the box contains text, it will be replaced by the tag

    var text = "#" + $(this).text();
    var searchBox = $("#search-box").val();
    if(searchBox.slice(0,1) === "#") {
        $("#search-box").val(searchBox + " " + text);
    } else {
        $("#search-box").val(text);
    }
});
