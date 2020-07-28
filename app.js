//Currency Converter App


/* ********** Data ********** */

const dataControl = (() => {

    return {
        //Make API call for live exchange rates.
        getRate: async (input, output) => {
            try{
                let response = await fetch(`https://api.ratesapi.io/api/latest?base=${input}&symbols=${output}`);
                let data = await response.json();
                let rate = data.rates[output];
                return rate;
            } catch (error) {
                alert('There seems to be a problem retrieving exchange rates. Please try again.');
            }  
        },
        
        //Convert from input currency to output currency
        convertMoney: (input, rate) => {
            let output;

            //Remove commas and change from string to number for math.
            input = input.replace(/,/g, "");
            input = parseFloat(input);

            //Do the math
            output = input * rate;
            return output;
        }
    };
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
    };

   
    return {  
        //Get inputs from DOM
        getInputs: () => {
            let inputs = {
                amount: elements.inputAmount.value,
                convertFrom: elements.inputCurrency.value,
                convertTo: elements.outputCurrency.value,
                currencyName: elements.outputCurrency.options[elements.outputCurrency.selectedIndex].text
            }
            return inputs;
        },

        //Format numbers to include commas in proper place
        formatNumber: (num) => {
            let newNum = new Intl.NumberFormat().format(num);
            return newNum;
        },

        //Display results
        displayResult: (amount, currency) => {
            amount = amount.toFixed(2);
            amount = uiControl.formatNumber(amount);
            elements.output.value = `${amount} ${currency}`;
            elements.output.style.visibility = 'visible';
            return;
        },

        //Hide results on init
        hideResults: () => { 
            elements.output.style.visibility = 'hidden';
            return;
        },

        //Return elements
        getElements: () => {
            return elements;
        }
    }
})();


/* ********** Controller ********** */

const controller = ((data, ui) => {

    //Retrieve DOMstrings (elements)
    const el = ui.getElements();

    //Set up event listeners
    const eventListeners = () => {

        //Click convert button
        el.convertBtn.addEventListener('click', convert);

        //Event listener for input amount formatting
        el.inputAmount.addEventListener('keyup', formatInput);
    };
     
    //Update format of input numbers in real time. 
    const formatInput = () => {
        let input = el.inputAmount.value;
        if (input[input.length - 1] !== '.'){
            //Remove pre-existing commas
            input = input.replace(/,/g, "");
            //Format number
            let formatInput = ui.formatNumber(input);
            //Replace with formatted number
            el.inputAmount.value = formatInput;
        }
    };

    const convert = async () => {
        let result;

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
    
            //Convert money using amount and rate
            let result = data.convertMoney(inputs.amount, rate);
           
           //Display results
           ui.displayResult(result, outptuCurrencyName); 
        }
    };

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
