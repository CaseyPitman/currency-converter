//Currency Converter App








/* $(document).ready(function(){

    //Converts from one currency to another
    function convert(){
        let inputCurrency=$("#input-currency").val(); 
        let outputCurrency=$("#output-currency").val();
        let inputAmount=$("#input-amount").val();
        let outputText=$("#output-currency option:selected").text();
        //Call for current exchange rates
        $.getJSON("https://api.ratesapi.io/api/latest?base=" + inputCurrency + "&symbols=" + outputCurrency, function(data){
            if (inputCurrency===""){ //User doesn't choose input currency
                alert("Please choose the type of currency you wish to convert from.");
            }
            if(inputAmount===""){ //User doesn't input an amount
                alert("Plese enter an amount to convert.");
            }
            if(outputCurrency===""){ //User doesn't choose ouput currency
                alert("Please enter the type of currency you with to convert to.");
            }
            //Does the math for the conversion. 
            let results= (inputAmount * data.rates[outputCurrency]).toFixed(2);
            //Displays the result
            $("#output-amount").val(results + " " + outputText);       
        })
    }
    //Activates the conversion
    $("#convert-btn").on("click", convert);
}); */