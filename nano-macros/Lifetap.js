const success = await new Roll(`1d6`).roll()
const fail = await new Roll(`1d3`).roll()

const nameSt = "<strong style='color:#B861ff'>"
const resultSt = "<strong style='color: white'>"

const result_html = `<h1>${nameSt}NANO POWER</h1>Lifetap</strong></br>Choose two targets, one to heal and one to hurt. The healing target tests Presence DR10 to heal ${resultSt}${success.total}</strong> damage, while the second target is dealt ${resultSt}${success.total}</strong> damage.</br></br>Failure deals both targets ${resultSt}${fail.total}</strong> damage. A translucent, oozing bridge of blood and energy flows between the creatures, like oil in water.`

const macro = game.macros.get("// uuid of ChatSpeaker macro")
const speak = await macro.execute({message: result_html})

