const rounds = await new Roll(`1d6`).roll()

const nameSt = "<strong style='color:#28ffff'>"
const resultSt = "<strong style='color: white'>"

const result_html = `<h1>${nameSt}APP HACK:</h1>De-fenc/der</strong></br>Take control of a nearby turret, drone or similar defence system for ${resultSt}${rounds.total}</strong> rounds.`

const macro = game.macros.get("// uuid of ChatSpeaker macro")
const speak = await macro.execute({message: result_html})

