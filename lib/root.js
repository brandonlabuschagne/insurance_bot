const axios = require('axios')

module.exports = class Root{
    constructor(id, key){
        this.appId = id
        this.appKey = key
    }

    async getModels(){
        let options = {
            baseURL: 'https://sandbox.root.co.za/v1/insurance/modules/root_gadgets',
            url: '/models',
            auth: {
                username: this.appId,
                password: this.appKey
            },
        }

        let result = await axios.request(options)
        return result.data
    }
}
