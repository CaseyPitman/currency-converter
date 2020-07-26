//Currency Converter App


/* ********** Data ********** */

const dataControl = (() => {


    //Retrieve current exchange rates async/await try/catch
    //     "https://api.ratesapi.io/api/latest?base=" + inputCurrency + "&symbols=" + outputCurrency"
    return {
        getRates: async (input, output) => {
            try{
                let response = await fetch(`https://api.ratesapi.io/api/latest?base=${input}&symbols=${output}`);
                
                let data = await response.json();
                // let rate = data.rates[output];

                return data;
            } catch (error) {
                alert('There seems to be a problem retrieving exchange rates. Please try again.')
            }
        }, 

        convert: () => {
             //Make the conversion
            //convert input to number

            //Return results
            return result;
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
        output: document.getElementById('output')
    }
   
    return {  
        //Get inputs
        getInputs: () => {
            let inputs = {
                amount: elements.inputAmount.value,
                convertFrom: elements.inputCurrency.value,
                convertTo: elements.outputCurrency.value
            }

            return inputs;
        },

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
    }
     

    const convert = () => {
        //Retrieve inputs
        let inputs = ui.getInputs();
        console.log(inputs);

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
            //Call for live exchange rates
            let rate = data.getRates(inputs.convertFrom, inputs.convertTo);
            
            // Send to data to convert

            // Display results
        }




        //Retrieve current exchange rates
        
        //Convert the input to the desired currency 
        
        //Display the results
    };



    //return init function
    return {
        init: () => {
            //Set up event listeners
            eventListeners();

            //Hide results
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