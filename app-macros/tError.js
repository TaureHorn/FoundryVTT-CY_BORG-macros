const rounds = await new Roll(`1d4`).roll()

const nameSt = "<strong style='color:#28ffff'>"
const resultSt = "<strong style='color: white'>"

const result_html = `<h1>${nameSt}APP HACK:</h1>tError</strong></br>Target's RCD render subliminal, personalised nightmare imagery that distorts reality. Test Presence DR14 or unable to act for ${resultSt}${rounds.total}</strong> rounds.`

const macro = game.macros.get("// uuid of ChatSpeaker macro")
const speak = await macro.execute({message: result_html})

