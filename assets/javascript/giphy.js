
var emoArr = ["Happy", "Love", "Suprised", "Confused", "Amused", "Frustration", "Sad", "Disappointed", "Exhausted", "Fear"];

var emoCount = 0;

for (var i = 0; i < emoArr.length; i++) {
    var a = $("<button class='car-btn btn btn-outline-secondary'>");
    // Adding a data-attribute
    a.attr("data-name", emoArr[i]);
    // Providing the initial button text
    a.text(emoArr[i]);

    $("#buttons-view").append(a);
    emoCount++;
}


$("#search-btn").on("click", function () {

    var searchTerm = $("#searched-val").val();
    emoArr.push(searchTerm);

    var a = $("<button class='car-btn btn btn-outline-secondary'>");

    // Adding a data-attribute
    a.attr("data-name", emoArr[emoCount]);
    // Providing the initial button text
    a.text(emoArr[emoCount]);

    $("#buttons-view").append(a);

    $("#searched-val").val("");

    emoCount++;

    event.preventDefault()
})

$(document).on("click", ".car-btn", function () {

    $("#gif").empty();

    var searchTerm = $(this).attr("data-name");

    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=mejJaFWSR2V2aY31O2HJaYqpl1cqLjBn&q=" + searchTerm + "&limit=15&offset=0&rating=G&lang=en";

    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function (obj) {
        console.log(obj)
        console.log(obj.data)
        if (obj.data.length === 0) {
            swal("I'm sorry, Giphy Gen couldn't find any results for " + searchTerm + ". Try a different emotion!");
            $("button[data-name='"+searchTerm+"']").remove();
        }
        else {
            //image
            for (var i = 0; i <= 10; i = i + 2) {
                $("#gif").append("<div class='row rounded gifRow'><div class='col-md-6'><img class='img-fluid pic' " +
                    "src='" + obj.data[i].images["480w_still"].url + "'" +
                    "data-still='" + obj.data[i].images["480w_still"].url + "'" +
                    "data-animate='" + obj.data[i].images.fixed_height.url + "'" +
                    "alt='Gif of " + searchTerm + "' data-state='still' style='width:300px;'><p style='padding-left:30px;'>Rated: " + obj.data[i].rating + "</p></div>" +
                    "<div class='col-md-6'><img class='img-fluid pic' " +
                    "src='" + obj.data[i + 1].images["480w_still"].url + "'" +
                    "data-still='" + obj.data[i + 1].images["480w_still"].url + "'" +
                    "data-animate='" + obj.data[i + 1].images.fixed_height.url + "'" +
                    "alt='Gif of " + searchTerm + "' data-state='still' style='width:300px;'><p style='padding-left:30px;'>Rated: " + obj.data[i + 1].rating + "</p></div></div>");
            }
        }

    })

});


$(document).on("click", ".pic", function () {
    var state = $(this).attr("data-state");

    if (state === "still") {
        $(this).attr("data-state", "animate");
        $(this).attr("src", $(this).attr("data-animate"));
    }
    else {
        $(this).attr("data-state", "still");
        $(this).attr("src", $(this).attr("data-still"));
    }

});






