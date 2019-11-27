import React from 'react';
import './Calc.css';


let calculateSum = function(a, b){
    return a + b;
}

let calculateDiff = function(a, b){
    return a - b;
}

let calculateMult = function(a, b){
    return a * b;
}

let calculateDiv = function(a, b){
    if (b !== 0) {
        return a / b;
    }
    else {
        return 'infinity';
    }
}

function checkValue(value) {
// if field is empty, setting it to 0
    if (value.length === 0) {
        return '';
    }
    else {
// counting number of dots (for float numbers) in field value
        let dotCount = 0;
// starting position
        let position = 0;
// checking every symbol in string
        while (position < value.length) {
// number sign can be only in a first position
            if ((value[position] === '-' || value[position] === '+') && position === 0) {
                position++;
            }
// dot can be only one in field
            else if (value[position] === '.' && dotCount < 1) {
                position++;
                dotCount++;
            }
// if not a number, removing symbol
            else if (parseInt(value[position]) + 0 !== parseInt(value[position])) {
                console.log('Not a number enterd at position:' + position);
                value = value.substring(0, position) + value.substring(position + 1, value.length);
            }
// changing position
            else {
                position++;
            }
            
        }
        return value;
    }
    
}
//}    

class Calc extends React.Component {
    constructor(props) {
      super(props);
        this.state = {mathAction: "+", firstValue: '', secondValue: '', result: 0};
        this.onChangeInput = this.onChangeInput.bind(this);
        this.onMathAction = this.onMathAction.bind(this);
        this.onResult = this.onResult.bind(this);
        this.onReset = this.onReset.bind(this);
        this.allowedMathActions = ["+", "-", "*", "/"];
        this.calculations = {'+': calculateSum, '-': calculateDiff, '*': calculateMult, '/': calculateDiv};
    }

    onChangeInput(event) {
        const name = event.target.name;
        let value = checkValue(event.target.value);
        this.setState({[name]: value});
//        console.log(event.target.value);
    }

    onMathAction(event) {
        const action = event.target.name;
        if (this.allowedMathActions.indexOf(action) === -1) {
            console.log("wrong action recieved");
            return;
        }
        this.setState({mathAction: action});
    }

    onResult(event) {

        let calcResult = this.calculations[this.state.mathAction](parseFloat(this.state.firstValue), parseFloat(this.state.secondValue));

        if (calcResult === 'infinity') {    
            calcResult = 'Деление на 0';
        }
        else if (calcResult % 1 != 0) calcResult = Math.round(calcResult * 10000) / 10000;
        this.setState({result : calcResult});
    }

    onReset(event) {
        this.setState({firstValue: 0});
        this.setState({secondValue: 0});
        this.setState({result: 0});

    }

//        const action = event.target.name;
//        console.log(action);
// to make float calculations, getting numbers from strings
/*
x = parseFloat(x);
y = parseFloat(y);


// if float, leaving only 10 significant digits
if (result % 1 != 0) result = (result).toFixed(10);
return result;
}
*/




    render() {
        return (
            <div className="calculator">
                <form>
                    <div className="calculator__inputs">
                        <input name="firstValue"  type="text" placeholder="0"
                                        value={this.state.firstValue} onChange={this.onChangeInput}/>
                        <div className="selectedAction">{this.state.mathAction}</div>
                        <input name="secondValue"  type="text" placeholder="0"
                                        value={this.state.secondValue} onChange={this.onChangeInput}/>
                    </div>
                    <div id="result" className="calculator__result">{this.state.result}</div>
                </form>
                <div className="calculator__keyboard">
                    <div className="row">
                        <button name="+" className="btn" onClick={this.onMathAction}>+</button>
                        <button name="-" className="btn" onClick={this.onMathAction}>-</button>
                    </div>
                    <div className="row">
                        <button name="*" className="btn" onClick={this.onMathAction}>*</button>
                        <button name="/" className="btn" onClick={this.onMathAction}>/</button>
                    </div>
                    <div className="row row-result" onClick={this.onResult}>
                        <button>=</button>
                    </div>
                    <div className="row row-reset" onClick={this.onReset}>
                        <button>C</button>
                    </div>
                </div>
            </div>
        );
      }

}


export default Calc;