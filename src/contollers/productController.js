const mongoose = require('mongoose');

const Product = mongoose.model('Product');

module.exports = {
  async index(request, response) {
    const { page = 1 } = request.query;
    const products = await Product.paginate({}, { page: page, limit: 5 });

    return response.json(products);
  },
  async show(request, response) {
    const products = await Product.findById(request.params.id);

    return response.json(products);
  },
  async store(request, response) {
    const { title, description, url } = request.body;
    const product = await Product.create({
      title,
      description,
      url,
    });
    return response.json(product);
  },
  async update(request, response) {
    const { title, description, url } = request.body;
    const product = await Product.findByIdAndUpdate(
      request.params.id,
      request.body,
      { new: true }
    );
    return response.json(product);
  },
  async destroy(request, response) {
    await Product.findByIdAndRemove(request.params.id);

    return response.send();
  },
};
