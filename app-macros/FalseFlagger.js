const delay = await new Roll(`2d6`).roll()

const nameSt = "<strong style='color:#28ffff'>"
const resultSt = "<strong style='color: white'>"

const result_html = `<h1>${nameSt}APP HACK:</h1>False Flagger</strong></br>Fake an alarm or the location of a triggered alarm. Any response to the real alarm is delayed by ${resultSt}${delay.total}</strong> minutes.`

const macro = game.macros.get("// uuid of ChatSpeaker macro")
const speak = await macro.execute({message: result_html})

