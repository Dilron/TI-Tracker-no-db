import React, { Component } from 'react';
import PlayerCard from './PlayerCard/PlayerCard';
import SpeakerSelect from './SpeakerSelect/SpeakerSelect'
import StrategyDraft from './StrategyDraft/StrategyDraft'
import axios from 'axios'
import './GameTracker.css'

export default class GameTracker extends Component {
    constructor(){
        super()
        this.state = {
            playerArr: [],
            strategyCards: [],
            showSpeaker: false,
            showStrategy: false,
        }
    }

    componentDidMount = () => {
        axios.get('/request/players').then( res => {
            this.setState({playerArr: res.data})
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
        this.setState({showSpeaker: false})
    }

    toggleArrow = (val, id) => {
        let valInt = parseInt(val)
        let idInt = parseInt(id)
        let arrowToken = document.querySelector(`#arrow${idInt}`)
        if(valInt !== 0 && valInt === -1){
            arrowToken.style.transform = `scaleY(-1)`
        } else if(valInt !== 0 && valInt === 1){
            arrowToken.style.transform = `scaleY(1)`
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
        this.setState({showStrategy: !this.state.showStrategy})
    }

    handleDraftReset = () => {
        axios.get('/request/strategy-cards').then( res => {
            this.setState({strategyCards: res.data})
          })
          .catch(err => console.log('encountered error retrieving strategy cards array: ', err))
    }

    clearStrategyCards = () => {
        let newPlayerArr = this.state.playerArr
        newPlayerArr.map((ele) => {
            ele.strategyCard = null
        })
        this.setState({playerArr: newPlayerArr})
    }

    render(){
        let {playerArr, showSpeaker, showStrategy, strategyCards} = this.state
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
                strategyCards={strategyCards}
                assignStrategyCard={this.assignStrategyCard}
                playerArr={playerArr}
                toggleStrategyPanel={this.toggleStrategyPanel}
                handleDraftReset={this.handleDraftReset}
                clearStrategyCards={this.clearStrategyCards} />
                :
                <div className='tracker-control-panel'>
                    <button className='control-panel-buttons' onClick={() => this.toggleSpeakerPanel()}>Choose Speaker</button>
                    <button className='control-panel-buttons' onClick={() => this.toggleStrategyPanel()}>Redraft Strategy Tokens</button>
                </div>}
                
            </div>
        )
    }
}