import React, { Component } from 'react';
import PlayerCard from './PlayerCard/PlayerCard';
import SpeakerSelect from './SpeakerSelect/SpeakerSelect'
import StrategyDraft from './StrategyDraft/StrategyDraft'
import axios from 'axios'
import './GameTracker.css'
import TurnDisplay from './TurnDisplay/TurnDisplay';

export default class GameTracker extends Component {
    constructor(){
        super()
        this.state = {
            playerArr: [],
            strategyCards: [],
            showSpeaker: false,
            speakerDir: 1,
            showStrategy: false,
            showTurn: false,
        }
    }

    componentDidMount = () => {
        axios.get('/request/players').then( res => {
            this.setState({playerArr: res.data})
            console.log('fired tracker player request')
          })
            .catch(err => console.log('encountered error retrieving players array: ', err))
        axios.get('/request/strategy-cards').then( res => {
              this.setState({strategyCards: res.data})
            })
            .catch(err => console.log('encountered error retrieving strategy cards array: ', err))
    }

    handleChooseSpeaker = (id) => {
        let idVal = parseInt(id)
        let arr = this.state.playerArr
        arr.forEach((ele) => {
            let speakerToken = document.querySelector(`#speaker${ele.id}`)
            let arrowToken = document.querySelector(`#arrow${ele.id}`)
            if(ele.id !== idVal){
                speakerToken.style.opacity = 0.5
                arrowToken.style.opacity = 0
            } else {
                speakerToken.style.opacity = 1
                arrowToken.style.opacity = 1
            }
        })
        arr.map((ele) => {
            if(ele.id === idVal){
                ele.speaker = true
            } else {
                ele.speaker = false
            }
        })
        this.setState({showSpeaker: false, playerArr: arr})
    }

    toggleArrow = (val, id) => {
        let valInt = parseInt(val)
        let idInt = parseInt(id)
        let arrowToken = document.querySelector(`#arrow${idInt}`)
        if(valInt !== 0 && valInt === -1){
            arrowToken.style.transform = `scaleY(-1)`
            this.setState({speakerDir: 0})
        } else if(valInt !== 0 && valInt === 1){
            arrowToken.style.transform = `scaleY(1)`
            this.setState({speakerDir: 1})
        }
    }

    assignStrategyCard= (playerId, cardId) => {
        let newPlayerArr = this.state.playerArr
        let targetCard = this.state.strategyCards.find((ele) => ele.id === cardId)
        newPlayerArr.map((ele) => {
            if(ele.id === playerId){
                ele.strategyCard = targetCard
            }
        })
        this.setState({playerArr: newPlayerArr})
        let newCardArr = this.state.strategyCards
        newCardArr.map((ele) => {
            if(ele.id === cardId){
                ele.open = false
            }
        })
        this.setState({strategyCards: newCardArr})
    }

    toggleSpeakerPanel = () => {
        this.setState({showSpeaker: !this.state.showSpeaker})
    }
    
    toggleStrategyPanel = () => {
        if(this.state.playerArr.some(ele => ele.speaker)){
            this.setState({showStrategy: !this.state.showStrategy})
        } else {
            alert('A player must be nominated speaker first')
        }
    }

    toggleTurnPanel = () => {
        if(this.state.playerArr.every(ele => ele.strategyCard)){
            this.setState({showTurn: !this.state.showTurn})
        } else {
            alert('All players must draft a Strategy Token first')
        }
    }

    handleDraftReset = () => {
        axios.get('/request/strategy-cards').then( res => {
            this.setState({strategyCards: res.data})
          })
          .catch(err => console.log('encountered error retrieving strategy cards array: ', err))
    }

    clearStrategyCards = () => {
        let newPlayerArr = this.state.playerArr
        newPlayerArr.map((ele) => ele.strategyCard = null)
        this.setState({playerArr: newPlayerArr})
    }

    handleEndGame = () => {
        this.props.endGame()
    }

    render(){
        let {playerArr, showSpeaker, showStrategy, strategyCards, speakerDir, showTurn} = this.state
        return(
            <div className='game-tracker-container'>
                <div className='player-card-container'>
                    {this.state.playerArr.map((ele) => {
                        return <PlayerCard
                        key={ele.id}
                        player={ele}
                        speakerToggling={this.speakerToggling}
                        arrowToggling={this.arrowToggling} />
                    })}
                </div>
                {showSpeaker ? 
                <SpeakerSelect
                handleChooseSpeaker={this.handleChooseSpeaker}
                playerArr={playerArr}
                toggleArrow={this.toggleArrow}
                /> 
                : showStrategy ?
                <StrategyDraft
                speakerDir={speakerDir}
                strategyCards={strategyCards}
                assignStrategyCard={this.assignStrategyCard}
                playerArr={playerArr}
                toggleStrategyPanel={this.toggleStrategyPanel}
                handleDraftReset={this.handleDraftReset}
                clearStrategyCards={this.clearStrategyCards} />
                :
                <div className='tracker-control-panel'>
                    <div>
                        <button className='control-panel-buttons' onClick={() => this.toggleSpeakerPanel()}>Choose Speaker</button>
                        <button className='control-panel-buttons' onClick={() => this.toggleStrategyPanel()}>Redraft Strategy Tokens</button>
                        <button className='control-panel-buttons' onClick={() => this.handleEndGame()}>End Game</button>
                    </div>
                    {showTurn ?
                    <TurnDisplay
                    playerArr={playerArr}
                    toggleTurnPanel={this.toggleTurnPanel} />
                    :
                    <button className='control-panel-buttons' onClick={() => this.toggleTurnPanel()}>Begin Action Phase Turns</button>
                    }
                </div>}
                
            </div>
        )
    }
}