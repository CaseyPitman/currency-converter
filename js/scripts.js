//Call for currency types

let inputAmount=0;
let inputType="" //may not need - set to default USD
let outputType="";
let outputAmount=0;

//Call for list of available currencies.
$(document).ready(function(){
    $.get('https://openexchangerates.org/api/currencies.json', function(data) {
        //console.log(data);
        for (let property in data){
            //console.log(data[property]);
            let optionVal = property; //sets the value for the option
            let optionDis = data[property]; //sets display text for the option
            let node = document.createElement("option"); //create new option
            node.setAttribute("value", optionVal); //sets the value assigned to the option
            let textnode=document.createTextNode(optionDis);//sets display text for the option
            node.appendChild(textnode); //attach text to the option
            document.getElementById("output-type").appendChild(node); //attaches to the DOM (input selector)
        }
    });
});


function convert(){
    inputAmount=$("#input-amount").val();
    if (inputAmount===""){   //ensures an amount is entered
        alert("Please enter a dollar amount.")
    }
    outputType = $("#output-type").val()
    if (outputType===""){
        alert("Please select a type of currency for your conversion.")
    }

    $.get('https://openexchangerates.org/api/latest.json', {app_id: '6088cc29466f4a299e2690ae0e2f9f9e'}, function(data) {
        let conversionVal = (data.rates[outputType]); //determine the relative value of the currency to the US dollar
        let resultVal = (inputAmount * conversionVal).toFixed(2); //Do the conversion
        $("#output-amount").val(resultVal); // Display result
    });
}

$("#convert-btn").on("click", convert);