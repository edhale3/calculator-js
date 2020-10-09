//Use query selector to find classes in the HTML
const calculator = document.querySelector('.calculator'); 
const keys = calculator.querySelector('.calc_keys');
const display = document.querySelector('.calc_display')
const key_clear = document.querySelector('.key_clear')

//Add Event Listener for all buttons with class .calc_keys
keys.addEventListener('click', event => {
    if(event.target.matches('button')){
        const key = event.target;
        const action = key.dataset.action;
        const keyContent = key.textContent;
        const displayedNum = display.textContent;
        const previousKeyType = calculator.dataset.previousKeyType;

        //Calculate function
        const calculate = (prev,op,curr) => {
            console.log(prev, op, curr)
            
            //If operator is ___ then do ___. parseFloat used to change types from strings to numbers.
            if(op === 'add'){
                return parseFloat(prev) + parseFloat(curr);
            } else if (op === 'subtract'){
                return parseFloat(prev) - parseFloat(curr);
            } else if (op === 'multiply'){
                return parseFloat(prev) * parseFloat(curr);
            } else {
                if(curr != '0'){
                    return parseFloat(prev)/parseFloat(curr)
                //If someone tries to divide by zero return comment
                } else { 
                    return "Bad MATH"
                }
            }
        }

        //Function to clear the depression of buttons
        const clearOpFunc = () => {Array.from(key.parentNode.children).forEach(
            k => k.classList.remove('is_depressed'))
        }

        //What to do if one of the operator keys is pressed
        if (action === 'add' || 
            action === 'subtract' || 
            action === 'multiply' || 
            action === 'divide'){
            const previousKeyValue = calculator.dataset.previousKeyValue
            const operator =calculator.dataset.operator
            const currentValue = displayedNum;
            
            //Change key clear key from All Clear "AC" to Clear Entry "CE"
            key_clear.textContent = "CE"
            
            //If the operator key is pressed add class to show button depressed
            if(calculator.dataset.previousKeyType === 'operator'){
                clearOpFunc();
                key.classList.add('is_depressed')
            }

            //If a number is pressed, an operator, and another operator run the calculate function prior to running the next equation
            if(previousKeyValue && operator && previousKeyType !== 'operator' && previousKeyType !== 'calculate'){
                const calcValue = calculate(previousKeyValue, operator, currentValue)
                display.textContent = calcValue
                calculator.dataset.previousKeyValue =calcValue;
                console.log(calculator.dataset.previousKeyValue)
            }else {
                calculator.dataset.previousKeyValue = displayedNum
            }

            //Add depression to operator key
            key.classList.add('is_depressed')
            //Make sure that the previous key type is set as operator 
            calculator.dataset.previousKeyType = 'operator';
            //Set the operator to be the action selected
            calculator.dataset.operator = action;
        }

        //If the key pressed is a number, enter block
        if(!action){
            //If 0 is on display, an operator key has already been pressed, or 
            //calculate has already been pressed...make the next number pressed display in the display
            if (displayedNum === '0' || previousKeyType === 'operator' || previousKeyType === 'calculate'){
                display.textContent = keyContent;
            //Else append pressed number to displayed number
            } else {
                display.textContent = display.textContent + keyContent;
            }
            //Make previous key type number
            calculator.dataset.previousKeyType = 'number';
            //Change clear button from AC to CE
            key_clear.textContent = "CE"
            //Clear the depression class when number is pressed
            clearOpFunc();
        }

        //If decimal is pressed do this
        if (action === 'decimal'){

            //If the last previous key type was the calculate button then start new calculation with 0. 
            if (calculator.dataset.previousKeyType === 'calculate'){
                display.textContent = '0.'
                calculator.dataset.previousKeyValue = 0;
                calculator.dataset.currentValue = 0
            } 

            //If the last previous key type was an operator button the next number in the calculation needs to be started with a decimal
            if (calculator.dataset.previousKeyType === 'operator'){
                display.textContent = "0."
            }

            //If the decimal key hasn't been pressed yet and the previous key type was a number then append decimal to number
            if(!displayedNum.includes('.') && calculator.dataset.previousKeyType === 'number'){
                display.textContent = display.textContent + '.';
            }
            
            //Make the previous key type decimal
            calculator.dataset.previousKeyType = 'decimal'
            //Clear depression class from operator keys
            clearOpFunc();
        }

        //If clear operator is pressed do this...
        if (action === 'clear'){
            //Clear depression class
            clearOpFunc();

            //AC is shown for the clear key, clear all values and types
            if (key_clear.textContent === "AC"){
                calculator.dataset.previousKeyValue = 0
                calculator.dataset.operator = ''
                calculator.dataset.currentValue = 0;
                display.textContent = 0

            //If CE is shown for the clear key, just clear the display and set current value to 0
            } else {
                display.textContent = 0
                calculator.dataset.currentValue = 0
                //After CE key is pressed change the clear key to AC
                key_clear.textContent = "AC"
            }

            //Set previous key type to clear
            calculator.dataset.previousKeyType = 'clear'

        }

        //If calculate button is pressed then do this...
        if (action === 'calculate'){
            const previousKeyValue = calculator.dataset.previousKeyValue;
            const operator = calculator.dataset.operator
            var currentValue = displayedNum;
            console.log(previousKeyValue,operator, typeof(currentValue))
            
            //If there is a previous key value/number then do this... 
            if (previousKeyValue){
                //If the previous key type was calculate set previous key value to the number that is displayed 
                if(previousKeyType === 'calculate'){
                    previousKeyValue === displayedNum;
                    currentValue = calculator.dataset.modValue
                }
                //Run calculation and set display to the answer
                display.textContent = calculate(previousKeyValue, operator, currentValue)
                console.log(display.textContent)
            }

            
            calculator.dataset.modValue = currentValue;
            //Set previous key type to calculate
            calculator.dataset.previousKeyType = 'calculate';
            //Set the displayed value to previous key value
            if(display.textContent === "Bad MATH"){
                calculator.dataset.previousKeyValue = 0
                calculator.dataset.operator = ''
                calculator.dataset.currentValue = 0;
            } else {
                calculator.dataset.previousKeyValue = display.textContent;
            }
            console.log(previousKeyValue)
            console.log(currentValue)
            //Clear the depression class
            clearOpFunc();
        }
    }
})

