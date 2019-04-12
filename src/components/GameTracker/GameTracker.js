import React, { Component } from 'react';
import PlayerCard from './PlayerCard/PlayerCard';
import SpeakerSelect from './SpeakerSelect/SpeakerSelect'
import axios from 'axios'
import './GameTracker.css'

export default class GameTracker extends Component {
    constructor(){
        super()
        this.state = {
            playerArr: [],
            strategyCards: [],
            showSpeaker: false,
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

    // setSpeaker = (val) => {
    //     let updatePlayerSpeaker = this.state.playerArr
    //     updatePlayerSpeaker.map((ele) => {
    //         if(ele.id === val){
    //             ele.id = true
    //         } else {
    //             ele.id = false
    //         }
    //     })
    //     this.setState({playerArr: updatePlayerSpeaker})
    // }

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
        // if(arrowToken.style.transform === 'scaleY(-1)'){
        //     arrowToken.style.transform = 'scaleY(1)'
        // } else {
        //     arrowToken.style.transform = 'scaleY(-1)'
        // }
    }

    toggleSpeakerPanel = () => {
        this.setState({showSpeaker: !this.state.showSpeaker})
    }

    render(){
        let {playerArr, showSpeaker} = this.state
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
                : 
                <div className='tracker-control-panel'>
                    <button onClick={() => this.toggleSpeakerPanel()}>Choose Speaker</button>
                </div>}
                
            </div>
        )
    }
}