import React, {Component} from 'react'
import './StrategyDraft.css'

export default class StrategyDraft extends Component {
    constructor(){
        super()
        this.state = {
            draftOrder: 0
        }
    }

    componentDidMount = () => {
        this.props.clearStrategyCards()
    }

    handleStrategyClick = (playerId, cardId) => {
        let newOrder = this.state.draftOrder
        this.props.assignStrategyCard(playerId, cardId)
        newOrder++
        if(newOrder < this.props.playerArr.length){
            this.setState({draftOrder: newOrder})
        } else {
            this.setState({draftOrder: 0})
            this.props.toggleStrategyPanel()
            this.props.handleDraftReset()
        }
    }
    
    render() {
        let {draftOrder} = this.state
        return(
            <div className='draft-panel'>
                <span className='draft-panel-header'>{this.props.playerArr[draftOrder].gameRace.name} are choosing:</span>
                {this.props.strategyCards.map((ele) => {
                    if(ele.open){ 
                    return <img 
                    alt='draftable token'
                    className='draft-images-open' 
                    id={`draftcard${ele.id}`} 
                    src={ele.image} 
                    key={ele.id}
                    onClick={() => this.handleStrategyClick(this.props.playerArr[draftOrder].id, ele.id)} />
                    } else {
                        return <img alt='non-draftable token' key={ele.id} className='draft-images-closed' src={`${ele.image}`} />
                    }
                })}
            </div>
        )
    }
}