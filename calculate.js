
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

// Calculate operation
export function calCulate() {
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


// Defining getState function
 export function getState(){
   return state;
}

// Defining updateState 
export function updateState(key, value){
    state = {...state,  [key]:value}
}



//reset all operation
export const reset = () => {
    state = {
        firstNum: "",
        secondNum: "",
        operator: "",
        result: "",
        sum: "",
        firstOp: "",
        currentOp: "",
        resultUsed: false,
        history: [...getState().history],
        numDisplay:false
    }
}

