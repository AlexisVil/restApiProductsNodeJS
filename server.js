const express = require("express");
const morgan = require("morgan");
const port = process.env.Port || 3000;
const app = express();
app.use(morgan("dev"));
app.use(express.json());

let products = [
  {
    id: 1,
    name: "Laptop",
    price: 30000,
  },
];

app.get("/products", (req, res) => {
  res.json(products);
});

app.post("/products", (req, res) => {
  const newProduct = { ...req.body, id: products.length + 1 };
  products.push(newProduct);
  res.send(newProduct);
});

app.delete("/products/:id", (req, res) => {
  const productFound = products.find((p) => p.id === parseInt(req.params.id));
  if (!productFound)
    return res.status(404).json({
      message: "Product Not Found",
    });
  products = products.filter((p) => p.id === parseInt(req.params.id));
  res.sendStatus(204);
});

app.put("/products/:id", (req, res) => {
  const newData = req.body;
  const productFound = products.find((p) => p.id === parseInt(req.params.id));
  if (!productFound)
    return res.status(404).json({
      message: "Product Not Found",
    });
  products = products.map((p) =>
    p.id === parseInt(req.params.id) ? { ...p, ...newData } : p
  );
  res.json({
    message: "Product updated successfully",
  });
});

app.get("/products/:id", (req, res) => {
  const productFound = products.find(
    (product) => product.id === parseInt(req.params.id)
  );
  if (!productFound)
    return res.status(404).json({
      message: "Product Not Found",
    });
  res.json(productFound);
});

app.listen(port);
console.log(`Server listen on port ${port}`);
