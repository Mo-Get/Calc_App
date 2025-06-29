// DOM Section
const numBtn = document.querySelectorAll(".numBtn");
const display = document.getElementById("disText");
const equalTo = document.querySelector(".equalTo");

// Assign inital values using destructuring
let state = {
    firstNum: "",
    secondNum: "",
    operator: "",
    firstOp: "",
    currentOp: "",
    result: "",
    sum: "",
    resultUsed: false,
    history: [],
    numDisplay:false
};

// Display 0 in startup 
let initDisplay = "0";
display.textContent = initDisplay;

// When the number Buttons are used
numBtn.forEach(button => {

    button.addEventListener("click", () => {

        const { firstNum, secondNum, operator, sum } = state;

        // For the very first flow of calculation
        if (operator === "") {
            state = { ...state, firstNum: firstNum + button.textContent};

            state={...state, currentOp:`${state.firstNum}`}
        }

        else if (sum !== "") { 
            reset();
            state = { ...state, firstNum: state.firstNum + button.textContent, };

            state={...state, currentOp:`${state.firstNum}`}
        }  

        //FirstNum is already defined
        else {
            state = { ...state, secondNum: secondNum + button.textContent, };

            state = {
                ...state, currentOp: `${state.firstOp}${state.secondNum}`
            };

            calCulate();

        }
        
        state={...state, numDisplay:true};
        displayValues();
    })

})

// When the operation buttons are used
const opBtn = document.querySelectorAll(".opBtn")

opBtn.forEach(button => {
    button.addEventListener("click", () => {

        const { firstNum, secondNum, sum, currentOp, result, resultUsed } = state;

        // For the very first operation flow only, secondNum not defined
        if (firstNum !== "" && secondNum === "" && resultUsed === false) {
            state = {
                ...state, operator: button.textContent
            };
            state={...state, firstOp: `${firstNum}${state.operator}`}
            
        }

        //operation button is clicked more than one time and operation is being used for more than two numbers
        else if (firstNum !== "" && secondNum === "" && resultUsed === true) {
            state = {
                ...state, operator: button.textContent,
                }
            state={...state, firstOp: `${currentOp}${state.operator}`
            }

        }

        // if  both firstNum and SecondNum is already used
        else if (firstNum !== "" && secondNum !== "" && sum === "") {
            state = {
                ...state, operator: button.textContent,
                firstNum: result,
                secondNum: ""
            };
            state={...state, firstOp: `${currentOp}${state.operator}`}
        }

        // if sum "=" button is already used
        else if (firstNum !== "" && sum !== "") {
            state = {
                ...state, operator: button.textContent,
                firstOp: `${firstNum}${button.textContent}`,
                sum: "",//prevent the loop from iterating on this scope only
                secondNum: "",
                resultUsed: false  // when op btn is clicked more than once
            };

        }

        
        displayValues();
    
    })
})

//display the values
function displayValues(){
const {firstNum, sum, secondNum, operator, numDisplay}=state;
//clear button is used
   if (firstNum===""){ 
    display.textContent = "0";
   }
// display result
   else if(sum!==""){
    display.textContent=`=${firstNum}` ;
   }
// only firstnum is used for result
   else if (firstNum !== "" && sum!=="" && secondNum === "") {
    display.textContent=`=${firstNum}`;
    console.log("test")
    }

//display number Buttons
  else if (numDisplay){
    display.textContent=state.currentOp;
   }

//display operation Buttons
   else if (!numDisplay){
    display.textContent=state.firstOp;
   }

   state={...state, numDisplay:false};
}



//reset all operation
const reset = () => {
    state = {
        firstNum: "",
        secondNum: "",
        operator: "",
        result: "",
        sum: "",
        firstOp: "",
        currentOp: "",
        resultUsed: false,
        history: [...state.history]
    }
    displayValues();
}


// When the equalTo is being used
equalTo.addEventListener("click", () => {
    const { firstNum, secondNum, operator, currentOp, result } = state;

    if (firstNum !== "" && operator !== "" && secondNum !== "") {
        state = {
            ...state,
            firstNum: result,
            sum: equalTo.textContent,
            history: [...state.history, { expr: `${currentOp}`, result }]
        }
    }
    // Only firstNum is defined
    else if (firstNum !== "" && secondNum === "") {
        state = { ...state, sum: equalTo.textContent, }
    }

    // display the result
    displayValues();
})




function calCulate() {
    const { firstNum, secondNum, operator } = state;
    // Change the string to Number
    let num1 = Number(firstNum);
    let num2 = Number(secondNum);

    // do the Calc using the operation 

    if (firstNum !== "" && operator === "+" && secondNum !== "") {
        state = { ...state, result: num1 + num2 }

    }

    else if (firstNum !== "" && operator === "x" && secondNum !== "") {
        state = { ...state, result: num1 * num2 }
    }

    else if (firstNum !== "" && operator === "/" && secondNum === "0") {
        state = { ...state, result: "Invalid" }
    }

    else if (firstNum !== "" && operator === "/" && secondNum !== "") {
        state = { ...state, result: num1 / num2 }
    }

    else if (firstNum !== "" && operator === "-" && secondNum !== "") {
        state = { ...state, result: num1 - num2 }
    }

    state.resultUsed = true;

}


// To clear the inputs and result
const Clear = document.querySelector(".clear")

Clear.addEventListener("click", () => {
    reset();
})


// Display History

const historyBtn = document.querySelector(".historyBtn");
const historyDisplay = document.querySelector(".historyDisplay");

historyBtn.addEventListener("click", () => {

    historyDisplay.innerHTML = state.history.map((item) => `<div>${item.expr}=${item.result}</div>`).join("");

})


//Clear the inputs one at a time
function clearBack() {
    let myArray;
    const { firstNum, secondNum, operator } = state;

    if (firstNum !== "" && operator === "" && secondNum === "") {
        myArray = firstNum.slice(0, -1)
        state = { ...state, firstNum: myArray }
    }
    else if (firstNum !== "" && operator !== "" && secondNum === "") {
        myArray = operator.slice(0, -1)
        state = { ...state, operator: myArray }
    }
    else if (firstNum !== "" && operator !== "" && secondNum !== "") {
        myArray = secondNum.slice(0, -1);
        state = { ...state, secondNum: myArray };
    }
    
    console.log(state);
}

const backBtn = document.querySelector(".back");

backBtn.addEventListener("click", () => {

    clearBack();
    calCulate();
    displayValues();
})




// To do: the number of digits
// more than two number operations  **Done**
// Clear or C **Done**
// clear one number at a time
// when 0 is used in division **Done**
// continue the operation using the result as an input **Done**
//using decimal fraction
// Operation follow the Math rule
// Up on equalTo clicked, only show the result and the next operations **Done**
//num Btn is used up on result displayed **Done**
// Add clear history
//Btn input from keyboard






