import React, {Component} from 'react'

export default class PlayerFormTemplate extends Component {
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
        return(
            this.state.selectorDisable ? 
                <div className='player-form'>
                    <h4>Player: {this.props.player.playerName}</h4>
                    <select disabled>
                        <option>{`${this.state.selectorValue}`}</option>
                    </select>
                </div> 
                :   
                <div className='player-form'>
                <h4>Player: {this.props.player.playerName}</h4>
                <select onChange={(e) => this.handleSelector(e.target.value)} >
                    <option value={0} >Select Faction</option>
                    {this.props.factions.map(ele => {
                        return <option key={ele.id} value={ele.id}>{ele.name}</option>
                    })}
                </select>
                </div>
        )
    }
}