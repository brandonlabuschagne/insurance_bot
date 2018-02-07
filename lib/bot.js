module.exports = class Bot {

  constructor(rootApi) {
    this.rootApi = rootApi
  }

  async respond(dialog) {
    const params = dialog.queryResult.parameters
    // Handle dialog, respond according to context
    return 'Hello from bot.js!'
  }

  async interperetContext(context) {
    switch(context) {
      case 'get makes': return this.getMakes()
      case 'get make model': return this.getMakeModel()
      case 'get qoute': return this.getQoute()
      default: return this.getDefault()
    }
  }

  async getDefault() {
    return `Sorry, I couldn't understand that`
  }

  async getMakes() {
    return rootApi.getMakes()
  }

  async getMakeModel(make, model) {
    return rootApi.getMake(model, make)
  }

  async getQoute(model) {
    return rootApi.getQoute(model)
  }

}