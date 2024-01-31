const toggleElement = document.querySelector('.themes__toggle');
const toggleDarkTheme = () => {
    toggleElement.classList.toggle('themes__toggle--isActive');
};

toggleElement.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        toggleDarkTheme();  // toggle
    }
})
toggleElement.addEventListener('click', toggleDarkTheme);

let storedNum = "";
let currNum = "";
let operation = "";
const resultElement = document.querySelector('.calc__result');
const keyElement = document.querySelectorAll("[data-type]");
const updateScren = (val) => {
     resultElement.innerText = !val? "0": val;
}
const restHandler = () => {
    storedNum = "";
    currNum = "";
    operation = "";
    updateScren(currNum);
}
const delHandler = () => {
    if (!currNum || currNum === "0") return;

    if (currNum.length === 1) {
        currNum = ""
    } else {
        currNum = currNum.substring(0, currNum.length - 1);
    }
    updateScren(currNum);
 }
const numHandler = (val) => {
            if (val == '.' && currNum.includes('.')) return;
            if (val == '0' && !currNum) return;
        currNum += val;
        updateScren(currNum);
}
const excuteOperation = () => {
    if (currNum && storedNum && operation) {
        switch (operation) { 
            case "+":
                storedNum=parseFloat(storedNum) + parseFloat(currNum);
                currNum="";
                break;
            case "-":
                 storedNum=parseFloat(storedNum) - parseFloat(currNum);
                currNum = "";
                break;
            case "*":
                 storedNum=parseFloat(storedNum) * parseFloat(currNum);
                currNum = "";
                break;
            case "/":
                 storedNum= parseFloat(storedNum) / parseFloat(currNum);
                currNum = "";
                break;
        }
        updateScren(storedNum);
    }
}
const operationHandler = (operationVal) => { 
    if (!currNum && !storedNum) return;
    if (currNum && !storedNum) {
        storedNum = currNum;
        currNum = ""
        operation = operationVal;
    } else if (storedNum) {
        operation = operationVal;
    }
    if (currNum) excuteOperation();
}
keyElement.forEach((element) => {
    element.addEventListener('click', () => {
        if (element.dataset.type === 'number') {
            numHandler(element.dataset.value);
        } else if (element.dataset.type === 'operation') {
            switch (element.dataset.value) {
                case "c":
                    restHandler();
                    break;
                case "Backspace":
                    delHandler();
                    break;
                case "Enter":
                    excuteOperation();
                    break;
                default:
                    operationHandler(element.dataset.value);
            }
        }
})
})
const hoverOnClick = (key) => {
    const ele = document.querySelector(`[data-value="${key}"]`)
        ele.classList.add('hover');
        ele.click();
        setTimeout(() => ele.classList.remove('hover'), 300);
 }
const avaibleNum = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
const avaibleOperation = ['+', '-', '*', '/'];
window.addEventListener('keydown', (e)=>{
    if (avaibleNum.includes(e.key)) {
        numHandler(e.key)
        hoverOnClick(e.key)
    } else if (avaibleOperation.includes(e.key)) {
        operationHandler(e.key)
        hoverOnClick(e.key)
    } else if (e.key === 'Backspace') {
        delHandler();
        hoverOnClick(e.key)
    } else if (e.key === 'Enter') {
        excuteOperation();
        hoverOnClick(e.key);
    } else if (e.key === 'c') {
        restHandler();
        hoverOnClick(e.key);
     }
})
