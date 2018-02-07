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

    async getModelsByMake(make){
        let options = {
            baseURL: 'https://sandbox.root.co.za/v1/insurance/modules/root_gadgets',
            url: '/models',
            auth: {
                username: this.appId,
                password: this.appKey
            },
        }

        let result = (await axios.request(options)).data

        var filteredResult = []

        for(var i = 0, len = result.length; i < len; i++){
            if(result[i]['make'].toLowerCase() == make.toLowerCase()){
                filteredResult.push(result[i])
            }
        }

        return filteredResult
    }

    async getModelByName(name){

        console.log(name)
        let options = {
            baseURL: 'https://sandbox.root.co.za/v1/insurance/modules/root_gadgets',
            url: '/models',
            auth: {
                username: this.appId,
                password: this.appKey
            },
        }

        let result = (await axios.request(options)).data

        for(var i = 0, len = result.length; i < len; i++){
            if(result[i]['name'].toLowerCase() == name.toLowerCase()){
                return result[i]
            }
        }

        return null
    }

    async getMakes(){
        let options = {
            baseURL: 'https://sandbox.root.co.za/v1/insurance/modules/root_gadgets',
            url: '/models',
            auth: {
                username: this.appId,
                password: this.appKey
            },
        }

        let result = (await axios.request(options)).data

        var makes = []

        for(var i = 0, len = result.length; i < len; i++){
            if(makes.indexOf(result[i]['make']) === -1){
                makes.push(result[i]['make'])
            }
        }

        return makes
    }
}
