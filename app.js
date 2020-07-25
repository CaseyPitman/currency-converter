//Currency Converter App


/* ********** Data ********** */

const dataControl = (() => {


    //Retrieve current exchange rates async/await try/catch
    //     "https://api.ratesapi.io/api/latest?base=" + inputCurrency + "&symbols=" + outputCurrency

    //Make the conversion

    //Return results

})();

/* ********** UI ********** */

const uiControl = (() => {
    //DOMstrings
    const elements = {
        inputAmount: document.getElementById('input-amount'),
        inputCurrency: document.getElementById('input-currency'),
        outputCurrency: document.getElementById('output-currency'),
        convertBtn: document.getElementById('convert-btn'),
        output: document.getElementById('output')
    }

    return {  
        //Get inputs


        //Display results


        //Hide results


        //Return Elements
        getElements: () => {
            return elements;
        }

    }
    

})();


/* ********** Controller ********** */

const controller = ((data, ui) => {

    // Get DOMstrings
    const el = ui.getElements();
    console.log(el);


    //Set up event listeners


    //Retrieve inputs


    //Retrieve current exchange rates


    //Convert the input to the desired currency


    //Display the results


    //return init function
        //Hide results


})(dataControl, uiControl);

/* Initialize App */

//init();

/* 
************************TESTING AREA***********************
 */



/*
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

}); */