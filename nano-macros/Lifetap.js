const success = await new Roll(`1d6`).roll()
const fail = await new Roll(`1d3`).roll()

const nameSt = "<strong style='color:#B861ff'>"
const resultSt = "<strong style='color: white'>"

const result_html = `${nameSt}NANO POWER:</br>Lifetap.</strong> Choose two targets, one to heal and one to hurt. A translucent oozing bridge of blood and energy flows between them, like oil in water.
    </br>
    </br>
    The healing target must succeed on a DR10 Presence test.
    </br>
    </br>
    <strong><em>Success</strong></em>
    The healing target heals ${resultSt}${success.total}</strong> HP while the other target takes the same amount of damage.
    </br>
    <strong><em>Failure</strong></em>
    Both targets take ${resultSt}${fail.total}</strong> damage.`

ChatMessage.create({
    user: game.user._id,
    speaker: ChatMessage.getSpeaker({token: actor}),
    content: result_html
});
