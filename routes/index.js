import express from 'express';
import addCampgroundRoute from './addCampground.js';
import getCampgroundsRoute from './getCampgrounds.js';
import addCommentRoute from './addComment.js';
import getCommentsRoute from './getComments.js';
import authRoute from './auth.js';

const apiRouter = express.Router();

apiRouter.use('/addCampground', addCampgroundRoute);
apiRouter.use('/getCampgrounds', getCampgroundsRoute);
apiRouter.use('/addComment', addCommentRoute)
apiRouter.use('/getComments', getCommentsRoute)
apiRouter.use('/auth', authRoute)

export default apiRouter;