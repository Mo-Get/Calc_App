// DOM Section
const numBtn=document.querySelectorAll(".numBtn");
const display=document.getElementById("disText");
const equalTo=document.querySelector(".equalTo");

// Assign inital values using destructuring
let state={ 
    firstNum:"",
    secondNum:"",
    operator:"",
    firstOp:"",
    currentOp:"",
    result:"",
    sum:"",
    
};
 
 // Display 0 in startup 
 let initDisplay="0";
 display.textContent=initDisplay;

 // When the number Buttons are used
 numBtn.forEach(button => {

    button.addEventListener("click", ()=> {   

        const {firstNum, secondNum, operator}=state;

        if (operator===""){ //if no operator is used
           
            state = {...state, firstNum: firstNum + button.textContent };
            display.textContent = state.firstNum;
        }
        
        else{
            
            state = {...state, secondNum: secondNum+button.textContent };
      state = {...state, currentOp: `${state.firstOp}${state.secondNum}` };

      display.textContent = state.currentOp;
   
      resultOp();
    } 
    })
   
})

// When the opertation buttons are used
const opBtn=document.querySelectorAll(".opBtn")

opBtn.forEach(button=> {
    button.addEventListener("click", ()=>{

        const {firstNum, secondNum, operator, sum}=state;

        // if only the firstNum is used
        if(firstNum!=="" && secondNum ==="" ){
           state= {...state, operator:button.textContent,
           firstOp:`${firstNum}${button.textContent}`};// why button.textcontenct but not state.operator???
           display.textContent=state.firstOp;
        }
        

        // if only both firstNum and SecondNum is already used
        else if(firstNum!=="" && secondNum!=="" && sum===""){        
            state={    
            ...state, operator:button.textContent,
            firstOp:`${state.currentOp}${state.operator}`,
            firstNum:state.result,
            secondNum:""
            };
            display.textContent=state.firstOp;
        }

        // if the sum "=" button is already used
        else if(firstNum!=="" && secondNum!=="" && sum!==""){ 
            state= {...state, 
                operator:button.textContent,
                firstOp:`${firstNum}${state.operator}`,
                sum:"",//prevent the loop from iterating only on this scope
                secondNum:"",
            };
            display.textContent=state.firstOp;
        }

       
    }) 
}) 


const reset = ()=>{
    state={
        firstNum:"",
        secondNum:"",
        operator:"",
        result:"",
        sum:"",
        firstOp:"",
        currentOp:"",
    }
    display.textContent="0";
}


// When the equalTo is being used

equalTo.addEventListener("click", ()=>
    {
    state={...state, 
        firstNum:state.result, 
        sum:equalTo.textContent}
    display.textContent=state.result;

    console.log(state);
    })

function resultOp(){
    const {firstNum, secondNum, operator}=state;
    // Change the string to Number
    let num1=Number(firstNum); 
    let num2=Number(secondNum);

// do the Calc using the operation

  if (firstNum!=="" && operator==="+" && secondNum!==""){
       state={...state, result:num1+num2} 
    }

    else if (firstNum!=="" && operator==="x" && secondNum!==""){
        state={...state, result:num1*num2} 
    }

    else if(firstNum!=="" && operator==="/" && secondNum!=="")
        {
            state={...state, result:num1/num2} 
        }
    else if(firstNum!=="" && operator==="-" && secondNum!=="")
        {
            state={...state, result:num1-num2} 
        }
    else if(firstNum!=="" && secondNum===""){
        state={...state, result:num1} 
        } 
    console.log(state.result)
}


// To clear the inputs and result

const Clear=document.querySelector(".clear")

Clear.addEventListener("click", reset)

//Clear the inputs one at a time

const back=document.querySelector(".back")

back.addEventListener("click", ()=>{

    if (firstNum!==""){
        firstNum="";
        display.textContent=firstNum;
    }
   /*  else if(operator!==""){
        operator="";
        display.textContent=firstOp;
    }

    else if(firstNum!=="" && secondNum!==""){
        secondNum="";
        display.textContent=firstOp;
    } */

}
)


// To do: the number of digits
// more than two number operations  **Done**
// Clear or AC **Done**
// clear one number at a time
// when 0 is used in division
// continue the operation using the result as an input **Done**
//using decimal fraction
// Operation follow the Math rule
// Up on equalTo clicked, only show the result and the next operations **Done**






