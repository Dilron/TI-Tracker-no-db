let playerArr = []
let id = 1

module.exports = {
    read: (req, res) => {
        res.send(playerArr)
    },
    newPlayer: (req, res) => {
        let playerName = req.body.name
        let newPlayerObj = {
            id: id++,
            playerName: playerName,
            gameRace: {id: 0},
            token: '',
            speaker: false
        }
        playerArr = [...playerArr, newPlayerObj]
        res.send(playerArr)
    },
    remove: (req, res) => {
        let {id} = req.params
        id = parseInt(id)
        let pIndex = playerArr.findIndex((ele) => ele.id === id)
        playerArr.splice(pIndex, 1)
        res.send(playerArr)
    }
}