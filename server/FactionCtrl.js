let factions = [
    {id: 1, name: 'The Arborec', thumbNail: 'img'},
    {id: 2, name: 'The Embers of Muaat', thumbNail: 'img'},
    {id: 3, name: 'The Ghosts of Creuss', thumbNail: 'img'},
    {id: 4, name: 'The Naalu Collective', thumbNail: 'img'},
    {id: 5, name: 'The Universities of Jol-Nar', thumbNail: 'img'},
    {id: 6, name: 'The Yin Brotherhood', thumbNail: 'img'},
    {id: 7, name: 'The Barony of Letnev', thumbNail: 'img'},
    {id: 8, name: 'The Emirates of Hacan', thumbNail: 'img'},
    {id: 9, name: 'The L1Z1X Mindnet', thumbNail: 'img'},
    {id: 10, name: 'The Nekro Virus', thumbNail: 'img'},
    {id: 11, name: 'The Winnu', thumbNail: 'img'},
    {id: 12, name: 'The Yssaril Tribes', thumbNail: 'img'},
    {id: 13, name: 'The Clan of Saar', thumbNail: 'img'},
    {id: 14, name: 'The Federation of Sol', thumbNail: 'img'},
    {id: 15, name: 'The Mentak Coalition', thumbNail: 'img'},
    {id: 16, name: "The Sardakk N'orr", thumbNail: 'img'},
    {id: 17, name: 'The Xxcha Kingdom', thumbNail: 'img'}
]

module.exports = {
    read: (req, res) => {
        res.send(factions)
    }
}