const Discord = require('discord.js'), userBase = require("./Models/userBase")

module.exports = {
    addpoints: async(guild, user, type, amount) => {
        let data = await userBase.findOne({ guild: guild, user: user })
        if(!data) {
            data = new userBase({ guild: guild, user: user })
            await data.save()
        }

        type == "others" ? amount = Number(amount) : amount = 1

        data.points[type] = parseInt(data.points[type] + amount)
        await data.save();
    },

    removepoints: async(guild, user, type, amount) => {
        let data = await userBase.findOne({ guild: guild, user: user })
        if(!data) {
            data = new userBase({ guild: guild, user: user })
            await data.save()
        }

        type == "others" ? amount = Number(amount) : amount = 1

        data.points[type] = parseInt(data.points[type] - amount)
        await data.save();
    },

    sleep: (ms) => { 
        return new Promise((r) => setTimeout(() => r(ms), ms)); 
    },

    checkInv: (inv, tools) => {
        for(var tool of tools) {
            let required_number = parseInt(tool.split(" ")[0], 10),
            required_name = tool.split(" ")[1]

            if(!required_number) required_number = 1

            const test_item = inv.find((item) => item.name.toLowerCase() == required_name.toLowerCase() && item.count >= required_number);
            if(!test_item) return false;

            return true
        }
    },

    checkStore: (store, values) => {
        for(var value of values) {
            const test_item = store.find((item) => item.name.toLowerCase() == value.toLowerCase());
            if(!test_item) return { status: false, value: value };

            return { status: true }
        }  
    }
}