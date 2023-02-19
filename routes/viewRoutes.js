const express = require('express');
const viewsController = require('../controllers/viewsController');
const authController = require('../controllers/authController');
const bookingController = require('../controllers/bookingController');

const router = express.Router();

router.get(
  '/',
  bookingController.createBookingCheckout,
  authController.isLoggedIn,
  viewsController.getOverview
);

router.get('/tour/:slug', authController.isLoggedIn, viewsController.getTour);
router.get('/login', authController.isLoggedIn, viewsController.getLoginForm);
router.get('/signup', authController.isLoggedIn, viewsController.getSignUpForm);
router.get('/me', authController.protect, viewsController.getAccount);
router.get('/my-tours', authController.protect, viewsController.getMyTours);
router.get('/my-reviews', authController.protect, viewsController.getMyReviews);
router.get('/billing', authController.protect, viewsController.getBilling);
router.get(
  '/my-invoices',
  authController.protect,
  viewsController.getMyInvoices
);
router.get(
  '/user-management',
  authController.protect,
  viewsController.getUserManagement
);
router.get(
  '/tour-management',
  authController.protect,
  viewsController.getTourManagement
);
router.get(
  '/review-management',
  authController.protect,
  viewsController.getReviewManagement
);

router.post(
  '/submit-user-data',
  authController.protect,
  viewsController.updateUserData
);

module.exports = router;
