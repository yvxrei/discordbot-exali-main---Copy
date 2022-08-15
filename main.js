const Discord = require("discord.js")
require("dotenv").config()

const memberCounter = require('./counters/member-counter')

const generateImage = require ("./generateImage")

    const client = new Discord.Client({
        intents: [
            "Guilds",
            "GuildMessages",
            "MessageContent",
            "GuildMembers"
        ]
    })

    let bot = {
        client
    }

    client.on("ready", () => {
        console.log(`Logged in as ${client.user.tag}`)
        memberCounter(client)
    })

    client.on("messageCreate", (message) => {
        if (message.content == "hi"){
            message.reply("Hello World!")
        }
    })

    client.on("messageCreate", (message) => {
        if (message.content == "fuzze"){
            message.reply("fuzzy gatinho meow :3")
        }
    })
    client.on("messageCreate", (message) => {
        if (message.content == "fart"){
            message.reply("https://c.tenor.com/bQaOSEg8giUAAAAC/fire-ass-fire-butt.gif")
        }
    })

    client.slashcommands = new Discord.Collection() 

    client.loadSlashCommands = (bot, reload) => require("./handlers/slashcommands")(bot, reload)
    client.loadSlashCommands(bot, false)

    client.on("interactionCreate", (interaction) => {
        if (!interaction.isCommand()) return 
        if (!interaction.inGuild()) return interaction.reply("This command can only be used in a server")
    
        const slashcmd = client.slashcommands.get(interaction.commandName)
    
        if (!slashcmd) return interaction.reply("Invalid slash command")
    
        if (slashcmd.perm && !interaction.member.permissions.has(slashcmd.perm))
            return interaction.reply("You do not have permission for this command")
    
        slashcmd.run(client, interaction)
    })

    const welcomeChannelId = "460400962545254400"

    client.on("guildMemberAdd", async (member) => {
        const img = await generateImage(member)
        member.guild.channels.cache.get(welcomeChannelId).send({
            content: `<@${member.id}> Welcome to the server!`,
            files: [img]
        })
    }) 
client.login(process.env.TOKEN)