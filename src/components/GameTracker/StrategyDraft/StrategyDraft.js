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
        return(
            <div className='draft-panel'>
                <span className='draft-panel-header'>... Choosing:</span>
                {this.props.strategyCards.map((ele) => {
                    if(ele.open){ 
                    return <img 
                    className='draft-images-open' 
                    id={`draftcard${ele.id}`} 
                    src={ele.image} 
                    key={ele.id}
                    onClick={() => this.handleStrategyClick(this.props.playerArr[this.state.draftOrder].id, ele.id)} />
                    } else {
                        return <img className='draft-images-closed' src={`${ele.image}`} />
                    }
                })}
            </div>
        )
    }
}