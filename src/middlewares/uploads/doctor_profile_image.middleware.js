const multer = require('multer');
const path = require('path');
const fs = require('fs');

const uploadPath = 'uploads/doctors_profile';

if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(
        uploadPath, {
            recursive: true
        }
    );
}

const storage = multer.diskStorage({
    destination: ( req, file, cb ) => {
        cb ( null , uploadPath );
    },
    filename: ( req, file, cb ) => {
        const ext = path.extname(
            file.originalname
        );
        const filename = Date.now() + ext;
        cb( null, filename );
    }
});

const fileFilter = ( req, file, cb ) => {
    const allowedTypes = [
        'image/jpeg',
        'image/jpg',
        'image/png',
        'image/webp'
    ];
    if (allowedTypes.includes(
        file.mimetype
    )) {
        cb ( null, true );
    } else {
        cb (
            new Error ( 'only image allowed')
        );
    }
};

const upload = multer({
    storage,
    fileFilter
});

module.exports = upload;