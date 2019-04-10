import React, { Component } from 'react';
import PlayerFormTemplate from './PlayerFormTemplate'

export default class GameInit extends Component {
    constructor(){
        super()
        this.state = {
            tempPlayerArr: [],
            nameInput: '',

        }
    }

    handleNewPlayer = () => {
        let nameObj = {name: this.state.nameInput}
        this.props.handleNewPlayer(nameObj)
    }

    handleChange = (val) => {
        this.setState({nameInput: val})
    }

    render(){
        return(
            <div className='game-init-container'>
                <header className="game-init-header">
                    <h2>Game Setup</h2>
                    <input type='text' onChange={(e) => this.handleChange(e.target.value)} ></input>
                    <button onClick={this.handleNewPlayer}>Add Player</button>
                </header>
                {this.props.playerArr.map(ele => {
                    return <PlayerFormTemplate key={ele.id} player={ele} factions={this.props.factions}/>
                })}
            </div>
        )
    }
}