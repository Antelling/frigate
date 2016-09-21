var totalPressed = 0;

$(function () {
    var map = []; // Or you could call it "key"
    onkeydown = onkeyup = function (e) {
        e = e || event; // to deal with IE
        map[e.keyCode] = e.type == 'keydown';

        totalPressed += e.type == 'keydown' ? 1 : -1;

        if (totalPressed === 0) {
            map = [];
        }

        if (map[18] && map[76]) { // alt l
            //focus on searchBox
            $("#search-box").focus();

            return false;
        } else if (map[18] && map[78]) { // alt n
            //slide new notecard button up or down
            $("#new-notecard").click();

            return false;
        } else if (map[18] && map[83]) { // alt s
            //slide up or down the sources
            $("#sources-button").click();

            return false;
        } else if (map[18] && map[74]) { // alt j
            //make a new source
            $("#new-source-button").click();

            return false;
        } else if (map[18] && map[69]) { // alt e
            //focus on essay
            $("#textarea").focus();

            return false;
        }
    };

    window.setInterval(function () {
        map = []
    }, 5000);
});
