const nameSt = "<strong style='color:#28ffff'>"

const result_html = `<h1>${nameSt}APP HACK:</h1>WEIAN-Hammer</strong><br>Nearby devices are triggered to perform their function, i.e. open/close unlocked doors, trigger sprinklers, start a camera recording, adjust to AC. YOu can trigger 5 devies as you choose over the next 5 rounds`

const macro = game.macros.get("// uuid of ChatSpeaker macro")
const speak = await macro.execute({message: result_html})

