const rounds = await new Roll(`1d10`).roll()

const nameSt = "<strong style='color:#28ffff'>"
const resultSt = "<strong style='color: white'>"

const result_html = `<h1>${nameSt}APP HACK:</h1>*_echo</strong></br>Request hacking assistance from the AI housed inside. For the next ${resultSt}${rounds.total}</strong> rounds all tech/App-related rolls are -2DR`

const macro = game.macros.get("// uuid of ChatSpeaker macro")
const speak = await macro.execute({message: result_html})

