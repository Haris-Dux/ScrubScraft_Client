import { reviewsAndRatings } from "../models/ReviewsModel.js";
import { UserModel } from "../models/User.Model.js";
import { setMongoose } from "../utils/Mongoose.js";
import { verifyrequiredparams } from "../utils/Common.js";


export const createReview = async (req,res,next) => {
  try {
    const { productID, userID, review, rating } = req.body;
    await verifyrequiredparams(req.body,['productID', 'userID'])
    if(rating.length < 1) throw new Error(`Review must have at least one star rating`);
   await reviewsAndRatings.create({ productID, userID, review, rating });
    return res.status(201).json({ message: "Review added successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const updateReview = async (req,res,next) => {
  try {
    const { id, review, rating } = req.body;
    if(!id) throw new Error(`Review Id required`);
    let updateQuery = {};

    if (rating === 0) {
      throw new Error(`Review must have at least one star rating`);
      } else{
        updateQuery = { ...updateQuery, rating };
      };

      if (review) {
        updateQuery = { ...updateQuery, review };
      };
      
      if(Object.keys(updateQuery).length === 0) throw new Error("No Fields To Update");
     await reviewsAndRatings.findByIdAndUpdate({_id:id},updateQuery);
    return res.status(201).json({ message: "Review updated successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const deleteReview = async (req,res,next) => {
    try {
        const { id } = req.body;
        if(!id) throw new Error(`Review Id required`);
        await reviewsAndRatings.findByIdAndDelete(id);
        return res.status(201).json({ message: "Review deleted successfully" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const getAllReviewsByProduct = async (req, res, next) => {
    try {
        const { id } = req.body;
        if(!id) throw new Error('Product Id Required');
        const productReviews = await reviewsAndRatings.find({productID:id}).sort({createdAt:-1});
        const userIds  = productReviews.map((item)=>item.userID);
        const userNames = await UserModel.find({_id:{$in:userIds }});
        const userNamesMap = {};
        userNames.forEach(user => {
          userNamesMap[user._id] = user.name;
        });
        const reviewsWithNames = productReviews.map(review => {
          const { _id, ...reviewWithoutId } = review.toObject();
          return {
              ...reviewWithoutId,
              id: review._id,
              name: userNamesMap[review.userID]
          };
      });
        setMongoose();
        return res.status(200).json(reviewsWithNames);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
