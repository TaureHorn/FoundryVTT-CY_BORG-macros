const dog = await new Roll(`d6`).roll()
const human = await new Roll(`1d10`).roll()
const car = await new Roll(`2d8`).roll()
const big = await new Roll(`2d12`).roll()

const nameSt = "<strong style='color:#28ffff'>"
const resultSt = "<strong style='color: white'>"

const result_html = `<h1>${nameSt}APP HACK:</h1>DvG-sling</strong></br>Deal damage to a cybered target or drone/vehicle/mech based on their size:
</br>
<div style="border: 1px solid #28ffff; padding: 5px">
    ${resultSt}${dog.total}</strong> to dog sized targets,
    </br>
    ${resultSt}${human.total}</strong> to human sized targets,
    </br>
    ${resultSt}${car.total}</strong> to car sized targets,
    </br>
    ${resultSt}${big.total}</strong> to larger targets,
</div>`

game.user.hasRole("GAMEMASTER") ?
    ChatMessage.create({
        user: game.user._id,
        speaker: ChatMessage.getSpeaker({ token: actor }),
        content: result_html,
        whisper: game.users.filter(u => u.isGM)
    })
    :
    ChatMessage.create({
        user: game.user._id,
        speaker: ChatMessage.getSpeaker({ token: actor }),
        content: result_html,
    });

