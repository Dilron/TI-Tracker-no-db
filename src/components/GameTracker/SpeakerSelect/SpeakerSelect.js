import React, {Component} from 'react'
import './SpeakerSelect.css'

export default class SpeakerSelect extends Component {
    constructor(){
        super()
        this.state = {
            selectValue: ''
        }
    }

    handleSelect = (val) => {
        this.setState({selectValue: val})
    }
    
    handleSubmit = (id) => {
        this.props.handleChooseSpeaker(id)
        this.props.toggleArrow(this.state.selectValue, id)
    }

    render(){
        return(
            <div className='speaker-panel'>
                <select onChange={(e) => this.handleSelect(e.target.value)}>
                    <option value={0}>Choose Direction</option>
                    <option value={1}>Up</option>
                    <option value={-1}>Down</option>
                </select>
                <span>Select New Speaker:</span>
                <div className='thumbnail-container'>
                    {this.props.playerArr.map((ele) => {
                        return <img key={ele.id} 
                        className='panel-thumbnails' 
                        id={`speaker-thumbnail-${ele.id}`}
                        src={ele.gameRace.avatar}
                        onClick={() => {this.handleSubmit(ele.id)}}/>
                    })}
                </div>
            </div>
        )
    }
}