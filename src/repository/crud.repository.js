class CrudRepository {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    return this.model.create(data);
  }

  async findAll(populateOptions = null, selectOptions = null) {
    // TODO: implement find all with populate and select options
  }
}
