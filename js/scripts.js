
$(document).ready(function(){

    function convert(){
        let inputCurrency=$("#input-currency").val();
        let outputCurrency=$("#output-currency").val();
        let inputAmount=$("#input-amount").val();
        let outputText=$("#output-currency option:selected").text();

        $.getJSON("https://api.ratesapi.io/api/latest?base=" + inputCurrency + "&symbols=" + outputCurrency, function(data){
            if (inputCurrency===""){
                alert("Please choose the type of currency you wish to convert from.");
            }
            if(inputAmount===""){
                alert("Plese enter an amount to convert.");
            }
            if(outputCurrency===""){
                alert("Please enter the type of currency you with to convert to.");
            }
            let results= (inputAmount * data.rates[outputCurrency]).toFixed(2);
            console.log(results + " " + outputText);
            $("#output-amount").val(results + " " + outputText);       
        })
    }
    $("#convert-btn").on("click", convert);
});