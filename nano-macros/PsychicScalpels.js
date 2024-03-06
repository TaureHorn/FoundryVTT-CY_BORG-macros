const damage = await new Roll(`1d10`).roll()

const nameSt = "<strong style='color:#b861ff'>"
const resultSt = "<strong style='color: white'>"

const result_html = `<h1>${nameSt}NANO POWER</h1>Psychic Scalpels</strong></br>A living target of your choice tests Presence DR14 or loses ${resultSt}${damage.total}</strong> HP. Their eyes bleed, and their ears ring.`

const macro = game.macros.get("// uuid of ChatSpeaker macro")
const speak = await macro.execute({message: result_html})

