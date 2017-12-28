
function QuoteMachine(){
  this.currentQuote = "";
  this.quoteP = $("#quote-text").clone();
  var currentColorInd = 0;
  var colors = ["bgA","bgB","bgC","bgD","bgE"];
  var swapColor = function(oldClass, newClass,targetString){
    $(targetString).removeClass(oldClass).addClass(newClass);

  }

  this.getQuote = function(){
    $.getJSON("https://talaikis.com/api/quotes/random/",(data)=>{
      var quote = data.quote;
      var author = data.author;
      var newQuoteP = this.quoteP.clone();
      var oldQuoteP = $("#quote-text");
      oldQuoteP.animate({marginTop : ($(oldQuoteP).outerHeight() *-1-10) + "px"},500,()=>{
        $(oldQuoteP).remove();
      })
      $(".overlay").first().append(newQuoteP);
      $(newQuoteP).children("#quote-target").html(quote);
      $(newQuoteP).children("#author-target").html("- " + author);
      $("#quote-div, .overlay:first").css({height:$(oldQuoteP).outerHeight() + "px"});
      $("#quote-div, .overlay:first").animate({height:$(newQuoteP).outerHeight() + "px"},500);
      swapColor(colors[currentColorInd],colors[(currentColorInd<colors.length-1)?currentColorInd+1:0],".overlay:first");
      (currentColorInd<colors.length-1)?currentColorInd++:currentColorInd=0;
      this.currentQuote = quote;
    })
  }
}

$(document).ready(function(){
  var quoteMachine = new QuoteMachine();
  $("#new-quote").click((e)=>{
    quoteMachine.getQuote();
  }) 
})