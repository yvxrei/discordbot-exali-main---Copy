module.exports = async (client) =>{
    const guild = client.guilds.cache.get('333209149464641536')
    setInterval(()=>{
        const memberCount = guild.memberCount
        const channel = guild.channels.cache.get('1008788253329068086')
        channel.setName(`Total members: ${memberCount.toLocaleString()}`)
        console.log('Updating Member Count')
    }, 5000)
}