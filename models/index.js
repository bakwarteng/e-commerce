// import models
const { Model, DataTypes } = require("sequelize");
const Product = require("./Product");
const Category = require("./Category");
const Tag = require("./Tag");
const ProductTag = require("./ProductTag");

// Products belongsTo Category
Product.belongsTo(Category, {
  through: {
    model: ProductTag,
  },
  as: "category_tag",
});
// Categories have many Products
Category.belongsToMany(Product, {
  through: {
    model: Product,
    unique: false,
  },
  as: "product_categories",
});
// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag, {
  through: {
    model: ProductTag,
    unique: false,
  },
  as: "tagged_products",
});

// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, {
  // Define the third table needed to store the foreign keys
  through: {
    model: ProductTag,
    unique: false,
  },
  as: "product_tags",
});

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
