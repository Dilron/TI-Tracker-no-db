import React, {Component} from 'react'
import './StrategyDraft.css'

export default class StrategyDraft extends Component {
    constructor(){
        super()
        this.state = {
            draftOrder: 0,
            draftArr: [{gameRace: {name: '...'}}]
        }
    }

    componentDidMount = () => {
        this.props.clearStrategyCards()
        let speakerIndex = this.props.playerArr.findIndex((ele) => ele.speaker)
        let tempArr = []
        if(this.props.speakerDir === 0){
            for(let i = speakerIndex; i < this.props.playerArr.length; i++){
                tempArr.push(this.props.playerArr[i])
            }
            if(tempArr.length !== this.props.playerArr.length){
                tempArr.push(...this.props.playerArr.slice(0, speakerIndex))
            }
        } else if(this.props.speakerDir === 1){
            for(let i = speakerIndex; i >= 0; i--){
                tempArr.push(this.props.playerArr[i])
            }
            if(tempArr.length !== this.props.playerArr.length){
                for(let i = this.props.playerArr.length - 1; i > speakerIndex; i--){
                    tempArr.push(this.props.playerArr[i])
                }
            }
        }
        this.setState({draftArr: tempArr})
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
        let {draftOrder, draftArr} = this.state
        return(
            <div className='draft-panel'>
                <span className='draft-panel-header'>{draftArr[draftOrder].gameRace.name} are choosing:</span>
                {this.props.strategyCards.map((ele) => {
                    if(ele.open){ 
                    return <img 
                    alt='draftable token'
                    className='draft-images-open' 
                    id={`draftcard${ele.id}`} 
                    src={ele.image} 
                    key={ele.id}
                    
                    onClick={() => this.handleStrategyClick(draftArr[draftOrder].id, ele.id)} />
                    } else {
                        return <img alt='non-draftable token' key={ele.id} className='draft-images-closed' src={`${ele.image}`} />
                    }
                })}
            </div>
        )
    }
}