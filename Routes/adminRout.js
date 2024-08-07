const express=require('express')
const app=express()
const router=express.Router()
const adminController=require('../Controller/adminController')
const verifyAdmin=require('../middleWare/verifyAdmin')


/**
 * @swagger
 * /adminLogin:
 *   post:
 *     summary: Admin login
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: admin@example.com
 *               password:
 *                 type: string
 *                 example: adminpassword
 *     responses:
 *       200:
 *         description: Admin login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: find the admin token created
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       404:
 *         description: Admin not found or password incorrect
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: admin not found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: cannot find the admin
 */
router.post('/adminLogin', adminController.adminLogin);


/**
 * @swagger
 * /admin:
 *   post:
 *     summary: Admin add movies
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               movieName:
 *                 type: string
 *                 example: Inception
 *               moviePrice:
 *                 type: number
 *                 example: 19.99
 *               description:
 *                 type: string
 *                 example: A mind-bending thriller by Christopher Nolan
 *               language:
 *                 type: string
 *                 example: English
 *               movieId:
 *                 type: string
 *                 example: mv123456
 *     responses:
 *       200:
 *         description: Movie added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: movie added successfully
 *       400:
 *         description: Missing required fields
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: must include all fields something is missing
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: movies did not added
 */
router.post('/admin', verifyAdmin, adminController.addProduct);


/**
 * @swagger
 * /movies:
 *   get:
 *     summary: List movies
 *     responses:
 *       200:
 *         description: List of movies
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: 60c72b2f4f1a4c1a8c8f9d2b
 *                   movieName:
 *                     type: string
 *                     example: Inception
 *                   moviePrice:
 *                     type: number
 *                     example: 19.99
 *                   description:
 *                     type: string
 *                     example: A mind-bending thriller by Christopher Nolan
 *                   language:
 *                     type: string
 *                     example: English
 *                   movieId:
 *                     type: string
 *                     example: mv123456
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: internal server error
 */
router.get('/movies', verifyAdmin, adminController.listMovies);

/**
 * @swagger
 * /deleteMovie:
 *   delete:
 *     summary: Admin delete movie
 *     parameters:
 *       - in: query
 *         name: movieId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the movie to delete
 *         example: mv123456
 *     responses:
 *       200:
 *         description: Movie successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: movie successfully deleted
 *       404:
 *         description: Movie ID not provided or movie not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: movie id is not provided
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: there is an error with deleting the movie
 */
router.delete('/deleteMovie', verifyAdmin, adminController.adminDeleteMovies);

/**
 * @swagger
 * /editMovie:
 *   patch:
 *     summary: Admin edit movie
 *     parameters:
 *       - in: query
 *         name: movieId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the movie to edit
 *         example: mv123456
 *       - in: query
 *         name: movieName
 *         schema:
 *           type: string
 *         description: The name of the movie
 *         example: Inception
 *       - in: query
 *         name: moviePrice
 *         schema:
 *           type: number
 *         description: The price of the movie
 *       - in: query
 *         name: description
 *         schema:
 *           type: string
 *         description: The description of the movie
 *       - in: query
 *         name: language
 *         schema:
 *           type: string
 *         description: The language of the movie
 *     responses:
 *       200:
 *         description: Movie details updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: movie details updated successfully
 *       400:
 *         description: Movie not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: movies not found
 *       404:
 *         description: Movie ID not provided
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: movieId is not getting
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: there is an error with updating the details
 */
router.patch('/editMovie', verifyAdmin, adminController.adminEditMovies);


module.exports=router