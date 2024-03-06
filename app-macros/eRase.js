const nameSt = "<strong style='color:#28ffff'>"

const result_html = `<h1>${nameSt}APP HACK:</h1>>eRase</strong></br>Cut or copy the latest 10 minutes of stored information from any type of recording/surveillance device.`

const macro = game.macros.get("// uuid of ChatSpeaker macro")
const speak = await macro.execute({message: result_html})

