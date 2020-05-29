//Call for currency types

let typeEndpoint ="list";
let liveEndpoint="live";
let accessKey="a18afaa369c7dccb20013b484bf05bd3";
let inputAmount=0;
let inputType="" //may not need - set to default USD
let outputType="";
let outputAmount=0;

//Call for list of available currencies.
$(document).ready(function(){
    $.ajax({
        url:"http://api.currencyLayer.com/" + typeEndpoint + "?access_key=" + accessKey,
        dataType:"jsonp",
        success: function(json){
            for (let property in json.currencies){
                let optionVal = property; //sets the value for the option
                let optionDis = json.currencies[property]; //sets display text for the option
                let node = document.createElement("option"); //create new option
                node.setAttribute("value", optionVal); //sets the value assigned to the option
                let textnode=document.createTextNode(optionDis);//sets display text for the option
                node.appendChild(textnode); //attach text to the option
                document.getElementById("output-type").appendChild(node); //attaches to the DOM (input selector)
            }
        }
    })
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
    //make the ajax call
    $.ajax({
        url: 'http://api.currencylayer.com/'+ liveEndpoint + "?access_key=" + accessKey +"&currencies="+outputType + "&format=1",
        dataType:'jsonp',
        success: function(json){
        let conversionVal = (json.quotes["USD"+outputType]); //determine the relative value of the currency to the US dollar
        let resultVal = inputAmount * conversionVal;
        $("#output-amount").val(resultVal);
        }
    })
}

$("#convert-btn").on("click", convert);