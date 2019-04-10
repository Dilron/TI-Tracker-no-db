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
            gameRace: {},
            token: '',
            speaker: false
        }
        playerArr = [...playerArr, newPlayerObj]
        res.send(playerArr)
    }
}