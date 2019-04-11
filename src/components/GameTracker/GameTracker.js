import React, { Component } from 'react';
import PlayerCard from './PlayerCard/PlayerCard';
import './GameTracker.css'

export default class GameTracker extends Component {
    constructor(){
        super()
        this.state = {

        }
    }
    render(){
        return(
            <div>
                {this.props.playerArr.map((ele) => {
                    return <PlayerCard
                    key={ele.id}
                    player={ele} />
                })}
                
            </div>
        )
    }
}