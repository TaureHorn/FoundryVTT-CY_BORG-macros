const nameSt = "<strong style='color:#28ffff'>"
const resultSt = "<strong style='color: white'>"

const result_html = `<h1>${nameSt}APP HACK:</h1>RDCOvrChargr</strong></br>One target get ${resultSt}+d6</strong> on all Agility and Strength tests for Knowledge+3 rounds.`

const macro = game.macros.get("// uuid of ChatSpeaker macro")
const speak = await macro.execute({message: result_html})

