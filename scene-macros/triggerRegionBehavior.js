// MANUALLY TRIGGER A GIVEN REGION BEHAVIOUR ONCE
// ARGS: String behaviorUuid

// INPUT CHECKING
if (!game.user.isGM) return
if (typeof behaviorUuid === 'undefined' || typeof behaviorUuid != 'string') {
    return ui.notifications.warn(`${this.name}: behaviorUuid not provided or is not a string`)
}

// GET REGION BEHAVIOUR
const regionBehavior = await fromUuid(behaviorUuid)
if (!regionBehavior) {
    return ui.notifications.warn(`${this.name}: a region behavior with that uuid was not found`)
}

async function updateBehavior(state, delay) {;
    setTimeout(async () => {
        await regionBehavior.update({ disabled: state })
    }, delay);
}

// ENSURE DISABLED >> ENABLE TO TRIGGER EVENT >> RESET BACK TO DISABLED
updateBehavior(true, 100)
updateBehavior(false, 500)
updateBehavior(true, 1000)

