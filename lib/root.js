const axios = require('axios')

module.exports = class Root{
    constructor(id, key){
        this.appId = id
        this.appKey = key
        this.baseUrl = 'https://sandbox.root.co.za/v1/insurance'
        this.baseGadgetUrl = 'https://sandbox.root.co.za/v1/insurance/modules/root_gadgets'
    }

    // Working with models (devices) and makes (brands)

    // Get all models for all makes
    async getModels(){
        let options = {
            baseURL: this.baseGadgetUrl,
            url: '/models',
            auth: {
                username: this.appId,
                password: this.appKey
            },
        }

        let result = await axios.request(options)
        return result.data
    }

    // Get all models for all makes whose names are a superstring of `name`
    async getModelByFuzzyName(name){
        let options = {
            baseURL: this.baseGadgetUrl,
            url: '/models',
            auth: {
                username: this.appId,
                password: this.appKey
            },
        }

        let result = (await axios.request(options)).data

        var filteredResult = []

        for(var i = 0, len = result.length; i < len; i++){
            if(result[i]['name'].toLowerCase().includes(name.toLowerCase())){
                filteredResult.push(result[i]['name'])
            }
        }

        return filteredResult
    }

    // get all models for a single make
    async getModelsByMake(make){
        let options = {
            baseURL: this.baseGadgetUrl,
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
            baseURL: this.baseGadgetUrl,
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
            baseURL: this.baseGadgetUrl,
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

    // create a new quote for a device
    async createQuote(type, modelName){
        let options = {
            baseURL: this.baseUrl,
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

        try{
            let result = await axios.request(options)
            return result.data
        }catch(error){
            console.error(error)
        }
    }

    // create a policy holder
    async createPolicyHolder(idType, idNumber, idCountry, firstName, lastName, email){
        let options = {
            baseURL: this.baseUrl,
            url: '/policyholders',
            method: 'post',
            data: {
                "id": {
                    "type": idType,
                    "number": idNumber,
                    "country": idCountry
                },
                "first_name": firstName,
                "last_name": lastName,
                "email": email,
            },
            auth: {
                username: this.appId,
                password: this.appKey
            },
        }

        try{
            let result = await axios.request(options)
            return result.data
        }catch(error){
            console.error(error)
        }
    }

    // create an application for a policy
    async createApplication(monthlyPremium, quotePackageId, serialNumber, policyHolderId){

        let options = {
            baseURL: this.baseUrl,
            url: '/applications',
            method: 'post',
            data: {
                "monthly_premium": monthlyPremium,
                "quote_package_id": quotePackageId,
                "serial_number": serialNumber,
                "policyholder_id": policyHolderId,
            },
            auth: {
                username: this.appId,
                password: this.appKey
            },
        }

        try{
            let result = await axios.request(options)
            return result.data
        }catch(error){
            console.error(error)
        }
    }

    // issue a policy
    async issuePolicy(applicationId){
        let options = {
            baseURL: this.baseUrl,
            url: '/policies',
            method: 'post',
            data: {
                "application_id": applicationId
            },
            auth: {
                username: this.appId,
                password: this.appKey
            },
        }

        try{
            let result = await axios.request(options)
            return result.data
        }catch(error){
            console.error(error)
        }
    }
}
