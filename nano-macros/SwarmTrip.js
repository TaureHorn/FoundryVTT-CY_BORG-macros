const nameSt = "<strong style='color:#b861ff'>"

const result_html = `<h1>${nameSt}NANO POWER</h1>Swarm Trip</strong></br>Your mind is transferred to a flying swarm of bacteria for 10 minutes You can move through any crack or hold, and you can see whatever the swarm sees but not hear or interact with anything. If your body is killed or if you are not back at your body when the 10 minutes are up, you are stuck in the swarm forever.`

ChatMessage.create({
    user: game.user._id,
    speaker: ChatMessage.getSpeaker({ token: actor }),
    content: result_html
});
