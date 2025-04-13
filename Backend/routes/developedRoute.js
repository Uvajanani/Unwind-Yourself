import express from 'express';
import { getDevelopedAreas, updateDevelopedArea } from '../controllers/developedArea.js';

const developedRouter = express.Router();
developedRouter.post("/updateDevelopedArea", updateDevelopedArea)
developedRouter.get("/developedArea/:userId", getDevelopedAreas)

export default developedRouter