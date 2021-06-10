import { Router } from 'express'
import path from 'path'
import multer from 'multer'
import {
   avatarContoller,
   deleteAvatarContoller,
   emailUpdateController,
   loginUpdateController,
   passwordUpdateController
} from '../controllers/user.controller'

// TODO: Create avatar error handler

const router = Router()

// Set the storage engine
const storage = multer.diskStorage({
   destination: './public/images',
   filename: (req, file, cb) => cb(null, req.body.id + path.extname(file.originalname))
})

// Init Upload
const upload = multer({
   storage: storage,
   limits: { fileSize: 1024 * 1024 * 3 },
   fileFilter: (req, file, cb) => checkFileType(file, cb)
})

// Check File Type
const checkFileType = (file: any, cb: any) => {
   const filetypes = /jpeg|jpg|png|gif/
   const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
   const mimetype = filetypes.test(file.mimetype)

   if (mimetype && extname) return cb(null, true)
   else return cb('Ошибка: Неккоректный тип изображения')
}

router.post('/avatar', upload.single('file'), avatarContoller)
router.put('/avatar/delete', deleteAvatarContoller)
router.put('/login/update', loginUpdateController)
router.put('/email/update', emailUpdateController)
router.put('/password/update', passwordUpdateController)

export default router
