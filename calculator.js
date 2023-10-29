let firstNum = ''
let secondNum = ''
let ops = ''
let op_flag = false

const operators = ['+', '-', '*','/']
const funcs = [add,sub,multiply,divide]

const numberButtons = document.querySelectorAll(".nums")
const opButtons = document.querySelectorAll(".op")
const display = document.querySelector(".display")
const clear = document.querySelector(".clear")
const eqs = document.querySelector("#equal")
const period = document.querySelector("#period")
const backspace = document.querySelector(".back")

eqs.addEventListener('click', () => {
    console.log(ops)
    equality()
})

function equality(){
    let value = operate(ops, firstNum, secondNum)
    if(value === NaN){
        display.value = "Inf"
    }
    else{
        console.log(value)
        display.value = value
    }
    period.disabled = false
    firstNum = ''
    secondNum = ''
    ops = ''
    op_flag = false
}
clear.addEventListener('click', ()=>{
    firstNum = ''
    secondNum = ''
    ops = ''
    op_flag = false
    period.disabled = false
    display.value = ''
    console.log("Values Cleared")
})

backspace.addEventListener('click', ()=>{

    if (op_flag){
        display.valueL = secondNum.slice(0,-1)
    }
    else{
        display.value = firstNum.slice(0,-1)
    }

})

opButtons.forEach(btn => {
 
    btn.addEventListener('click', () => {
        operations(btn.textContent)

    })
})


function operations(val){
    if(op_flag){
        let value = operate(ops, firstNum, secondNum)
        if(value === NaN){
            display.value = "Inf"
        }
        else{
            display.value = value
        }
        firstNum = value
        secondNum = ''
    }
    op_flag = true
    ops = val
    period.disabled = false
}

numberButtons.forEach(btn => {
    let num = ''

    btn.addEventListener('click', () => {
        if(btn.textContent == '.' ){
            if(!period.disabled){
                period.disabled = true
                num = numbers(btn.textContent) 
            }
        }
        else{
            num = numbers(btn.textContent) 
        }
            
        display.value = num
    })
    
})

display.addEventListener("keypress", logkey)

function logkey(e){
    e.preventDefault()
   console.log(`${e.key}`)
   if (operators.includes(e.key)){
        operations(e.key)
   }
   else if(e.key === 'Enter'){
        equality()
   }
   else{
        if(e.key == '.' ){
            if(!period.disabled){
                period.disabled = true
                num = numbers(e.key) 
            }
        }
        else{
            num = numbers(e.key) 
        }
        display.value = num
    }
}

function numbers(key){
    if(op_flag){
        secondNum += key
        secondNum = roundCheck(secondNum)
        num=secondNum
    }
    else{
        firstNum += key
        firstNum = roundCheck(firstNum)
        num = firstNum
    }

    display.value = num

    console.log("Num: ",num)
    return num
}


function roundCheck(a){
    let len = a.length
    if (len>17){
        if(a.includes('.')){
            let subset = a.split('.')
            console.log(subset[1].length)
            console.log(subset[1])
            console.log(Number.parseFloat(a).toFixed(2))
            return Number.parseFloat(a).toFixed(2)
            
        }
    }
    return a
}
function add(a,b){
    return Number(a)+Number(b)
}

function sub(a,b){
    return Number(a)-Number(b)
}

function multiply(a,b){
    return Number(a)*Number(b)
}

function divide(a,b){
    if(Number(b) === 0){
        return NaN
    }
    else{
        return Number(a)/Number(b)
    }
    
}

function operate(op,a,b){
    let value = 0
    switch (op){
        case '+':
            value = add(a,b)
            break
        case '-':
            value = sub(a,b)
            break
        case '*':
            value = multiply(a,b)
            break
        case '/':
            value = divide(a,b)
            break
        default:
            console.log("Not a valid operation")
            break
    }
    return value   

}