const axios = require('axios')

module.exports = class Root{
    constructor(id, key){
        this.appId = id
        this.appKey = key
    }

    // Working with models (devices) and makes (brands)

    // Get all models for all makes
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

    // get all models for a single make
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

    // get a specific model from it's name
    async getModelByName(name){

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

    // get the names of all makes
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

    async createQuote(type, modelName){
        console.log(type)
        console.log(modelName)
        let options = {
            baseURL: 'https://sandbox.root.co.za/v1/insurance/',
            url: '/quotes',
            method: 'post',
            data: {
                type: type,
                model_name: modelName
            },
            auth: {
                username: this.appId,
                password: this.appKey
            },
        }

        let result = await axios.request(options)
        return result.data
    }
}
