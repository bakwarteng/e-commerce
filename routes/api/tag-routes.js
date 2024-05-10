const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", async (req, res) => {
  try {
    const tagData = await Tag.findAll({
      include: [
        {
          model: Product,
          through: ProductTag, // Include Product through ProductTag
          as: "product_tags", // Use the alias defined in the association
        },
      ],
    });
    res.status(200).json({ data: tagData });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Service Error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [
        {
          model: Product,
          through: ProductTag,
          as: "product_tags",
        },
      ],
    });

    if (!tagData) {
      return res.status(404).json({ error: "Tag not found" });
    }

    res.status(200).json({ data: tagData });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Service Error" });
  }
});

module.exports = router;
