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
        this.setTurnOrder()
    }

    setTurnOrder = () => {
            let tempArr = []
            for(let i = 1; i < 9; i++){
                let check = this.props.playerArr.findIndex((ele) => ele.strategyCard.id === i)
                if(check !== -1){
                    if(this.props.playerArr[check].gameRace.id !== 4){
                        tempArr.push(check)
                    } else if(this.props.playerArr[check].gameRace.id === 4){
                        tempArr.unshift(check)
                    }
                }
            }
            this.setState({turnOrder: tempArr})
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
        if(newTurnOrder.length < 1){
            this.props.toggleTurnPanel()
        } else {
            if(this.state.turn === newTurnOrder.length){
                this.setState({turn: 0, turnOrder: newTurnOrder})
            } else {
                this.setState({turnOrder: newTurnOrder})
            }
        }
    }

    render(){
        let {turn, turnOrder} = this.state
        return(
            <div className='turn-display-container'>
                <h4 className='turn-faction-title'>{this.props.playerArr[turnOrder[turn]].gameRace.name} are taking their turn</h4>
                <img className='turn-faction-img' src={this.props.playerArr[turnOrder[turn]].gameRace.avatar} />
                <div className='turn-button-container'>
                    <button className='turn-button' onClick={() => this.handleEndTurn()}>Next Turn</button>
                    <button className='turn-button' onClick={() => this.handlePassTurn()}>Pass Turn</button>
                </div>
            </div>
        )
    }
}