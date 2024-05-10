const router = require("express").Router();
const { Model, DataTypes } = require("sequelize");
const { Category, Product } = require("../../models");

// Get all categories with their associated products
router.get("/", async (req, res) => {
  try {
    const categoryData = await Category.findAll({ include: Product });
    res.status(200).json({ data: categoryData });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get a category by ID with associated products
router.get("/:id", async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: Product,
    });

    if (!categoryData) {
      return res.status(404).json({ error: "Category not found" });
    }

    res.status(200).json({ data: categoryData });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Create a new category
router.post("/", async (req, res) => {
  try {
    const categoryData = await Category.create(req.body);
    res.status(201).json({ data: categoryData });
  } catch (err) {
    res.status(400).json({ error: "Bad request" });
  }
});

// Update a category by ID
router.put("/:id", async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id);

    if (!categoryData) {
      return res.status(404).json({ error: "Category not found" });
    }

    await categoryData.update(req.body);
    res.status(200).json({ data: categoryData });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Delete a category by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedRows = await Category.destroy({
      where: { id: req.params.id },
    });

    if (deletedRows === 0) {
      return res.status(404).json({ error: "Category not found" });
    }

    res.status(200).json({ message: "Category deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
