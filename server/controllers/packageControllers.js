import packageModel from "../models/packageModel.js";
import cloudinary from "../utils/cloudinary.js";
import formidable from "formidable";


export const getPackagesController = async (req, res, next) => {
    try {
      const Packages = await packageModel.find().sort({ createdAt: -1 });

      res.status(200).send({
        msg : "Packages fetched successfully",
        success : true,
        Packages,
      });
        
    } catch (error) {
        next(error);
    }
}


const MAX_IMAGES = 4;
const MAX_IMAGE_SIZE = 2 * 1024 * 1024;

// 🔹 Utility to normalize text/array fields
const normalizeField = (value, def = "") => Array.isArray(value) ? value[0] : value ?? def;


const normalizeArrayField = (value) => {
  if (!value) return [];
  if (Array.isArray(value)) return value.map(String);
  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);
      if (Array.isArray(parsed)) return parsed.map(String);
    } catch {}
    return value
      .split(/\r?\n|,/)
      .map((s) => s.trim())
      .filter(Boolean);
  }
  return [];
};

// Image uploader helper

const uploadImages = async (files) => {
  const limited = files.slice(0, MAX_IMAGES);
  const urls = [];

  for (const file of limited) {
    if (file.size > MAX_IMAGE_SIZE) {
      throw new Error(`${file.originalFilename} exceeds 2 MB limit`);
    }
    const filepath = file.filepath || file.path;
    const result = await cloudinary.uploader.upload(filepath, { folder: "packages" });
    urls.push(result.secure_url);
  }
  return urls;
};



export const createPackageController = async (req, res, next) => {
  const form = formidable({ multiples: true, keepExtensions: true });

  form.parse(req, async (err, fields, files) => {
    try {

      if (err) return next(err);

      const title = normalizeField(fields.title);
      const description = normalizeField(fields.description);
      const duration = normalizeField(fields.duration);
      const price = Number(normalizeField(fields.price, "0"));
      const type = normalizeField(fields.type);
      const meetingPoint = normalizeField(fields.meetingPoint);
      const highlights = normalizeArrayField(fields.highlights);
      const includes = normalizeArrayField(fields.includes);
      const excludes = normalizeArrayField(fields.excludes);
      const importantInfo = normalizeArrayField(fields.importantInfo);


      if (!title || !description || !duration || !price || !meetingPoint || !highlights.length  || !includes.length || !excludes.length || !importantInfo.length) {
        return res.status(400).json({ success: false, msg: "Missing required fields." });
      }


      const imageFiles = files.images ? Array.isArray(files.images) ? files.images : [files.images] : [];

      let imageUrls = [];

      if (imageFiles.length > 0) {
        imageUrls = await uploadImages(imageFiles);
      }

      const pkg = await new packageModel({
        title,
        description,
        duration,
        price,
        type,
        meetingPoint,
        highlights,
        includes,
        excludes,
        importantInfo,
        images: imageUrls,
      }).save();

      return res.status(200).json({
        success: true,
        msg: "Package created successfully",
      });
    } catch (error) {
       next(error);
    }
  });
};



export const deletePackageController = async (req, res, next) => {
    try {

        const { id } = req.params;

        if (!id) {
            return res.status(400).send({
                msg: "Package ID is required",
                success: false,
            });
        }

        const pkg = await packageModel.findByIdAndDelete(id);

        if (!pkg) {
            return res.status(404).send({
                msg: "Package not found",
                success: false,
            });
        }

        res.status(200).send({
            msg: "Package deleted successfully",
            success: true,
        });
        
    } catch (error) {
        next(error);
    }
}




export const getPackageByIdController = async (req, res, next) => {
    try {
        const { pid } = req.params;

        if (!pid) {
            return res.status(400).send({
                msg: "Package ID is required",
                success: false,
            });
        }

        const pkg = await packageModel.find({ _id : pid }).sort({ createdAt: -1 });

        res.status(200).send({
            msg: "Package fetched successfully",
            success: true,
            pkg,
        });
        
    } catch (error) {
        next(error);
    }
}