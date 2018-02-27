
var carArr = ["Corvette", "Mustang", "Chevrolet Camaro", "Dodge Charger", "Shelby Cobra"];

var carCount = 0;

for (var i = 0; i < carArr.length; i++) {
    var a = $("<button>");
    // Adding a class of car-btn to our button
    a.addClass("car-btn");
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

    var a = $("<button>");
    // Adding a class of car-btn to our button
    a.addClass("car-btn");
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

    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=mejJaFWSR2V2aY31O2HJaYqpl1cqLjBn&q=" + searchTerm + "&limit=15&offset=0&rating=G&lang=en"

    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function (obj) {
        console.log(obj)
        //image
        for (var i = 0; i <= 15; i++) {
            $("#gif").append("<img class='pic' " +
                "src='" + obj.data[i].images["480w_still"].url + "'" +
                "data-still='" + obj.data[i].images["480w_still"].url + "'" +
                "data-animate='" + obj.data[i].images.fixed_height.url + "'" +
                "alt='Gif of " + searchTerm + "' data-state='still' style='width:300px;'>")
            $("#gif").append(obj.data[i].rating)
        }


    })

});


$(document).on("click", ".pic", function () {
    var state = $(this).attr("data-state")

    if (state === "still") {
        $(this).attr("data-state", "animate");
        $(this).attr("src", $(this).attr("data-animate"));
    }
    else {
        $(this).attr("data-state", "still");
        $(this).attr("src", $(this).attr("data-still"));
    }

});






