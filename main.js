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
    resultUsed:false
};
 
 // Display 0 in startup 
 let initDisplay="0";
 display.textContent=initDisplay;

 // When the number Buttons are used
 numBtn.forEach(button => {

    button.addEventListener("click", ()=> {   

        const {firstNum, secondNum, operator}=state;

        if (operator===""){ //if no operator is used
           
            state = {...state, firstNum: firstNum + button.textContent,
            
        }
        display.textContent = `${state.firstNum}`;
   
    }
        
        else{
            state = {...state, secondNum: secondNum+button.textContent, };
      state = {...state, currentOp: `${state.firstOp}${state.secondNum}`
    };

      display.textContent = state.currentOp; 
   
      resultOp();
      
    } 
    })
   
})

// When the operation buttons are used
const opBtn=document.querySelectorAll(".opBtn")

opBtn.forEach(button=> {
    button.addEventListener("click", ()=>{

        const {firstNum, secondNum, sum, resultUsed}=state;

 // For the very first operation flow only, secondNum not defined
         if(firstNum!=="" && secondNum ==="" && resultUsed===false ){
           state= {...state, operator:button.textContent,
           firstOp:`${firstNum}${button.textContent}`};
           display.textContent=state.firstOp;
           console.log(state)
        
        }

    // SecondNum previously defined but set to zero and operation button is clicked more than one time
        else if (firstNum!=="" && secondNum===""  && resultUsed===true){
            state={...state, operator:button.textContent,
                firstOp:`${state.currentOp}${button.textContent}`
            }
            display.textContent=state.firstOp;
            
        }

        // if  both firstNum and SecondNum is already used
       else  if(firstNum!=="" && secondNum!=="" && sum===""){        
            state={    
            ...state, operator:button.textContent,
            firstOp:`${state.currentOp}${button.textContent}`,
            firstNum:state.result, 
            secondNum:"" 
            };
            display.textContent=state.firstOp;
            
        }

         // if sum "=" button is already used
        else if(firstNum!=="" && sum!==""){ 
            state= {...state, operator:button.textContent,
                
                firstOp:`${firstNum}${button.textContent}`,
                sum:"" ,//prevent the loop from iterating on this scope only
                secondNum:"",
                resultUsed: false  // when op btn is clicked more than once
            };
            display.textContent=state.firstOp;
            
        } 

        /* resultOp(); */
       
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
        resultUsed:false
    }
    display.textContent="0";
}


// When the equalTo is being used

equalTo.addEventListener("click", ()=>{
    const {firstNum, secondNum, operator}=state;

   if (firstNum!=="" && operator!=="" && secondNum!=="") 
    {
state={...state, 
        result:firstNum, 
        sum:equalTo.textContent}

   }
    
   // Only firstNum is defined
    else if(firstNum!=="" && secondNum==="" ){
        state={...state, result:firstNum} 
        } 

        display.textContent=state.result;
    
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

     state.resultUsed=true;
     
}


// To clear the inputs and result

const Clear=document.querySelector(".clear")

Clear.addEventListener("click", ()=>{
    reset();
    console.log(state)
})



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






