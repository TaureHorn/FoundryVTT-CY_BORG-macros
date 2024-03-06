const nameSt = "<strong style='color:#28ffff'>"

const result_html = `<h1>${nameSt}APP HACK:</h1>PathMapper</strong></br>Users nearby sensors, cameras and public information to create a detailed 3D map of the surrounding ~100m`

const macro = game.macros.get("// uuid of ChatSpeaker macro")
const speak = await macro.execute({message: result_html})

