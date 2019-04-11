import React, {Component} from 'react'
import './PlayerCard.css'

export default class PlayerCard extends Component {
    constructor() {
        super()
        this.state = {

        }
    }

    render(){
        return(
            <div className='player-card'>
                <h5 className='image-temp'></h5>
                <div className='card-info'>
                    <div className='card-top-row'>
                        <h4 className='card-faction-title'>{`${this.props.player.gameRace.name}`}</h4> 
                        <h5 className='card-player-name'>({`${this.props.player.playerName}`})</h5>
                    </div>
                    <div className='card-bottom-row'>

                    </div>
                </div>
            </div>
        )
    }
}