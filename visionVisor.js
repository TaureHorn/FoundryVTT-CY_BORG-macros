let views = {
    'standard': {
        'detectionModes': {
            0: {
                'enabled': true,
                'id': 'basicSight',
                'range': 2,
            },
            1: {
                'enabled': true,
                'id': 'lightPerception',
                'range': null,
            }
        },
        'sight': {
            'color': null,
            'contrast': 0,
            'range': 2,
            'visionMode': 'darkvision'
        }
    },
    'nightEyes': {
        'detectionModes': {
            0: {
                'enabled': true,
                'id': 'basicSight',
                'range': 10,
            },
            1: {
                'enabled': true,
                'id': 'lightPerception',
                'range': null,
            }
        },
        'sight': {
            'color': null,
            'contrast': 0,
            'range': 10,
            'visionMode': 'darkvision',
        },

    },
    'visionVisor': {
        'detectionModes': {
            0: {
                'enabled': true,
                'id': 'seeAll',
                'range': 200,
            },
            1: {
                'enabled': true,
                'id': 'basicSight',
                'range': 0,
            },
            2: {
                'enabled': true,
                'id': 'lightPerception',
                'range': null,
            }
        },
        'sight': {
            'color': '#26a269',
            'contrast': 1,
            'range': 200,
            'visionMode': 'monochromatic'
        }
    }
}
// get token and actor data find if nighteyes equipped
if (canvas.tokens.controlled.length < 1) {
    ui.notifications.warn('You must select a token')
    return
}
const token = canvas.tokens.controlled[0].document
const actor = game.actors.get(token.actorId)
let normal = 'standard'
if (actor.items.find((obj) => (obj.name === 'NightEyes' && obj.system.equipped === true))) {
    normal = 'nightEyes'
}
if (!actor.items.find(obj => obj.name === 'Visionvisor') && !game.user.isGM) {
    ui.notifications.warn('You do not own a Visionvisor')
    return
}

// get if visionVisor already enbaled for token
const enabled = token.getFlag('world', 'visionVisor')
const viewMode = enabled ? normal : 'visionVisor'

// set data for token update
const sight = views[viewMode].sight
const detectionModes = views[viewMode].detectionModes
token.update({ 'detectionModes': detectionModes, 'sight': sight })
await token.setFlag('world', 'visionVisor', !enabled)
