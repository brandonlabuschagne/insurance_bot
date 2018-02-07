const axios = require('axios')

module.exports = class Root{
    constructor(id, key){
        this.appId = id
        this.appKey = key
    }

    async get models(){
        let options = {
            baseURL: 'https://sandbox.root.co.za/v1/insurance/modules/root_gadgets',
            url: 'models',
            auth: {
                username: this.appId,
                password: this.appKey
            },
        }

        let result = await(axios.get(options))

        return result
    }
}
