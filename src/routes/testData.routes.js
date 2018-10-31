import * as app from "express";
import { catchErrors } from "../errorHandlers/errorHandlers";
import {
  isDevEnvironment,
  deleteTestData,
  createTestData
} from "../controllers/testData.controller";

const router = app.Router();
//Deal with creation and destruction of test data
router.get("/delete", isDevEnvironment, catchErrors(deleteTestData));
router.get("/create", isDevEnvironment, catchErrors(createTestData));
export default router;
