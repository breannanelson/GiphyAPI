// Giphy Express

var carArr = ["Happy", "Love", "Suprised", "Confused", "Amused", "Frustration", "Sad", "Disappointed", "Exhausted", "Fear"];

var carCount = 0;

for (var i = 0; i < carArr.length; i++) {
    var a = $("<button class='car-btn btn btn-outline-secondary'>");
    // Adding a class of car-btn to our button
    // Adding a data-attribute
    a.attr("data-name", carArr[i]);
    // Providing the initial button text
    a.text(carArr[i]);

    $("#buttons-view").append(a);
    carCount++;
}


$("#search-btn").on("click", function () {

    var searchTerm = $("#searched-val").val();
    carArr.push(searchTerm);

    var a = $("<button class='car-btn btn btn-outline-secondary'>");
    // Adding a class of car-btn to our button
    // Adding a data-attribute
    a.attr("data-name", carArr[carCount]);
    // Providing the initial button text
    a.text(carArr[carCount]);

    $("#buttons-view").append(a);

    $("#searched-val").val("");

    carCount++;

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
        //image
        for (var i = 0; i <= 10; i=i+2) {
            $("#gif").append("<div class='row rounded gifRow'><div class='col-md-6'><img class='img-fluid pic' " +
                "src='" + obj.data[i].images["480w_still"].url + "'" +
                "data-still='" + obj.data[i].images["480w_still"].url + "'" +
                "data-animate='" + obj.data[i].images.fixed_height.url + "'" +
                "alt='Gif of " + searchTerm + "' data-state='still' style='width:300px;'><p>Rated: " + obj.data[i].rating + "</p></div>"+
                "<div class='col-md-6'><img class='img-fluid pic' " +
                "src='" + obj.data[i+1].images["480w_still"].url + "'" +
                "data-still='" + obj.data[i+1].images["480w_still"].url + "'" +
                "data-animate='" + obj.data[i+1].images.fixed_height.url + "'" +
                "alt='Gif of " + searchTerm + "' data-state='still' style='width:300px;'><p>Rated: " + obj.data[i+1].rating + "</p></div></div>");
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






