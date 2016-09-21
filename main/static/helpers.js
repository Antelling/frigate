//jquery addon function
$.fn.animateRotate = function (startAngle, endAngle, duration, easing, complete) {
    //jquery addon to animate rotating
    //defined in helpers.js

    return this.each(function () {
        var elem = $(this);

        $({deg: startAngle}).animate({deg: endAngle}, {
            duration: duration,
            easing: easing,
            step: function (now) {
                elem.css({
                    '-moz-transform': 'rotate(' + now + 'deg)',
                    '-webkit-transform': 'rotate(' + now + 'deg)',
                    '-o-transform': 'rotate(' + now + 'deg)',
                    '-ms-transform': 'rotate(' + now + 'deg)',
                    'transform': 'rotate(' + now + 'deg)'
                });
            },
            complete: complete || $.noop
        });
    });
};

function readyTextArea() {
    //makes tabbing in a text area possible
    //defined in helpers.js


    $(document).delegate('#textarea', 'keydown', function (e) {
        var keyCode = e.keyCode || e.which;

        if (keyCode == 9) {
            e.preventDefault();
            var start = $(this).get(0).selectionStart;
            var end = $(this).get(0).selectionEnd;

            // set textarea value to: text before caret + tab + text after caret
            $(this).val($(this).val().substring(0, start)
                + "\t"
                + $(this).val().substring(end));

            // put caret at right position again
            $(this).get(0).selectionStart =
                $(this).get(0).selectionEnd = start + 1;
        }
    });
}

function getTypeName(value) {
    //better javascript typeof value
    //http://www.2ality.com/2011/11/improving-typeof.html
    //defined in helpers.js

    if (value === null) {
        return "null";
    }
    var t = typeof value;
    switch (t) {
        case "function":
        case "object":
            if (value.constructor) {
                if (value.constructor.name) {
                    return value.constructor.name;
                } else {
                    // Internet Explorer
                    // Anonymous functions are stringified as follows: 'function () {}'
                    // => the regex below does not match
                    var match = value.constructor.toString().match(/^function (.+)\(.*$/);
                    if (match) {
                        return match[1];
                    }
                }
            }
            // fallback, for nameless constructors etc.
            return Object.prototype.toString.call(value).match(/^\[object (.+)\]$/)[1];
        default:
            return t;
    }
}