const targets = await new Roll(`1d4`).roll()

const nameSt = "<strong style='color:#b861ff'>"
const resultSt = "<strong style='color: white'>"

const result_html = `<h1>${nameSt}NANO POWER</h1>Crawling Carapace</strong></br>${resultSt}${targets.total}</strong> targets gain -d6 armour for 4 rounds. Sometimes it feels as if this thing has a will of its own, but that's probably just your imagination.`

const macro = game.macros.get("// uuid of ChatSpeaker macro")
const speak = await macro.execute({message: result_html})

