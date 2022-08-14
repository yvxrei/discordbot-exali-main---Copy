const Canvas = require("canvas")
const Discord = require("discord.js")
const background = "attempt.jpg" 

const dim = {
    height: 675,
    width: 1200,
    margin: 50
}

const av = {
    size: 256,
    x: 480,
    y: 170
}

const generateImage = async (member) => {
    let username = member.user.username
    let discrim = member.user.discriminator
    let avatarURL = member.user.displayAvatarURL({extension: "png", dynamic: false, size: av.size})

    const canvas = Canvas.createCanvas(dim.width, dim.height)
    const ctx = canvas.getContext("2d")

    // draw in the background
    const backimg = await Canvas.loadImage(background)
    ctx.drawImage(backimg, 0, 0)

    // draw black tinted box
    ctx.fillStyle = "rgba(0,0,0,0.8)"
    ctx.fillRect(dim.margin, dim.margin, dim.width - 2 * dim.margin, dim.height - 2 * dim.margin)

    const avimg = await Canvas.loadImage(avatarURL)
    ctx.save()
    
    //comment if you want square pfp

 /*
   ctx.beginPath()
   ctx.arc(av.x + av.size * 2 , av.y + av.size * 2, av.size * 2, 0,2 * Math.PI , true)
   ctx.closePath()
   ctx.clip()

    ctx.drawImage(avimg, av.x, av.y)
    ctx.restore() 
*/
ctx.save()

async function drawUserAvatar(ctx, avatar, avatar) {
    const arcX = avatar.x + (avatar.w / 2)
    const arcY = avatar.y + (avatar.h / 2)

    ctx.beginPath()
    ctx.arc(arcX, arcY, (avatar.w + 3) / 2, 0, Math.PI * 2, true)
    ctx.closePath()
    ctx.fillStyle = '#242424'
    ctx.fill()
    ctx.beginPath()
    ctx.arc(arcX, arcY, avatar.w / 2, 0, Math.PI * 2, true)
    ctx.closePath()
    ctx.clip()

    const avImg = await Canvas.loadImage(member.user.displayAvatarURL({ extension: "png" }))

    ctx.drawImage(avImg, avatar.x, avatar.y, avatar.w, avatar.h)
}      
await drawUserAvatar(ctx, member, { w: av.size, h: av.size, x: av.x, y: av.y })
ctx.restore()

    // write in text
    ctx.fillStyle = "white"
    ctx.textAlign = "center"

    // draw in Welcome
    ctx.font = "50px Roboto"
    ctx.fillText("Welcome", dim.width/2, dim.margin + 70)

    // draw in the username
    ctx.font = "60px Roboto"
    ctx.fillText(username , dim.width/2, dim.height - dim.margin - 125)

    // draw in to the server
    ctx.font = "40px Roboto"
    ctx.fillText("to the server", dim.width / 2, dim.height - dim.margin - 50)

    const attachment = new Discord.AttachmentBuilder(canvas.toBuffer(), "welcome.jpg")
    return attachment
}

module.exports = generateImage