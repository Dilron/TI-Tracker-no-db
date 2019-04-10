import React, {Component} from 'react'

export default class PlayerFormTemplate extends Component {
    constructor(){
        super()
        this.state = {
            selectorValue: ''
        }
    }

    handleSelector = (val) => {
        console.log(val)
        this.setState({selectorValue: val})
    }

    render(){
        return(
            <div className='player-form'>
                <h4>Player: {this.props.player.playerName}</h4>
                <select onChange={(e) => this.handleSelector(e.target.value)}>
                    <option value=''>Select Race</option>
                    {this.props.factions.map(ele => {
                        return <option value={ele.name}>{ele.name}</option>
                    })}
                </select>
            </div>
        )
    }
}