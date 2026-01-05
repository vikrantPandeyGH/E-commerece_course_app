import courseModel from "../models/course.model.js"
import purchaseModel from "../models/purchase.model.js"
import fs from 'fs'
import path from 'path'

export const courseCreator = async (req, res) => {
  try {
    const adminId = req.admin.id
    const { title, description, price } = req.body
    const imageUrl = `http://localhost:${process.env.PORT}/uploads/` + req.file.filename

    const course = await courseModel.create({
      title,
      description,
      price,
      image: imageUrl,
      creator:adminId
    })
    res.status(200).json({
      course,
      message: "course created successfully"
    })
  }
  catch (err) {
    console.log(err.message)
  }
}

export const courseUpdator = async (req, res) => {
  try {
    const adminId = req.admin.id
    const { courseId } = req.params

    const course = await courseModel.findOne({
      _id: courseId,
      creator: adminId
    })

    if (!course) {
      return res.status(404).json({ message: 'course not found' })
    }

    // 🔑 default: purani image hi rahe
    let imageUrl = course.image

    // 🔑 sirf tab image handle karo jab nayi file aaye
    if (req.file) {
      // delete old image
      if (course.image) {
        const oldImagePath = path.join(
          'public',
          'uploads',
          course.image.split('/uploads/')[1]
        )

        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath)
        }
      }

      imageUrl =
        `http://localhost:${process.env.PORT}/uploads/` + req.file.filename
    }

    const { title, description, price } = req.body

    const updatedCourse = await courseModel.findOneAndUpdate(
      { _id: courseId },
      {
        title,
        description,
        price,
        image: imageUrl
      },
      { new: true }
    )

    return res.status(200).json({
      updatedCourse,
      message: 'course updated successfully'
    })
  } catch (err) {
    console.log(err.message)
    return res.status(500).json({ message: 'internal server error' })
  }
}


export const courseDeletor = async (req, res) => {
  const adminId = req.admin.id
  const { courseId } = req.params
  const course = await courseModel.findOne({_id:courseId,creator:adminId})
  if (!course) {
    return res.status(404).json({
      message: 'course not found'
    })
  }
  if (course.image) {
    const imagePath = path.join('public', 'uploads', course.image.split('/uploads/')[1])
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath)
    }
  }
  await courseModel.findOneAndDelete({ _id: courseId })
  res.status(200).json({
    message: 'course deleted successfully'
  })
}

export const getAllCourses = async (req, res) => {
  const courses = await courseModel.find()
  return res.status(200).json({
    courses,
    message: 'all courses fetched successfully'
  })
}

export const getSingleCourse = async (req, res) => {
  const { courseId } = req.params
  const course = await courseModel.findById(courseId)
  if (!course) {
    return res.status(404).json({
      message: 'course not found'
    })
  }
  return res.status(200).json({
    course,
    message: 'course fetched successfully'
  })
}

export const coursePurchase = async(req,res)=>{
   try{
     const {courseId} = req.params
    const userId = req.user.id 
    const course = await courseModel.findById(courseId)
    if(!course){
        return res.status(404).json({
            message:'course not found'
        })
    }
    const purchaseExist = await purchaseModel.findOne({userId,courseId})
    if(purchaseExist){
        return res.status(400).json({
            message:'Course already purchased'
        })
    }
    const purchase = await purchaseModel.create({
      userId,
      courseId
    })
    return res.status(200).json({
        purchase,
        message:'course purchased successfully'
    })
   }
   catch(err){
    return res.status(500).json({
        message:'internal server error',
        error:err.message
    })
   }
}


export const getAdminCourses = async (req, res) => {
  try {
    const adminId = req.admin.id;

    const courses = await courseModel.find({
      creator: adminId
    });

    return res.status(200).json({
      courses,
      message: 'Admin courses fetched successfully'
    });
  } catch (err) {
    return res.status(500).json({
      message: 'Internal server error',
      error: err.message
    });
  }
};
