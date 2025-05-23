// macro for players to move to the cyberspace version of a map and spawn a new token there

// GET DESINATION SCENE
const cyberspaceId = game.scenes.current.getFlag('world', 'cyberspace-scene')
if (typeof cyberspaceId === 'undefined') {
	return ui.notifications.warn(`${this.name}: The current scene does not have an associated cyberspace scene`)
}
const targetScene = game.scenes.get(cyberspaceId)

// GET TOKEN; EITHER CONTROLLED OR THE TOKEN FOR USERS CURRENT CHARACTER SET IN USER CONFIG
let token = canvas.tokens.controlled.length
	? canvas.tokens.controlled[0].document.clone()
	: game.scenes.current.tokens.find(token => token.actorId === game.user.character.id).clone()

// GET MODIFICATIONS FOR IMAGE PATH AND OPTIONAL SPAWN POSITION
let modifications = {	texture: {	src: token.texture.src.replace('.webp', '-digital.webp')}}

if (targetScene.getFlag('world', 'spawn-point')) {
	// IF TARGET HAS SET SPAWN POSITION ADD THOSE COORDS TO MODIFICATIONS
	const spawn = targetScene.getFlag('world', 'spawn-point')
	modifications.x = spawn.x
	modifications.y = spawn.y
}

// CREATE NEW TOKEN FOR ACTOR WITH MODIFICATIONS AND ADD TOKEN DOCUMENT TO SCENES TOKEN COLLECTION
const newToken = await token.actor.getTokenDocument(modifications)
await targetScene.createEmbeddedDocuments('Token', [newToken])

// IF MORE THAN ONE TOKEN OF ACTOR IN NEW SCENE > DELETE ALL BUT NEWEST TOKEN FOR ACTOR
const targetTokens = await targetScene.getEmbeddedCollection('Token').filter(doc => doc.actorId === newToken.actorId)

if (targetTokens.length > 1) {
	targetTokens.pop()
	const deletionIds = targetTokens.map(doc => doc.id)
	await targetScene.deleteEmbeddedDocuments('Token', deletionIds)
}

// SWITCH PLAYERS VIEW OVER TO TARGET SCENE
await targetScene.view()
