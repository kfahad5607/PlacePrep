const express = require('express');


const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');



const router = express.Router();
router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/logout', authController.logout);

router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

router.route('/getDetails').get(authController.protect, userController.getDetails);

router.get('/users', authController.protect, authController.restrictTo('admin', 'faculty'), userController.getAllUsers);
router.get('/me', authController.protect, userController.getMe, userController.getUser);
router.patch('/updateMe', authController.protect, userController.uploadUserPhoto, userController.resizeUserPhoto, userController.updateMe);
router.delete('/deleteMe', authController.protect, userController.deleteMe);
router.patch('/updateMyPassword', authController.protect, authController.updatePassword);

router.route('/:id').get(authController.protect, authController.restrictTo('admin'), userController.getUser)
    .patch(authController.protect, authController.restrictTo('admin'), userController.updateUser)
    .delete(authController.protect, authController.restrictTo('admin'), userController.deleteUser);



module.exports = router;