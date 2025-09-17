import multer from 'multer';

const storage = multer.memoryStorage(); //Amarzena o arquivo em memória
const upload = multer({storage});

export default upload;