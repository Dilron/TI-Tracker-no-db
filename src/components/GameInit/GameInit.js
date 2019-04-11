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

    //Function addToStaging updates the staging player array on state.
    //Checks 3 conditions before responding accordingly:
    //1. If the player has selected a faction(a non-0 faction id) and is not already on the array their object is updated with their faction and added to the staging array. The faction is removed from the factions array.
    //2. If the player has selected a faction and is on the array the faction they are replacing is returned to the factions array and the player object on the staging array is updated with the new faction. The new faction is removed from the factions array.
    //3. If the player has un-selected a faction(faction id 0) the faction they had selected is returned to the factions array and the player object is removed from the staging array.
    addToStaging = (factionId, playerId) => {
        console.log('starting values: ', factionId, playerId)
        let check = this.state.stagingPlayerArr.find((ele) => ele.id === playerId)
        if(+factionId !== 0 && !check){
            let player = this.props.playerArr.find((ele) => ele.id === playerId)
            let faction = this.state.factions.find((ele) => ele.id === +factionId)
            player.gameRace = faction
            console.log('after adding faction: ', player)
            let factionsReplace = this.state.factions
            let fIndex = factionsReplace.findIndex((ele) => ele.id === +factionId)
            console.log('index of factionId: ', fIndex)
            factionsReplace.splice(fIndex, 1)
            let stagingArrReplace = this.state.stagingPlayerArr
            stagingArrReplace.push(player)
            return this.setState({factions: factionsReplace, stagingPlayerArr: stagingArrReplace})
        } else if(+factionId !== 0 && check){

        }
    }

    handleNewPlayer = () => {
        let nameObj = {name: this.state.nameInput}
        this.props.handleNewPlayer(nameObj)
        this.setState({nameInput: ''})
    }

    handleChange = (val) => {
        this.setState({nameInput: val})
    }

    render(){
        let {factions} = this.state
        return(
            <div className='game-init-container'>
                <header className="game-init-header">
                    <h2>Game Setup</h2>
                    <input type='text' onChange={(e) => this.handleChange(e.target.value)} placeholder='Enter Name' ></input>
                    <button onClick={this.handleNewPlayer}>Add Player</button>
                </header>
                {this.props.playerArr.map(ele => {
                    return <PlayerFormTemplate key={ele.id} player={ele} factions={factions} addToStaging={this.addToStaging}/>
                })}
                <button>Begin Game</button>
            </div>
        )
    }
}