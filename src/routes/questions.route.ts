import express from 'express';
import {GetQuestion} from '../handlers';

const QuestionRouter = express.Router();
QuestionRouter.route(`/`).get(GetQuestion);

export default QuestionRouter;
