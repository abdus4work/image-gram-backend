const crudRepository = (model) => {
  return {
    async create(data) {
      return model.create(data);
    },

    async getAll(populateOptions = null, selectOptions = null) {
      const query = model.find();
      if (populateOptions) {
        if (Array.isArray(populateOptions)) {
          populateOptions.forEach((option) => {
            query.populate(option);
          });
        } else {
          query.populate(populateOptions);
        }
      }
      if (selectOptions) {
        query.select(selectOptions);
      }
      return await query;
    },

    async getById(id, populateOptions = null, selectOptions = null) {
      const query = model.findById(id);
      if (populateOptions) {
        if (Array.isArray(populateOptions)) {
          populateOptions.forEach((option) => {
            query.populate(option);
          });
        } else {
          query.populate(populateOptions);
        }
      }
      if (selectOptions) {
        query.select(selectOptions);
      }
      return await query;
    },

    async update(id, data, populateOptions = null, selectOptions = null) {
      const query = model.findByIdAndUpdate(id, data, { new: true });
      if (populateOptions) {
        if (Array.isArray(populateOptions)) {
          populateOptions.forEach((option) => {
            query.populate(option);
          });
        } else {
          query.populate(populateOptions);
        }
      }
      if (selectOptions) {
        query.select(selectOptions);
      }
      return await query;
    },

    async delete(id) {
      return model.findByIdAndDelete(id);
    }
  };
};

export default crudRepository;
