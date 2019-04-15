import React, { Component } from 'react';
import axios from 'axios'
import './App.css';
import GameInit from './components/GameInit/GameInit'
import Header from './components/HeadFoot/Header'
import Footer from './components/HeadFoot/Footer'
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
      console.log('fired player request')
    })
    .catch(err => console.log('encountered error retrieving players array: ', err))
  }

  handleNewPlayer = (name) => {
    axios.post('/directive/players', name).then(res => {
      this.setState({playerArr: res.data})
      console.log('new player sent')
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
        playerArr={this.state.playerArr} 
        handleNewPlayer={this.handleNewPlayer} 
        handleRemovePlayer={this.handleRemovePlayer}
        handleBeginGame={this.handleBeginGame}/>
        <Footer />
      </div>
      :
      <div className='App'>
        <Header />
        <GameTracker />
        <Footer />
      </div>
    );
  }
}

export default App;
