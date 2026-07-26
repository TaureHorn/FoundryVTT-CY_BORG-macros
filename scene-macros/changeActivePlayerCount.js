// MACRO TO AUTO UPDATE A CANVAS DRAWING WITH NUMBER OF PLAYERS VIEWING A SPECIFIC SCENE

Hooks.on('renderSceneNavigation', async () => {
    targetScene = game.scenes.get('Iv3RvwMjsBGzQAcM')
    activeUsers = game.users.filter(u => u.viewedScene === targetScene.id && !u.isGM)
    console.log(`${this.name}: ${targetScene.name} has ${activeUsers.length} active players`)

    await targetScene.drawings.get('G6arjFe2nuUV7tgE').update({
        text: `${activeUsers.length + 1}/6 players`
    })
})
