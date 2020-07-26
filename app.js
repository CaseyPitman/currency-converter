//Currency Converter App


/* ********** Data ********** */

const dataControl = (() => {

    return {

        getRate: async (input, output) => {
            try{
                let response = await fetch(`https://api.ratesapi.io/api/latest?base=${input}&symbols=${output}`);
                
                let data = await response.json();
                let rate = data.rates[output];
               // console.log(rate);
                return rate;
            } catch (error) {
                alert('There seems to be a problem retrieving exchange rates. Please try again.')
            }
            return result;
        },
        
        convertMoney: (input, rate) => {
            let output;
            input = parseInt(input);
            //Do the math
            output = Math.round(input * rate * 100)/100;
            return output;
        }
    }
})();

/* ********** UI ********** */

const uiControl = (() => {
    //DOMstrings
    const elements = {
        inputAmount: document.getElementById('input-amount'),
        inputCurrency: document.getElementById('input-currency'),
        outputCurrency: document.getElementById('output-currency'),
        convertBtn: document.getElementById('convert-btn'),
        output: document.getElementById('output'),
    }

   
    return {  
        //Get inputs
        getInputs: () => {
            let inputs = {
                amount: elements.inputAmount.value,
                convertFrom: elements.inputCurrency.value,
                convertTo: elements.outputCurrency.value,
                currencyName: elements.outputCurrency.options[elements.outputCurrency.selectedIndex].text
            }

            return inputs;
        },

        //Display results
        displayResult: (amount, currency) => {
            elements.output.value = `${amount} ${currency}`;
            elements.output.style.visibility = 'visible';
            return;
        },

        //Hide results
        hideResults: () => { 
            elements.output.style.visibility = 'hidden';
            return;
        },


        //Return Elements
        getElements: () => {
            return elements;
        }

    }
    

})();


/* ********** Controller ********** */

const controller = ((data, ui) => {

    
    //Set up event listeners
    const eventListeners = () => {
        // Get DOMstrings
        const el = ui.getElements();
        // console.log(el);
        //Click button
        el.convertBtn.addEventListener('click', convert);

        // el.convertBtn.addEventListener('keypress', (event) => {
        //     if (event.keyCode === 13 || event.which === 13){
        //         console.log('key');
        //         convert();
        //     }
        // })
    };
     

    const convert = async () => {
        //Retrieve inputs
        let inputs = ui.getInputs();
        let outptuCurrencyName = inputs.currencyName;

        if (inputs.amount === ""){  //Amount left blank
            alert('Please enter an amount to convert.');
            return;
        } else if (inputs.convertFrom === "selected"){  //Convert from left blank
            alert ('Please the type of currency you wish to convert.');
            return;
        } else if (inputs.convertTo === "selected"){ //Convert to left blank
            alert ('Please enter they type of currency you wish to convert to.');
            return;
        } else {
           //Get current rates
            let rate = await data.getRate(inputs.convertFrom, inputs.convertTo);
            //console.log('rate', rate);
           //Convert money using amount and rate
           let resultAmount = data.convertMoney(inputs.amount, rate);
          // console.log(resultAmount);

           //Display results
           ui.displayResult(resultAmount, outptuCurrencyName); 
        }
        
     

    };



    //return init function
    return {
        init: () => {
            //Set up event listeners
            eventListeners();

            //Hide results
            ui.hideResults();
        }


    }
        

})(dataControl, uiControl);

/* Initialize App */

controller.init();

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