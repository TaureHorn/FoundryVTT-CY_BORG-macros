const rounds = await new Roll(`1d6`).roll()

const nameSt = "<strong style='color:#b860ff'>"
const resultSt = "<strong style='color: white'>"

const result_html = `<h1>${nameSt}NANO POWER</h1>Bent Prism</strong></br>A person becomes invisible and attacks and defends at DR6. The effect lasts for ${resultSt}${rounds.total}</strong> rounds or until you are hurt.`

const macro = game.macros.get("// uuid of ChatSpeaker macro")
const speak = await macro.execute({message: result_html})

