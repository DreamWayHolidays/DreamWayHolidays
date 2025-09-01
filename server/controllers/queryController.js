import queryModel from "../models/queryModel.js";

export const getQueryController = async (req, res, next) => {
    try {
      const Queries = await queryModel.find().sort({ createdAt: -1 });

      res.status(200).send({
        msg : "Queries fetched successfully",
        success : true,
        Queries,
      });
        
    } catch (error) {
        next(error);
    }
}



export const submitQueryController = async (req, res, next) => {
    try {
        const { name, email, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).send({       
                msg: "All fields are required",
                success: false,
            });
        }

        const newQuery = new queryModel({ name, email, message });
        await newQuery.save();

        res.status(200).send({
            msg: "Query submitted successfully",    
            success: true,
        });

    } catch (error) {
        next(error);
    }
}


export const deleteQueryController = async (req, res, next) => {
    try {
        const qid = req.params.qid;

        if (!qid) {
            return res.status(400).send({       
                msg: "Query id is required",
                success: false,
            });
        }

       const query = await queryModel.findByIdAndDelete(qid);

       if(!query){
        return res.status(400).send({
            msg : "query not found",
            success :  false
        })
       }

        res.status(200).send({
            msg: "Query deleted successfully",    
            success: true,
        });

    } catch (error) {
        next(error);
    }
}
