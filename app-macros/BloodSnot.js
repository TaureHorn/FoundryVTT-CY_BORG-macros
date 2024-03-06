const roll = await new Roll(`1d4`).roll()

const nameSt = "<strong style='color:#28ffff'>"
const resultSt = "<strong style='color: white'>"

const result_html = `<h1>${nameSt}APP HACK:</h1>Blood Snot</strong></br>Tracks down an enemy hacker and deals ${resultSt}${roll.total}</strong> damage each round until they pass a DR12 Knowledge test or die`

const macro = game.macros.get("// uuid of ChatSpeaker macro")
const speak = await macro.execute({message: result_html})

