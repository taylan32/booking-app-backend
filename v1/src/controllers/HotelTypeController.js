const httpStatus = require("http-status")
const CustomError = require("../errors/CustomError")
const { findByName, insert, list, findOne, modify, remove } = require("../services/HotelTypeService")

const createHotelType = async (req, res, next) => {
    try {
        let hotelType = await findByName(req.body)
        if(hotelType != null) {
            return next(CustomError("Hotel type already exists", httpStatus.BAD_REQUEST))
        }
        hotelType = await insert(req.body)
        return res.status(httpStatus.CREATED).json({
            success:true,
            message:"Hotel type added",
            data:hotelType
        })
    }
    catch (error) {
        return next(CustomError(error.message, httpStatus.INTERNAL_SERVER_ERROR))
    }
}

const getHotelTypes = async (req, res, next) => {
    try {
        const types = await list()
        return res.status(httpStatus.OK).json({
            success:true,
            message:"Listed",
            data:types
        })
    }
    catch (error) {
        return next(CustomError(error.message, httpStatus.INTERNAL_SERVER_ERROR))
    }
}

const getHotelType = async(req,res, next) => {
    try {
        const hotelType = await findOne(req.params.id)
        if(!hotelType) {
            return next(CustomError("Not found", httpStatus.NOT_FOUND))
        }
        return res.status(httpStatus.OK).json({
            success:true,
            message:"Listed",
            data:hotelType
        })
    }
    catch (error) {
        return next(CustomError(error.message, httpStatus.INTERNAL_SERVER_ERROR))
    }
}

const updateHotelType = async(req, res, next) => {
    try {
        const updatedData = await modify(req.params.id, req.body)
        if(!updatedData) {
            return next(CustomError("Not found", httpStatus.NOT_FOUND))
        }
        return res.status(httpStatus.OK).json({
            success:true,
            message:"Updated",
            data:updatedData
        })
    }
    catch (error) {
        return next(CustomError(error.message, httpStatus.INTERNAL_SERVER_ERROR))
    }
}

const deleteHotelType = async(req, res, next) => {
    try {
        const deletedData = await remove(req.params.id)
        if(!deletedData) {
            return next(CustomError("Not found", httpStatus.BAD_REQUEST))
        }
        return res.status(httpStatus.OK).json({
            success:true,
            message:"Deleted"
        })
    }
    catch (error) {
        return next(CustomError(error.message, httpStatus.INTERNAL_SERVER_ERROR))
    }
}

module.exports = {
    createHotelType,
    getHotelTypes,
    getHotelType,
    updateHotelType,
    deleteHotelType
}