const nameSt = "<strong style='color:#28ffff'>"

const result_html = `<h1>${nameSt}APP HACK:</h1>Nok_Nok</strong></br>Open a nearby locked door. Failure may trigger an alarm.`

const macro = game.macros.get("// uuid of ChatSpeaker macro")
const speak = await macro.execute({message: result_html})

