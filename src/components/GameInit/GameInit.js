import React, { Component } from 'react';
import PlayerForm from './PlayerForm/PlayerForm'
import axios from 'axios'
import './GameInit.css'

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

    //updates the player object with their faction and adds them to the staging array
    addToStaging = (factionId, playerId) => {
        //check if factionId represents an actual faction
        if(factionId !== 0){
            //create temporary player object, set its faction based on id
            let player = this.props.playerArr.find((ele) => ele.id === playerId)
            let faction = this.state.factions.find((ele) => ele.id === factionId)
            player.gameRace = faction
            //create temporary faction copy, remove selected faction so that id won't be selected twice
            let factionsReplace = this.state.factions
            let fIndex = factionsReplace.findIndex((ele) => ele.id === factionId)
            factionsReplace.splice(fIndex, 1)
            //update state to reflect changes
            let stagingArrReplace = this.state.stagingPlayerArr
            stagingArrReplace.push(player)
            return this.setState({factions: factionsReplace, stagingPlayerArr: stagingArrReplace})
        } 
    }

    //takes in player name and creates new player object on server
    handleNewPlayer = () => {
        let nameObj = {name: this.state.nameInput}
        this.props.handleNewPlayer(nameObj)
        this.setState({nameInput: ''})
    }

    handleChange = (val) => {
        this.setState({nameInput: val})
    }

    handleKeyDown = (e) => {
        if(e.key === 'Enter'){
            this.handleNewPlayer()
        }
    }

    //processes remove player input before passing id to app.js to .delete from server
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

    //checks that all players have locked in before passing data to app.js to update the server and render the game tracker
    beginGame = () => {
        if(this.state.stagingPlayerArr.every((ele) => ele.gameRace.id !== 0)){
            this.props.handleBeginGame(this.state.stagingPlayerArr)
        } else {
            alert('All players must select a faction')
        }
    }

    render(){
        let {factions} = this.state
        return(
            <div className='game-init-container'>
                <header className="game-init-header">
                    <h2 className='init-header-title'>Game Setup</h2>
                    <div>
                        <input  value={this.state.nameInput}
                        onKeyDown={this.handleKeyDown} 
                        className='init-name-field' 
                        type='text' 
                        onChange={(e) => this.handleChange(e.target.value)} 
                        placeholder='Enter Name' />
                        <button onClick={this.handleNewPlayer}>Add Player</button>
                    </div>
                </header>
                {this.props.playerArr.map(ele => {
                    return <PlayerForm 
                    key={ele.id} 
                    player={ele} 
                    factions={factions} 
                    addToStaging={this.addToStaging} 
                    removePlayer={this.removePlayer}
                    />
                })}
                <button className='begin-button' onClick={() => this.beginGame()} >Begin Game</button>
            </div>
        )
    }
}