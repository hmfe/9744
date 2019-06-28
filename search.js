//API query
var request = 'https://www.googleapis.com/customsearch/v1?key=AIzaSyBb4XfXXLB4a2_2wW73vvPXFlsD_z_g0Tk&cx=017576662512468239146:omuauf_lfve&q=';
var searchWord = ''
var query = request + searchWord
var arr = [];

function hndlr(response) {

    //parses the response
    jason = JSON.parse(response);

    document.getElementById("content").innerHTML = "";

    //iterates through jason items and display htmlTitle of each item
    for (var i = 0; i < jason.items.length; i++) {
        var item = jason.items[i];
        document.getElementById("content").innerHTML += "<br>" + item.htmlTitle;
    }
}

var loader = function (querry, callback) {

    //creates http request object
    var xobj = new XMLHttpRequest();

    //forces the stream to be parsed as json
    xobj.overrideMimeType("application/json");

    //initializes the http request
    xobj.open('GET', querry, true);

    //defines what to do when operation is complete & data transfer is successful
    xobj.onreadystatechange = function () {
        //console.log(xobj);
        if (xobj.readyState == 4 && xobj.status == "200") {
            //sends responseText to callback function
            callback(xobj.responseText);
        }
    };
    //send request
    xobj.send(null);
};

//this function adds search result in a form of list and allows for element deletion
var addDeleteSearchList = function () {
    var input = document.getElementById("userInput").value;
    // append new value to the array
    arr.push(input);
    console.log(arr);
    searchWord = input;
    loader(request + searchWord, hndlr);

    document.getElementById("list").innerHTML = "";
    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var day = now.getDay();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var AMPM = "";

    if (hour > 12) {
        AMPM = "PM";
        hour -= 12;
    } else { AMPM = "AM" };

    var time = year + "-" + month + "-" + day + ", " + hour + ":" + minute + " " + AMPM;

    for (var I = 0; I < arr.length; I++) {
        listItem = "<li>" + arr[I] + "<span class=\"space\" >" + time + "</span>" + "<span class=\"close\">&times;</span></li>";
        document.getElementById("list").innerHTML += listItem;
    }

    var closebtns = document.getElementsByClassName("close");
    for (var i = 0; i < closebtns.length; i++) {
        closebtns[i].addEventListener("click", function () {
            this.parentElement.style.display = 'none';
            var str = this.parentElement.innerHTML;
            var el = str.substring(0, str.indexOf("<"));
            arr = arr.filter(item => item !== el)
        });
    }
}

//clears the history
var clearHistory = function () {
    document.getElementById("list").innerHTML = "";
    arr.length = 0;
}
        







