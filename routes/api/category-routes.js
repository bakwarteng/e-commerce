const router = require("express").Router();
const { Category, Product } = require("../../models");

// Find all categories with their associated Products
router.get("/", async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: Product,
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Find one category by its `id` value with associated Products
router.get("/:id", async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    if (!categoryData) {
      return res
        .status(404)
        .json({ message: "No category found with this ID" });
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// Create a new category
router.post("/", async (req, res) => {
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Update a category by its `id` value
router.put("/:id", async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id);

    if (!categoryData) {
      return res.status(404).json({ message: "Category not found" });
    }

    await categoryData.update(req.body);

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Delete a category by its `id` value
router.delete("/:id", async (req, res) => {
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!categoryData) {
      return res
        .status(404)
        .json({ message: "No category found with this ID" });
    }

    res.status(200).json({ message: "Category deleted successfully" });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
