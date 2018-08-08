//Initial movie buttons
var MovieGif = {
    btnArray : ["princess bride", "gladiator", "kingsmen", "wolf of wallstreet", "deadpool"],
    selected : "",
    popBtns : function() {
        $('#buttons-area').empty();
        for(var i=0; i< this.btnArray.length;i++){
        var newBtn = $('<button>');
        newBtn.attr('type','button')
        .attr('class','btn btn-info text-capitalize m-1')
        .attr('data-value', this.btnArray[i])
        .text(this.btnArray[i]);
        $('#buttons-area').append(newBtn);
            }},
        };

MovieGif.popBtns();

//display gifs on button click
$('#buttons-area').on('click', '.btn', function(){
    $('#images-area').empty();
    // console.log($(this).attr('data-value'));
    var selected = $(this).attr('data-value')

 //URL to get GIFs   
$.ajax({
    url: "https://api.giphy.com/v1/gifs/search?api_key=iiSvA3Jf2Uwi2AvE36ypagPMCAQWWu9N&q="+ selected +"&limit=10&offset=0&lang=en",
    method: "GET",
    
    //Display gifs
}).then(function (response) {
    // console.log(response);
    for (var i = 0; i < response.data.length; i++) {
        var newCard = $('<div>');
        newCard.attr('class', 'card')
        .attr('style','float:left; width: 18rem;');

        var cardImg = $('<img>');
        cardImg.attr('class','gif')
        .attr('src', response.data[i].images.original_still.url)
        .attr('alt', response.data[i].title)
        .attr('data-state','still')
        .attr('data-still', response.data[i].images.original_still.url)
        .attr('data-animate', response.data[i].images.original.url)
        .attr('style','height:200px');

        var cardBody= $('<div>');
        cardBody.attr('class', 'card-body')
        .attr('style', 'height:100px');

        var ratingDiv = $('<h5>');
        var rating = response.data[i].rating;
        ratingDiv.attr('class','card-title')
        .attr('id','rating')
        .attr('class', 'text-capitalize')
        .text('Rating: ' + rating);
        
        
        newCard.append(cardImg,cardBody);
        cardBody.append(ratingDiv);

        $("#images-area").append(newCard);
    }
})
});

//play gifs when you click the images
$("#images-area").on("click", '.gif' , function() {
      var state = $(this).attr("data-state");
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
    });
//add movie to list
$('#addMovie').on('click', function(){
    var newShow = $('#input-movie').val().trim().toLowerCase()
    MovieGif.btnArray.push(newShow);
    MovieGif.popBtns();
})