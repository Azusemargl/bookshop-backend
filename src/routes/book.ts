import { Router } from 'express'
import path from 'path'
import multer from 'multer'
import { getBookContoller, bookContoller } from '../controllers/book.controller'

const router = Router()

// Set the storage engine
const storage = multer.diskStorage({
   destination: './public/images/books',
   filename: (req, file, cb) => cb(null, req.body.name + '-' + req.body.date + path.extname(file.originalname))
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

router.get('/all', getBookContoller)
router.post('/create', bookContoller)

export default router
