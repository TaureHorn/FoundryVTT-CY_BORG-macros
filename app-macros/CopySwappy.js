const rounds = await new Roll(`1d10`).roll()

const nameSt = "<strong style='color:#28ffff'>"
const resultSt = "<strong style='color: white'>"

const result_html = `<h1>${nameSt}APP HACK:</h1>CopySwappy</strong></br>For ${resultSt}${rounds.total}</strong> rounds, all tech will mistake you for another person within 30m and vice versa.`

const macro = game.macros.get("// uuid of ChatSpeaker macro")
const speak = await macro.execute({message: result_html})

