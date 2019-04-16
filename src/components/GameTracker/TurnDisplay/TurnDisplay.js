import React, {Component} from 'react'
import './TurnDisplay.css'

export default class TurnDisplay extends Component {
    constructor(){
        super()
        this.state = {
            turn: 0,
            turnOrder: [0],
        }
    }

    componentDidMount = () => {
        if(this.props.playerArr.every((ele) => ele.strategyCard)){
            let tempArr = []
            for(let i = 1; i < 9; i++){
                let check = this.props.playerArr.findIndex((ele) => ele.strategyCard.id === i)
                if(check !== -1){
                    tempArr.push(check)
                }
            }
            this.setState({turnOrder: tempArr})
        }
    }

    handleEndTurn = () =>{
        if(this.state.turn === this.state.turnOrder.length - 1){
            this.setState({turn: 0})
        } else {
            this.setState({turn: this.state.turn + 1})
        }
    }
    
    handlePassTurn = () =>{
        let newTurnOrder = this.state.turnOrder
        newTurnOrder.splice(this.state.turn, 1)
        if(this.state.turn === newTurnOrder.length){
            this.setState({turn: 0, turnOrder: newTurnOrder})
        } else {
            this.setState({turnOrder: newTurnOrder})
        }
    }

    render(){
        let {turn, turnOrder} = this.state
        return(
            <div className='turn-display-container'>
                <h4 className='turn-faction-title'></h4>
                <img className='turn-faction-img' src={this.props.playerArr[turnOrder[turn]].gameRace.avatar} />
                <button onClick={() => this.handleEndTurn()}>Next Turn</button>
                <button onClick={() => this.handlePassTurn()}>Pass Turn</button>
            </div>
        )
    }
}