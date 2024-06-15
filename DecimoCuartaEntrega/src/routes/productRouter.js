import express from "express";
import productController from "../controller/productos.controller.js";

const router = express.Router();

// este sería el endpoint que debería recibir limit, page sort y query
router.get("/", productController.getProducts);

//faker
router.get("/mockingproducts", productController.generaFakeProducts)

//agregar producto

router.post("/", productController.addProduct);

//traer producto por id

router.get("/:id", productController.getProductById);

//modificar producto con id

router.put("/:id", productController.modifyProductById);

// borrar producto

router.delete("/:id", productController.deleteProduct);


export default router;
