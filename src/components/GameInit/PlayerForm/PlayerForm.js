import React, {Component} from 'react'
import './PlayerForm.css'

export default class PlayerForm extends Component {
    constructor(){
        super()
        this.state = {
            selectorValue: '',
            selectorDisable: false,
        }
    }

    handleSelector = (val) => {
        let parsed = parseInt(val)
        let fIndex = this.props.factions.findIndex((ele) => ele.id === parsed)
        let str = this.props.factions[fIndex].name
        this.setState({selectorValue: str, selectorDisable: !this.state.selectorDisable})
        this.props.addToStaging(parsed, this.props.player.id)
    }

    render(){
        let {selectorDisable, selectorValue} = this.state
        return(
            selectorDisable ? 
                <div className='player-form'>
                    <div>
                        <h4>Player: {this.props.player.playerName}</h4>
                        <select disabled>
                            <option>{`${selectorValue}`}</option>
                        </select>
                    </div>
                    <button onClick={() => this.props.removePlayer(this.props.player.id)} >Remove Player</button>
                </div> 
                :   
                <div className='player-form'>
                    <div>
                        <h4>Player: {this.props.player.playerName}</h4>
                        <select onChange={(e) => this.handleSelector(e.target.value)} >
                            <option value={0} >Select Faction</option>
                            {this.props.factions.map(ele => {
                                return <option key={ele.id} value={ele.id}>{ele.name}</option>
                            })}
                        </select>
                    </div>
                    <button onClick={() => this.props.removePlayer(this.props.player.id)} >Remove Player</button>
                </div>
        )
    }
}