
Handlebars.registerHelper('equals', function(item1, item2, options) {
    if (item1 === item2) {
        return options.fn(this)
    } else {
        return options.inverse(this)
    }
})

Handlebars.registerHelper('math', function() {
    let args = []
    for (const arg in arguments) {
        args.push(arguments[arg])
    }
    return eval(args.toString().replaceAll(',', ''))
})

class Scamazon extends FormApplication {

        static get defaultOptions() {
            const defaults = super.defaultOptions;
            const overrides = {
                classes: ['scamazon-app'],
                closeOnSubmit: false,
                height: 900,
                id: `scamazon-app-${game.userId}`,
                popOut: true,
                minimizable: true,
                resizable: true,
                tabs: [{ navSelector: '.scamazon-tab-selector', contentSelector: '.scamazon-tab', initial: 'weapons' }],
                template: '0_CUSTOM/2_ASSETS/_code/macros/shop/shop.hbs',
                width: 700
            }
            return foundry.utils.mergeObject(defaults, overrides)
        }

        TABS = [
            { tab: "weapons", label: "WEAPONS" },
            { tab: "cytech", label: "CYTECH" },
            { tab: "armor", label: "ARMOR" },
            { tab: "equipment", label: "EQUIPMENT" },
            { tab: "drugs", label: "DRUGS" },
        ]

        getData() {
            const data = {}
            const types = ['armor', 'equipment', 'weapon']
            types.forEach((type) => {
                data[type] = game.items.filter((obj) => obj.type === type && obj.system.price > 0 && !obj.system.illegal)
            })
            data._TABS = this.TABS
            data._GM = game.user.isGM
            data.fees = game.user.getFlag('world', 'cy_borg-shop')

            return data
        }

        activateListeners(html) {
            super.activateListeners(html)
            html.on('click', '[data-action]', async (event) => {
                const data = $(event.currentTarget).data()
                switch (data.action) {
                    case 'inspect':
                        this.handleInspect(data.productId)
                        break;
                    case 'submit-product':
                        this.handlePurchase(data.productId)
                        break;
                    default:
                        console.error('Scamazon.activateListeners recieved and invalid data-action')
                }
            })
        }

        handleInspect(id) {
            game.items.get(id).sheet.render(true)
        }

        async handlePurchase(id) {
            const item = game.items.get(id)
            const user = game.user.character

            async function giveItem(item) {
                if (!user.items.some(ownedItem => ownedItem.name === item.name && ownedItem.system.description === item.system.description)) {
                    // if user doesn't own $item, give them one
                    await user.createEmbeddedDocuments('Item', [item])
                } else {
                    // if user does own $item, incremement the items quantity
                    const newItems = { ...user.items }
                    // increment items quantity
                    ++(newItems._source.find((obj) => obj.name === item.name && obj.system.description === item.system.description).system.quantity)
                    await user.update({ 'items': newItems })
                }
            }

            async function soundAlert() {
                const bloop = new foundry.audio.Sound('0_CUSTOM/3_AUDIO/sfx/electronic-click.ogg', { 'context': game.audio.interface })
                await bloop.load()
                await bloop.play()
            }

            const modifiers = game.user.getFlag('world', 'cy_borg-shop')
            const price = Math.ceil((item.system.price * modifiers.deliveryModifier) + modifiers.transactionFee)
            if (user.system.credits >= price) {
                // if they can afford to buy the item; update credits - price
                await soundAlert()
                await user.update({ 'system.credits': user.system.credits - price })
                await giveItem(item)
            } else {
                // if they cannot afford to buy the item; warn, chastise and shame them
                const warnings = [
                    "You can't afford that!",
                    "GET A JOB!",
                    "Yo, that's not a lot of money you got there",
                    "You'll have to blast so many more gang-goons before you could afford that",
                    "Better see your fixer. You need more creds",
                    "Take out a loan. You're outta cred",
                    "Only thing you're getting is a sense of shame for your poor financial situation"
                ]
                ui.notifications.warn(warnings[Math.floor(Math.random() * warnings.length)])
            }

        }

        render(...args) {
            super.render(...args)
            this.updateAppClasses()
        }

        toggle(...args) {
            if (document.getElementById(this.options.id)) {
                Object.values(ui.windows).find((obj) => obj.id === this.options.id).close()
            } else {
                this.render(...args)
            }
        }

        updateAppClasses() {
            const colors = ['#28a1a1', '#f3e600', '#1cd577', '#ff0055', '#fd932d']
            const png = [
                '0_CUSTOM/2_ASSETS/misc/dither-arc.png',
                '0_CUSTOM/2_ASSETS/misc/dither-chaos_33pc.png',
                '0_CUSTOM/2_ASSETS/misc/dither-diagonal_20pc.png',
                '0_CUSTOM/2_ASSETS/misc/dither-swirl_50pc.png'
            ]
            const dark = '#111111'
            setTimeout(() => {
                const shops = Array.from(document.getElementsByClassName('scamazon-app'))
                shops.forEach((shop) => {
                    const bg = colors[Math.floor(Math.random() * colors.length)]
                    const overlay = png[Math.floor(Math.random() * png.length)]
                    shop.style.color = dark
                    shop.style.background = `${bg} url(${overlay})`
                    shop.style.border = `5px solid ${dark}`
                    shop.style.borderBottom = 'none'
                    shop.style.borderRadius = '3em'
                    const header = shop.children[0]
                    header.style.border = 'none'
                    const window = shop.children[1]
                    window.style.background = 'unset'
                })
            }, 100)
        }

        async _updateObject(event, formData) {

            if (game.user.isGM) {
                game.users.forEach(async (user) => {
                    await user.setFlag('world', 'cy_borg-shop', formData)
                })
            }

        }

    }

new Scamazon().toggle(true)

