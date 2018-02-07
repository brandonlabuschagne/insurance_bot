module.exports = class Bot {

  constructor(rootApi) {
    this.rootApi = rootApi
  }

  async respond(dialog) {
    const params = dialog.queryResult.parameters
    const context = params.context
    // Handle dialog, respond according to context
    const result = await this.interperetContext(context, params)
    return { 
      fulfillmentText: result
    }
  }

  async interperetContext(context, params) {
    switch(context) {
      case 'getmakes': return this.getMakes()
      case 'getmakemodels': return this.getModelsByMake(params.make)
      case 'getqoute': return this.getQoute(params.model)
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
    const modelNames = models.map(model => model.name)
    return `Which model is your ${make} gadget? ${modelNames.join(', ')}`
  }

  async getQoute(modelName) {
    const qoute = this.rootApi.createQuote('root_gadgets', modelName)
    const message = `That will cost you R ${qoute[0]['sum_assured'] / 100}.`
  }

}