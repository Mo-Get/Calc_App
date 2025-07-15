// DOM Selection
const numBtn = document.querySelectorAll(".numBtn");
const display = document.getElementById("disText");
const equalTo = document.querySelector(".equalTo");

// Modules
import {calCulate, reset, getState, updateState} from "./calculate.js";


// Display 0 in startup 
let initDisplay = "0";
display.textContent = initDisplay;

// When the number Buttons are used
numBtn.forEach(button => {

    button.addEventListener("click", () => {

        const { firstNum, secondNum, operator, sum, firstOp } = getState();

        // For the very first flow of calculation
        if (operator === "" && sum ==="") {

            updateState("firstNum", firstNum+button.textContent);
            updateState("currentOp", firstNum+button.textContent)

        }

        else if (sum !== "") { 
            reset();
            updateState("firstNum", button.textContent);
            updateState("currentOp", button.textContent)
        }  

        //FirstNum is already defined
        else {

            updateState("secondNum", secondNum+button.textContent);
            updateState("currentOp", `${firstOp}${secondNum+button.textContent}`);

            calCulate();

        }

        updateState("numDisplay", true);
        displayValues();
    })

})

// When the operation buttons are used
const opBtn = document.querySelectorAll(".opBtn")

opBtn.forEach(button => {
    button.addEventListener("click", () => {

        const { firstNum, secondNum, sum, currentOp, result, resultUsed } = getState();

        // For the very first operation flow only, secondNum not defined
    if (firstNum !== "" && secondNum === "" && resultUsed === false && sum ==="") {
            updateState("operator", button.textContent);
            updateState("firstOp", `${firstNum}${button.textContent}`);
        }

        //operation button is clicked more than one time and operation is being used for more than two numbers
    else if (firstNum !== "" && secondNum === "" && resultUsed === true && sum ==="") {
        updateState("operator", button.textContent);
        updateState("firstOp", `${currentOp}${button.textContent}`)
        }

        // if  both firstNum and SecondNum is already used
        else if (firstNum !== "" && secondNum !== "" && sum === "") {
        updateState("operator", button.textContent);
        updateState("firstNum", result);
        updateState("secondNum", "");
        updateState("firstOp", `${currentOp}${button.textContent}`)
        }

        // if sum "=" button is already used
        else if (firstNum !== "" && sum === "=") {
            updateState("operator", button.textContent);
            updateState("firstOp", `${result}${button.textContent}`);
            updateState("sum","");//prevent the loop from iterating on this scope only
            updateState("secondNum", "");
            updateState("resultUsed", false );// when op btn is clicked more than once
            };

        updateState("numDisplay", false);
        displayValues();
    
})
})

//display the values
function displayValues(){
const {firstNum, sum, secondNum, result, currentOp, firstOp, numDisplay}=getState();

//clear button is used
   if (firstNum===""){ 
    display.textContent = "0";
   }

// display result
   else if(firstNum !== ""  && sum==="=" && secondNum !== ""){
    display.textContent=`=${result}` ;
   }

// only firstnum is used for result
   else if (firstNum !== ""  && sum==="=" && secondNum === "") {
    display.textContent=`=${firstNum}`;
    }

//display number Buttons
  else if (numDisplay){
    display.textContent=currentOp;
    
   }

//display operation Buttons
   else if (!numDisplay){
    display.textContent=firstOp;
   }


}




// When the equalTo is being used
equalTo.addEventListener("click", () => {
    const { firstNum, secondNum, currentOp, sum, result } = getState();

    if (firstNum !== "" && secondNum !== "" && sum==="") {

        updateState("firstNum", result);
        updateState("sum", equalTo.textContent);
        updateState("history", [...getState().history, {expr:currentOp, result}] );
    }
    
    // Only firstNum is defined
    else if (firstNum !== "" && secondNum === "") {
        updateState("sum", equalTo.textContent);
        updateState("result", firstNum);
    }

   displayValues();

    })


// To clear the inputs and result
const Clear = document.querySelector(".clear")

Clear.addEventListener("click", () => {
    reset();
    displayValues();
})


// Display History
const historyBtn = document.querySelector(".historyBtn");
const historyDisplay = document.querySelector(".historyDisplay");

historyBtn.addEventListener("click", () => {

    const {history}=getState();
    historyDisplay.innerHTML = history.map((item) => `<div>${item.expr}=${item.result}</div>`).join("");

})
 


/* 
//Clear the inputs one at a time
 function clearBack() {
    
    const { firstNum, secondNum, currentOp, firstOp, numDisplay } = getState();
 if ( numDisplay) {
        const newSecondNum = secondNum.slice(0, -1);

            updateState("secondNum", newSecondNum)
            updateState("currentOp",`${firstOp}${getState().secondNum}` );
            updateState("numDisplay", true);
            console.log(getState());
    }
     
    // to clear Operator
    else if (!numDisplay) {
        updateState("operator", "");
        updateState("firstOp", firstNum);
        updateState("currentOp",`${getState().firstOp}` )
        console.log(getState());
    }

    // to clear the firstNum
    else if (firstNum !== "") {
        const newFirstNum = firstNum.slice(0, -1)
        updateState("firstNum", newFirstNum);
        updateState("currentOp", getState().firstNum);
        console.log(getState())
        updateState("numDisplay", true);
    }
    
}

const backBtn = document.querySelector(".back");

backBtn.addEventListener("click", () => {

    clearBack();
    calCulate();
    displayValues();
}) */

 


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






