import React, {Component} from 'react'
import './PlayerCard.css'

export default class PlayerCard extends Component {

    // componentDidMount(){
    //     let cardStyleAdjust = document.querySelector(`#player-card-${this.props.player.id}`)
    //     cardStyleAdjust.style.background = `${this.props.player.gameRace.}`
    // }

    render(){
        return(
            <div id={`player-card-${this.props.player.id}`} className='player-card'>
                <img className='image-avatar' src={this.props.player.gameRace.avatar} alt='faction avatar' />
                <div className='card-info'>
                    <div className='card-top-row'>
                        <div className='card-title'>
                            <h4 className='card-faction-title'>{`${this.props.player.gameRace.name}`}</h4> 
                            <h5 className='card-player-name'>({`${this.props.player.playerName}`})</h5>
                        </div>
                        <div className='vp-counter'>
                            <h5 className='vp-text'>Victory Points:</h5>
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
                        <img id={`speaker${this.props.player.id}`} 
                        className='speaker-token' 
                        src='http://www.preeminent.org/steve/games/ti3/ti3demo/images/chits/SpeakerToken.gif'/>
                        <img id={`arrow${this.props.player.id}`} 
                        className='speaker-arrow' 
                        src='http://res.freestockphotos.biz/pictures/3/3676-illustration-of-a-curved-up-3d-arrow-pv.png'/>
                        { this.props.player.strategyCard ? 
                        <div>
                            <img className='player-strategy-card' 
                                src={`${this.props.player.strategyCard.image}`} />
                            <h4 className='ini-tracker'>Initiative: {this.props.player.strategyCard.id}</h4>
                        </div>
                        :
                        <p></p>
                        }
                    </div>
                </div>
            </div>
        )
    }
}