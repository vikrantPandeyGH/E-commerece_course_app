import express from 'express'
const router = express.Router()
import { courseCreator }  from '../controllers/courses.controller.js'
import { courseUpdator } from '../controllers/courses.controller.js'
import { courseDeletor } from '../controllers/courses.controller.js'
import { getAllCourses } from '../controllers/courses.controller.js'
import { getSingleCourse } from '../controllers/courses.controller.js'
import upload from '../middlewares/upload.js'

import { coursePurchase } from '../controllers/courses.controller.js'
import { authMiddleware } from '../middlewares/user.middleware.js'

import { adminAuthMiddleware } from '../middlewares/admin.middleware.js'
import { getAdminCourses } from '../controllers/courses.controller.js'

router.post('/create',upload.single('courseImage'),adminAuthMiddleware,courseCreator)
router.patch('/update/:courseId',upload.single('courseImage'),adminAuthMiddleware,courseUpdator)
router.delete('/delete/:courseId',adminAuthMiddleware,courseDeletor)

router.get('/all-courses',getAllCourses)
router.get('/single-course/:courseId',getSingleCourse)

router.post('/purchase/:courseId',authMiddleware,coursePurchase)

router.get(
  '/admin-courses',
  adminAuthMiddleware,
  getAdminCourses
);

export default router;