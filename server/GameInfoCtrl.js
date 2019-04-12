let factions = [
    {id: 1, name: 'The Arborec', avatar: 'https://i.imgur.com/qrVtqhm.png'},
    {id: 2, name: 'The Embers of Muaat', avatar: 'https://i.imgur.com/f90C0n0.png'},
    {id: 3, name: 'The Ghosts of Creuss', avatar: 'https://i.imgur.com/OWZEp03.png'},
    {id: 4, name: 'The Naalu Collective', avatar: 'https://i.imgur.com/7lbLfjB.png'},
    {id: 5, name: 'The Universities of Jol-Nar', avatar: 'https://i.imgur.com/uE3a8Jy.png'},
    {id: 6, name: 'The Yin Brotherhood', avatar: 'https://i.imgur.com/APQd7ob.png'},
    {id: 7, name: 'The Barony of Letnev', avatar: 'https://i.imgur.com/EfuY8r8.png'},
    {id: 8, name: 'The Emirates of Hacan', avatar: 'https://i.imgur.com/Rl1lhcb.png'},
    {id: 9, name: 'The L1Z1X Mindnet', avatar: 'https://i.imgur.com/lifehTi.png'},
    {id: 10, name: 'The Nekro Virus', avatar: 'https://i.imgur.com/ADYhFQW.png'},
    {id: 11, name: 'The Winnu', avatar: 'https://i.imgur.com/tirYKC1.png'},
    {id: 12, name: 'The Yssaril Tribes', avatar: 'https://i.imgur.com/hZo484V.png'},
    {id: 13, name: 'The Clan of Saar', avatar: 'https://i.imgur.com/7qkrSaS.png'},
    {id: 14, name: 'The Federation of Sol', avatar: 'https://i.imgur.com/3r3LwXh.png'},
    {id: 15, name: 'The Mentak Coalition', avatar: 'https://i.imgur.com/aaMDKIo.png'},
    {id: 16, name: "The Sardakk N'orr", avatar: 'https://i.imgur.com/pAVznIC.png'},
    {id: 17, name: 'The Xxcha Kingdom', avatar: 'https://i.imgur.com/lGLfVFC.png'}
]

let strategyCards = [
    {id: 1, image: 'https://i.imgur.com/rNuoi0Y.png'},
    {id: 2, image: 'https://i.imgur.com/MSga4OI.png'},
    {id: 3, image: 'https://i.imgur.com/6DmDjpe.png'},
    {id: 4, image: 'https://i.imgur.com/fAiyBbA.png'},
    {id: 5, image: 'https://i.imgur.com/H1nznN9.png'},
    {id: 6, image: 'https://i.imgur.com/i3Vr5j5.png'},
    {id: 7, image: 'https://i.imgur.com/sNNqlZN.png'},
    {id: 8, image: 'https://i.imgur.com/mceAGWL.png'}
]

module.exports = {
    readFactions: (req, res) => {
        res.send(factions)
    },
    readStrategyCards: (req, res) => {
        res.send(strategyCards)
    }
}