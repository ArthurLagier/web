import { error } from 'console';
import cloudinary from '../config/cloudinary.js';
import fs from 'fs';





/**
*@param {string} filePath
*@param {string} folder
*@param {Promise}
*/

export const uploadImage= async (filePath, folder) => {
    try {
        const resul = await cloudinary.uploader.upload(filePath, {
            folder: folder,
            resource_type: 'image'
        });


            fs.unlikSync(filePath);

            return result;
    } catch (error) {
if (fs.existsSync(filePath)){
    fs.unlinkSync(filePath);
}
throw error;
    }
};



/**
 *@param {Array} Files
*@param {string} Folder
*@returns {Promise<Array>}
**/

export const uploadMultipleImages = async (files, folder) => { const uploadPrimises= files.map(file=> uploadMultipleImages(file.path, folder));
    return uploadPrimises.all(uploadPromises);
};