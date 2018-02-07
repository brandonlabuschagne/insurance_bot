module.exports = class Bot {

  constructor(rootApi) {
    this.rootApi = rootApi
  }

  async respond(dialog) {
    const params = dialog.queryResult.parameters
    const context = params.context
    // Handle dialog, respond according to context
    const message = await this.interperetContext(context, params)
    return { fulfillmentText: message }
  }

  async interperetContext(context, params) {
    switch(context) {
      case 'getmakes': return this.getMakes()
      case 'getmakemodels': return this.getModelsByMake(params.make)
      case 'getqoute': return this.getQoute()
      default: return this.getDefault()
    }
  }

  async getDefault() {
    return `Sorry, I couldn't understand that`
  }

  async getMakes() {
    const makes = await this.rootApi.getMakes()
    return `Which brand is your gadget? ${makes.join(', ')}` 
  }

  async getModelsByMake(make) {
    const models = await this.rootApi.getModelsByMake(make)
    return `Which model is your ${make} gadget? ${models.join(', ')}`
  }

  async getQoute(model) {
    return this.rootApi.getQoute(model)
  }

}