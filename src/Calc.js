import React from 'react';
import './Calc.css';

class Calc extends React.Component {
    constructor(props) {
      super(props);
//      this.onSetFire = this.onSetFire.bind(this);
//      this.onSnuffOut = this.onSnuffOut.bind(this);
        this.state = {mathAction: "+", firstValue: 0, secondValue: 0, result: 0};
//        this.state = {firstValue: 0, secondValue: 0};
        this.onChangeInput = this.onChangeInput.bind(this);
        this.onMathAction = this.onMathAction.bind(this);
        this.onResult = this.onResult.bind(this);
        this.allowedMathActions = ["+", "-", "*", "/"];
    }

    onChangeInput(event) {
        const name = event.target.name;
        this.setState({[name]: parseFloat(event.target.value)});
        console.log(event.target.value);
    }

    onMathAction(event) {
        const action = event.target.name;
        if (this.allowedMathActions.indexOf(action) === -1) {
            console.log("wrong action recieved");
            return;
        }
        this.setState({mathAction: action});
//        console.log(action);
    }

    onResult(event) {
//        let result = 0;
        switch (this.state.mathAction) {
            case '+':
                this.setState({result : this.state.firstValue + this.state.secondValue});
                break;
            case '-':
                this.setState({result : this.state.firstValue - this.state.secondValue});
                break;
            case '*':
                this.setState({result : this.state.firstValue * this.state.secondValue});
                break;
            case '/':
                if (this.state.secondValue != 0) {
                    this.setState({result : this.state.firstValue / this.state.secondValue});
                }
                else {
                    this.setState({result : 'infinity'});
                }
                break;
            default:
                this.setState({result : 'operation unknown'});
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
    }




    render() {
        return (
            <div className="calculator">
                <form>
                    <div className="calculator__inputs">
                        <input name="firstValue"  type="text"
                                        value={this.state.firstValue} onChange={this.onChangeInput}/>
                        <div className="selectedAction">{this.state.mathAction}</div>
                        <input name="secondValue"  type="text"
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
                    <div className="row row-reset">
                        <button>C</button>
                    </div>
                </div>
            </div>
        );
      }

}


export default Calc;