class CrudRepository {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    return this.model.create(data);
  }

  async getAll(populateOptions = null, selectOptions = null) {
    const query = this.model.find();
    if(populateOptions){
      if(Array.isArray(populateOptions)){
        populateOptions.forEach(option => {
          query.populate(option);
        });
      }else{
        query.populate(populateOptions);
      }
    }
    if(selectOptions){
      query.select(selectOptions);
    }
    return await query;
  }

  async getById(id,populateOptions = null, selectOptions = null) {
    const query = this.model.findById(id);
    if(populateOptions){
      if(Array.isArray(populateOptions)){
        populateOptions.forEach(option => {
          query.populate(option);
        });
      }else{
        query.populate(populateOptions);
      }
    }
    if(selectOptions){
      query.select(selectOptions);
    }
    return await query;
  }

  async update(id,data,populateOptions = null, selectOptions = null) {
    const query = this.model.findByIdAndUpdate(id,data,{new:true});
    if(populateOptions){
      if(Array.isArray(populateOptions)){
        populateOptions.forEach(option => {
          query.populate(option);
        });
      }else{
        query.populate(populateOptions);
      }
    }
    if(selectOptions){
      query.select(selectOptions);
    }
    return await query;
  }

  async delete(id) {
    return await this.model.findByIdAndDelete(id);
  }
}


export default CrudRepository;