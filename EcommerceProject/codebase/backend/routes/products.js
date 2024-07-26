import express from "express";
import {
  canUserReview,
  createProductReview,
  deleteProduct,
  deleteProductImage,
  deleteReview,
  getAdminProducts,
  getProductDetails,
  getProductReviews,
  getProducts,
  newProduct,
  updateProduct,
  uploadProductImages,
} from "../controllers/productControllers.js";
import { authorizeRoles, isAuthenticatedUser } from "../middlewares/auth.js";
const router = express.Router();

router.route("/products").get(getProducts);
router
  .route("/admin/products")
  .post(isAuthenticatedUser, authorizeRoles("user"), newProduct)
  .get(isAuthenticatedUser, authorizeRoles("user"), getAdminProducts);

router.route("/products/:id").get(getProductDetails);

router
  .route("/admin/products/:id/upload_images")
  .put(isAuthenticatedUser, authorizeRoles("user"), uploadProductImages);

router
  .route("/admin/products/:id/delete_image")
  .put(isAuthenticatedUser, authorizeRoles("user"), deleteProductImage);

router
  .route("/admin/products/:id")
  .put(isAuthenticatedUser, authorizeRoles("user"), updateProduct);
router
  .route("/admin/products/:id")
  .delete(isAuthenticatedUser, authorizeRoles("user"), deleteProduct);

router
  .route("/reviews")
  .get(isAuthenticatedUser, getProductReviews)
  .put(isAuthenticatedUser, createProductReview);

router
  .route("/admin/reviews")
  .delete(isAuthenticatedUser, authorizeRoles("user"), deleteReview);

router.route("/can_review").get(isAuthenticatedUser, canUserReview);

export default router;
