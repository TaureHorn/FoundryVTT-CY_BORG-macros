const availableNano = ["Cosmic Dust Bots", "Crawling Carapace", "Bent Prism", "Benevolent Suturedroids"]
const selectedNano = []

function randNo(max) {
    return Math.floor(Math.random() * max)
}

const amount = await new Roll(`1d3-1`).roll()

for (i = 0; i < amount.total; i++) {
    const index = randNo(availableNano.length)
    selectedNano.push(availableNano[index])
    availableNano.splice(index, 1)
}

const nanos = selectedNano.join(" and ")

const nameSt = "<strong style='color:#B861ff'>"
const resultSt = "<strong style='color: white'>"

let result_html = ""
switch (amount.total) {
    case 0:
        result_html = `The ${nameSt}Heir of Kergoz</strong> has only the ${resultSt}Psychic Scalpels</strong> nano power available`
        break;
    case 1:
        result_html = `The ${nameSt}Heir of Kergoz</strong> nano powers are ${resultSt}Psychic Scalpels and ${nanos}</strong>.`
        break;
    case 2:
        result_html = `The ${nameSt}Heir of Kergoz</strong> nano powers are ${resultSt}Psychic Scalpels, ${nanos}</strong>.`
        break;
}

game.user.hasRole("GAMEMASTER") ?
    ChatMessage.create({
        user: game.user._id,
        speaker: ChatMessage.getSpeaker({ token: actor }),
        content: result_html,
        whisper: game.users.filter(u => u.isGM)
    })
    :
    ChatMessage.create({
        user: game.user._id,
        speaker: ChatMessage.getSpeaker({ token: actor }),
        content: result_html,
    });

