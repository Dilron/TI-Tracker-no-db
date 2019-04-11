import React, { Component } from 'react';
import PlayerFormTemplate from './PlayerFormTemplate'
import axios from 'axios'

export default class GameInit extends Component {
    constructor(){
        super()
        this.state = {
            stagingPlayerArr: [],
            nameInput: '',
            factions: []
        }
    }

    componentDidMount = () => {
        axios.get('/request/factions').then(res => {
            this.setState({factions: res.data})
          })
          .catch(err => console.log('encountered error retrieving factions: ', err))
    }

    addToStaging = (factionId, playerId) => {
        if(factionId !== 0){
            let player = this.props.playerArr.find((ele) => ele.id === playerId)
            let faction = this.state.factions.find((ele) => ele.id === factionId)
            player.gameRace = faction
            
            let factionsReplace = this.state.factions
            let fIndex = factionsReplace.findIndex((ele) => ele.id === factionId)
            factionsReplace.splice(fIndex, 1)

            let stagingArrReplace = this.state.stagingPlayerArr
            stagingArrReplace.push(player)
            return this.setState({factions: factionsReplace, stagingPlayerArr: stagingArrReplace})
        } 
    }

    handleNewPlayer = () => {
        let nameObj = {name: this.state.nameInput}
        this.props.handleNewPlayer(nameObj)
    }

    handleChange = (val) => {
        this.setState({nameInput: val})
    }

    removePlayer = (playerId) => {
        let parseId = parseInt(playerId)
        //If player has been added to the staging player array, this code runs to remove them
        if(this.state.stagingPlayerArr.find((ele) => ele.id === parseId)){
            let stagingArrReplace = this.state.stagingPlayerArr
            let pIndex = stagingArrReplace.findIndex((ele) => ele.id === parseId)
            //If the player had a faction assigned, this code will run to add it back to available factions
            if(stagingArrReplace[pIndex].gameRace.id !== 0){
                let factionsReplace = this.state.factions
                factionsReplace.push(stagingArrReplace[pIndex].gameRace)
                this.setState({factions: factionsReplace})
            }

            stagingArrReplace.splice(pIndex, 1)
            this.setState({stagingPlayerArr: stagingArrReplace})
        }
        this.props.handleRemovePlayer(parseId)
    }

    render(){
        let {factions} = this.state
        return(
            <div className='game-init-container'>
                <header className="game-init-header">
                    <h2>Game Setup</h2>
                    <input type='text' onChange={(e) => this.handleChange(e.target.value)} placeholder='Enter Name' />
                    <button onClick={this.handleNewPlayer}>Add Player</button>
                </header>
                {this.props.playerArr.map(ele => {
                    return <PlayerFormTemplate 
                    key={ele.id} 
                    player={ele} 
                    factions={factions} 
                    addToStaging={this.addToStaging} 
                    removePlayer={this.removePlayer}
                    />
                })}
                <button>Begin Game</button>
            </div>
        )
    }
}