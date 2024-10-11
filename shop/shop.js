
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
            if (data.action === 'submit-product') {
                this.handlePurchase(data.productId)
            }
        })
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
                const newItems = {...user.items}
                // increment items quantity
                ++ (newItems._source.find((obj) => obj.name === item.name && obj.system.description === item.system.description).system.quantity)
                await user.update({'items': newItems})
            }
        }

        const modifiers = game.user.getFlag('world', 'cy_borg-shop')
        const price = Math.ceil((item.system.price * modifiers.deliveryModifier) + modifiers.transactionFee)
        if (user.system.credits >= price) {
            // if they can afford to buy the item; update credits - price
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
        const dark = '#111111'
        setTimeout(() => {
            const shops = Array.from(document.getElementsByClassName('scamazon-app'))
            shops.forEach((shop) => {
                const bg = colors[Math.floor(Math.random() * colors.length)]
                shop.style.color = dark
                shop.style.background = `${bg} url(0_CUSTOM/2_ASSETS/misc/screentone-15%25op.png)`
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
        
        game.users.forEach(async (user) => {
            await user.setFlag('world', 'cy_borg-shop', formData)
        })
    }

}

new Scamazon().toggle(true)

