// MACRO FOR PLAYERS TO MOVE TO THE A CYBERSPACE SCENE CONNECTED TO THE CURRENT SCENE AND SPAWN A TOKEN THERE

// ASSURE MACRO ARGUMENTS
for (const arg of arguments) {
    if (arg === null) {
        return ui.notifications.warn(`${this.name}: Unable to get all macro arguments. Have you set a player character in the user config menu?`)
    }
}

// GET DESTINATION SCENE
const targetScene = game.scenes.get(game.scenes.current.getFlag('world', 'cyberspace-scene'))
if (typeof targetScene === 'undefined') {
    return ui.notifications.info(`${this.name}: The current scene does not have an associated cyberspace scene.`)
}

// AUTHENTICATE CHARACTER FOR DESTINATION SCENE 
let auth = (() => {
    const authId = targetScene.getFlag('world', 'cyberspace-auth')
    switch (typeof authId) {
        case 'undefined': // scene requires no authentication
            return true
        case 'string': // scene requires a key item
            for (const item of actor.items) {
                const src = item.getFlag('core', 'sourceId')
                if (src === null) continue;
                if (src.includes(authId)) return true
            }
            break;
        case 'object': // scene has a list of authenticated characters
            if (authId.includes(actor.uuid)) return true
        default:
            return false
    }
})();
if (!auth) {
    return ui.notifications.warn(`${this.name}: Your character is not authenticated for this cyberspace destination.`)
}

// @param {Boolean} delayed
async function migrateScene(delayed, token) {

    if (delayed) {

        // MAKE AND SHOW POPUP TEXT

        const warning = `
				<div 
					id="cyberspace-loading" 
					style="
						align-items:center;
						display:flex;
						height:100vh;
						justify-content:center;
						position:absolute;
						width:100vw
				">
					<div 
						style="
							background-color: rgba(24,240,129,0.1);
							backdrop-filter:blur(4px); 
							border:4px ridge #18f081; 
							box-shadow: 4px 4px 0px #28aaaa; 
							color:#18f081;font-family:'Kontrapunkt';
							padding:1%
					">
						<p style="font-size: 5em; font-weight: bold">Entering Cyberspace...</p>
						<hr style="border: 2px ridge #18f081"/>
						<div id="cyberspace-info" style="color:#28ffff;font-size: 1.5em">
							<p>{</p>
							<div style="padding-left:1em">
								<p>srv: ${targetScene.name}
								<p>usr: ${token.name}</p>
								<p>pos: {</p>
								<div style="padding-left: 1em">
									<p>x: ${token.x}</p>
									<p>y: ${token.y}</p>
								</div>
								<p>}
							</div>
							<p>}</p>
						</div>
					</div>
				</div>`

        $(warning).appendTo('body')

        // LOAD AND PLAY THE ENTERING THE MATRIX SOUND
        const enterTheMatrix = new foundry.audio.Sound(
            '0_CUSTOM/3_AUDIO/sfx/entering-cyberspace.ogg',
            { context: game.audio.environment }
        )
        await enterTheMatrix.load()
        await enterTheMatrix.play()

        // LOAD AND MOVE PLAYER TO SCENE WITH DELAY
        await game.scenes.preload(targetScene.id)
        setTimeout(async () => {
            await targetScene.view()
            $('#cyberspace-loading').remove()
        }, 3000)

    } else {
        await game.scenes.preload(targetScene.id)
        await targetScene.view()
    }
}

const actorTokensInDestination = await targetScene.tokens.filter(doc => doc.actorId === actor.id)
if (actorTokensInDestination.length === 0) {
    // IF NO TOKEN FOR ACTOR ON TARGET SCENE MAKE NEW TOKEN

    // GET MODIFICATIONS FOR IMAGE PATH AND OPTIONAL EXTRAS
    let mods = { texture: { src: token.document.texture.src.replace('.webp', '-digital.webp') } }

    // APPLY CYBERSPACE ALIAS IF ACTOR HAS ONE
    if (actor.getFlag('world', 'cyberspace-alias')) mods.name = actor.getFlag('world', 'cyberspace-alias')

    // IF TARGET SCENE HAS SPAWN POINT SET THOSE COORDS
    if (targetScene.getFlag('world', 'spawn-point')) {
        const spawn = targetScene.getFlag('world', 'spawn-point')
        for (const datum in spawn) mods[datum] = spawn[datum]
        if (spawn.customName) {
            delete mods.customName
            let setName = new Function('return ' + spawn.customName.toString())()
            mods.name = setName()
        }
    }

    const cyberspaceToken = await actor.getTokenDocument(mods)
    await targetScene.createEmbeddedDocuments('Token', [cyberspaceToken])

    migrateScene(true, cyberspaceToken)

} else {

    if (actorTokensInDestination.length > 1) {
        actorTokensInDestination.pop()
        const deletionIds = actorTokensInDestination.map(doc => doc.id)
        await targetScene.deleteEmbeddedDocuments('Token', deletionIds)
    }

    migrateScene(false)

}
