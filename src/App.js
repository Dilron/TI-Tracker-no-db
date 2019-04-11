import React, { Component } from 'react';
import axios from 'axios'
import './App.css';
import GameInit from './components/GameInit/GameInit'
import Header from './components/Header'
import GameTracker from './components/GameTracker/GameTracker'



class App extends Component {
  constructor(){
    super()
    this.state = {
      playerArr: [],
      gameStateInit: true,
    }
  }


  componentDidMount() {
    axios.get('/api/start').then( res => console.log(res.data))
    .catch(err => console.log('Did not connect to server: ', err))
    axios.get('/request/players').then( res => {
      this.setState({playerArr: res.data})
    })
    .catch(err => console.log('encountered error retrieving players array: ', err))
  }

  handleNewPlayer = (name) => {
    axios.post('/directive/players', name).then(res => {
      this.setState({playerArr: res.data})
    })
    .catch(err => console.log('err in handleNewPlayer(): ', err))
  }

  handleRemovePlayer = (playerId) => {
    axios.delete(`/directive/players/${playerId}`).then(res => {
      this.setState({playerArr: res.data})
    })
    .catch(err => console.log('error encountered removing player: ', err))
  }

  handleBeginGame = (finalPlayerArr) => {
    axios.put(`/directive/players/finalize`, finalPlayerArr).then(res => {
      this.setState({playerArr: res.data, gameStateInit: !this.state.gameStateInit})
    })
    .catch(err => console.log('error encountered finalizing game: ', err))
  }

  render() {
    return (
      this.state.gameStateInit ?
      <div className="App">
        <Header />
        <GameInit 
        handleNewPlayer={this.handleNewPlayer} 
        playerArr={this.state.playerArr} 
        factions={this.state.factions}
        handleRemovePlayer={this.handleRemovePlayer}
        handleBeginGame={this.handleBeginGame}/>
      </div>
      :
      <div>
        <GameTracker />
      </div>
    );
  }
}

export default App;
