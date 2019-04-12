import React, { Component } from 'react';
import PlayerCard from './PlayerCard/PlayerCard';
import axios from 'axios'
import './GameTracker.css'

export default class GameTracker extends Component {
    constructor(){
        super()
        this.state = {
            playerArr: [],
            strategyCards: [],
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

    speakerToggling = (id) => {
        let speakerToken = document.querySelector(`#speaker${id}`)
        let arrowToken = document.querySelector(`#arrow${id}`)
        if(speakerToken.style.opacity === '1'){
            speakerToken.style.opacity = 0.5
            arrowToken.style.opacity = 0
        } else {
            speakerToken.style.opacity = 1
            arrowToken.style.opacity = 1
        }
    }

    arrowToggling = (id) => {
        let arrowToken = document.querySelector(`#arrow${id}`)
        if(arrowToken.style.transform === 'scaleY(-1)'){
            arrowToken.style.transform = 'scaleY(1)'
        } else {
            arrowToken.style.transform = 'scaleY(-1)'
        }
    }

    render(){
        return(
            <div className='game-tracker-container'>
                <div className='player-card-container'>
                    {this.state.playerArr.map((ele) => {
                        return <PlayerCard
                        key={ele.id}
                        player={ele}
                        speakerId={ele.id}
                        speakerToggling={this.speakerToggling}
                        arrowToggling={this.arrowToggling} />
                    })}
                </div>
                <div className='tracker-control-panel'></div>
            </div>
        )
    }
}