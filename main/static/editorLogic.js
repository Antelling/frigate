readyTextArea(); //enable tabbing


//handler to run function when user stops typing
var typingTimer;                //timer identifier
var doneTypingInterval = 500;  //time in ms, 5 second for example
var $input = $('#textarea');
$input.on('keyup', function () {
    clearTimeout(typingTimer);
    typingTimer = setTimeout(doneTyping, doneTypingInterval);
});
$input.on('keydown', function () {
    clearTimeout(typingTimer);
});


function doneTyping() {
    //called after user stops typing for a certain interval
    //will color notecards and sources green

    var text = $("#textarea").val();
    parse(text);
}

function parse(text) {
    //parses the essay to extract what sources are used

    //we need to extract (#) groups
    var match = /\(\d+\)/g;
    var numbers = text.match(match);
    if (numbers) {
        numbers = numbers.map(function (group) {
            return group.replace("(", "").replace(")", "");
        });
        color(numbers);
    } else {
        color([]);
    }
}

function color(numbers) {
    //colors notecards that are used in the essay

    //okay so we have the old list of colored tags
    //if it is in the new list and old list, don't do anything
    //if it is in just the new list, color it
    //if it is just the old list, uncolor it
    var newList = [];
    numbers.forEach(function (number) {
        if (coloredNotes.indexOf(number) === -1) {
            //so the note is currently not colored
            newList.push(number);
            $("#" + number).addClass("green")
        } else {
            //it is colored and should be colored
            coloredNotes.splice(coloredNotes.indexOf(number), 1);
        }
    });
    //now everything left in coloredNotes should not be colored
    coloredNotes.forEach(function (number) {
        $("#" + number).removeClass("green")
    });
    coloredNotes = newList;

    //now we want to use our updated list of used notes to color our sources
    colorSourcesGreen(newList);
}


function colorSourcesGreen(notes) {
    //colors sources that are used by a notecard that is used in the essay green

    var usedSources = determineSources(notes);
    //notes are already yellow due to a task that runs every time a notecard is submitted
    //we need to make them green if they are used by a green notecard
    var newList = [];
    usedSources.forEach(function (source) {
        if (coloredGreenSources.indexOf(source) === -1) {
            newList.push(source);
            $("#source-" + source).addClass("green");
        } else {
            coloredGreenSources.splice(coloredGreenSources.indexOf(source), 1);
        }
    });
    coloredGreenSources.forEach(function (source) {
        $("#source-" + source).removeClass("green");
    });
    coloredGreenSources = newList;
}

//now we need to loop over every notecard and add it's source to the yellow sources
function colorSourcesYellow() {
    $("#source-list-container").children().each(function(){
        $(this).removeClass("yellow");
    });
    $(".notecards").children().each(function(i) {
        if(i === 0) return;
        var source = $(this).children().first().children().first().text().trim().slice(1);
        $("#source-" + source).addClass("yellow");
    });

}

function determineSources(notes) {
    //loops over every notecard, extracts the source, then adds the source to a non duplicating list of sources
    var sources = {}; //god I hate javascript
    notes.forEach(function (note) {
        note = $("#" + note + " .notecard-source").text().trim().replace("(", "").replace(")", "");
        if (!(note in sources)) {
            sources[note] = true;
        }
    });
    var all = [];
    for (var x in sources) {
        if (sources.hasOwnProperty(x)) {
            all.push(Number(x));
        }
    }
    return all;
}
