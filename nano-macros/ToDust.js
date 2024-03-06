const nameSt = "<strong style='color:#b861ff'>"
const resultSt = "<strong style='color: white'>"

const result_html = `<h1>${nameSt}NANO POWER</h1>To Dust</strong></br>Half a cubic metre of inorganic matter turns to dust. If the target is attached to or in the hands of a conscious creature, the test to activate the power is DR14.`

const macro = game.macros.get("// uuid of ChatSpeaker macro")
const speak = await macro.execute({message: result_html})

