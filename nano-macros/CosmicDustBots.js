const nameSt = "<strong style='color:#b861ff'>"

const result_html = `<h1>${nameSt}NANO POWER</h1>Cosmic Dust Bots</strong></br>An area of up to 20m in diameter is covered in dust and darkness for the duration of a fight or for 10 rounds. It tastes like stained, rusted metal.`

const macro = game.macros.get("// uuid of ChatSpeaker macro")
const speak = await macro.execute({message: result_html})

