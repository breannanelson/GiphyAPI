
var carArr = ["Corvette", "Mustang", "Chevrolet Camaro", "Dodge Charger", "Shelby Cobra"];

var btnCount = 0;

while (btnCount < carArr.length) {
    $("#buttons").append("<button id='btn-" + (i + 1) + "' >" + carArr[btnCount] + "</button>");
    btnCount++;
}

$("#search-btn").on("click", function () {

    var searchTerm = $("#searched-val").val();
    carArr.push(searchTerm);
    console.log(carArr)

    $("#buttons").append("<button id='btn-" + (btnCount + 1) + "' >" + searchTerm + "</button>");

    $("#searched-val").val("");
    event.preventDefault()
    btnCount++;                 
})

for(var i = 0; i < carArr.length; i++){
    $("#btn-" + i).on("click", function () {
        // Here we construct our URL
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=mejJaFWSR2V2aY31O2HJaYqpl1cqLjBn&q=" + searchTerm + "&limit=15&offset=0&rating=G&lang=en"
    
        $.ajax({
            url: queryURL,
            method: "GET",
        }).then(function (obj) {
            console.log(obj)
            //image
            for (var i = 0; i <= 15; i++) {
                $("#gif").append("<img src='obj.data[i].images['480w_still'].url'>")
            }
    
    
            //rating
        })

})
}
// $(this).
