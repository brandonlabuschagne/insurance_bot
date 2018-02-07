module.exports = class Bot {

  constructor(rootApi) {
    this.rootApi = rootApi
  }

  async respond(dialog) {
    const params = dialog.result.parameters
    const context = params.context
    const outputContexts = dialog.result.contexts
    // Handle dialog, respond according to context
    const result = await this.interperetContext(context, params, outputContexts)
    if (typeof result === 'string')
      return { displayText: result, speech: result }
    else
      return result 
  }

  async interperetContext(context, params) {
    switch(context) {
      case 'getmakes': return this.getMakes()
      case 'getmakemodels': return this.getModelsByMake(params.make)
      case 'getquote': return this.getQuote(params.model)
      case 'getpolicy': return this.getPolicy(params.id)
      default: return this.getDefault()
    }
  }

  async getDefault() {
    return `Sorry, I couldn't understand that?`
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

  async getQuote(modelName, outputContexts) {
    const quote = await this.rootApi.createQuote('root_gadgets', modelName)
    return {
      displayText: `That will cost you R ${quote[0]['sum_assured'] / 100}.`,
      speech: `That will cost you R ${quote[0]['sum_assured'] / 100}.`,
      contextOut: [
        {
          name: "brand", 
          lifespan: 5,
          parameters: {
            "id": "1234567890"
          }
        }
      ]
    }
  }

  async getPolicy(quoteId) {
    return ``
  }

}