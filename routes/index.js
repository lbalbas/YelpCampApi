import express from 'express';
import addCampgroundRoute from './addCampground.js';
import getCampgroundsRoute from './getCampgrounds.js';
import authRoute from './auth.js';

const apiRouter = express.Router();

apiRouter.use('/addCampground', addCampgroundRoute);
apiRouter.use('/getCampgrounds', getCampgroundsRoute);
apiRouter.use('/auth', authRoute)

export default apiRouter;