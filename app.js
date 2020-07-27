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
            
            input = parseFloat(input);
            //Do the math
            output = input * rate;
            output = output.toFixed(2);
            console.log('output from calculator', output)
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

        formatNumber: (num) => {
            let numSplit, int, dec, newNum;
            console.log('num', num);
            numSplit = num.split('.');
            console.log('here', numSplit)
            int = numSplit[0];
            dec = numSplit[1];

            //Format numbers to include commas where appropriate - top out at billions in this case. 
            if (int.length > 9){ 

                int = `${int.substr(0, int.length - 9)},${int.substr(int.length - 9, 3)},${int.substr(int.length - 6, 3)},${int.substr(int.length - 3, 3)}`;
            }

            newNum = int + '.' + dec;
            return newNum;
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
    };
     

    const convert = async () => {
        //Retrieve inputs
        let inputs = ui.getInputs();
        console.log(inputs.amount)
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
          //Format result number
            let formatResult = ui.formatNumber(resultAmount);
            console.log('Test', formatResult)
           //Display results
           ui.displayResult(formatResult, outptuCurrencyName); 
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

