import React, { Component } from 'react';
import axios from 'axios'
import './App.css';
import GameInit from './components/GameInit/GameInit'
import Header from './components/Header'



class App extends Component {
  constructor(){
    super()
    this.state = {
      playerArr: [],
      gameStateInit: true,
      factions: []
    }
  }


  componentDidMount() {
    axios.get('/api/start').then( res => console.log(res.data))
    axios.get('/request/factions').then(res => {
      this.setState({factions: res.data})
    })
  }

  handleNewPlayer = (name) => {
    axios.post('/directive/players', name).then(res => {
      this.setState({playerArr: res.data})
    })
    .catch(err => console.log('err in handleNewPlayer(): ', err))
  }

  render() {
    return (
      <div className="App">
        <Header />
        <GameInit handleNewPlayer={this.handleNewPlayer} playerArr={this.state.playerArr} factions={this.state.factions}/>
      </div>
    );
  }
}

export default App;
