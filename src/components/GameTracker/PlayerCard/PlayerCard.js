import React, {Component} from 'react'
import './PlayerCard.css'

export default class PlayerCard extends Component {
    constructor() {
        super()
        this.state = {

        }
    }

    speakerOpacity = () => {
        let token = document.querySelector(`#speaker${this.props.speakerId}`)
        if(token.style.opacity === '0.5'){
            token.style.opacity = 1
        } else {
            token.style.opacity = 0.5
        }
    }

    render(){
        return(
            <div className='player-card'>
                <img className='image-avatar' src={this.props.player.gameRace.avatar} alt='faction avatar' />
                <div className='card-info'>
                    <div className='card-top-row'>
                        <div className='card-title'>
                            <h4 className='card-faction-title'>{`${this.props.player.gameRace.name}`}</h4> 
                            <h5 className='card-player-name'>({`${this.props.player.playerName}`})</h5>
                        </div>
                        <div className='vp-counter'>
                            <h5>Victory Points:</h5>
                            <select>
                                <option>0</option>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                                <option>6</option>
                                <option>7</option>
                                <option>8</option>
                                <option>9</option>
                                <option>10</option>
                            </select>
                        </div>
                    </div>
                    <div className='card-bottom-row'>
                        <img onClick={() => this.props.speakerToggling(this.props.speakerId)} id={`speaker${this.props.speakerId}`} className='speaker-token' src='http://www.preeminent.org/steve/games/ti3/ti3demo/images/chits/SpeakerToken.gif'/>
                        <img onClick={() => this.props.arrowToggling(this.props.speakerId)} id={`arrow${this.props.speakerId}`} className='speaker-arrow' src='http://res.freestockphotos.biz/pictures/3/3676-illustration-of-a-curved-up-3d-arrow-pv.png'/>
                    </div>
                </div>
            </div>
        )
    }
}