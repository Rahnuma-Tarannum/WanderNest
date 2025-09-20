const mongoose = require("mongoose");
const review = require("./review");
const { types } = require("joi");
const Schema = mongoose.Schema;



const listingSchema = new Schema({ 
    title: {
      type: String,
      required: true,
    },
    description: String,
    
    /*image:{
      // type:String,
      // set:(v)=>v ===""? "https://i.pinimg.com/736x/86/28/44/8628446445eb6c971d1546b3eadb33f4.jpg" : v,

     url: String,
     filename: String,

    },*/


    image: {
    url: String,
    public_id: String,
    },

    
     price: Number,
     location: String,
     country: String,
    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: "Review",
      },
    ],

    owner : {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    geometry : {
    type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ['Point'], // 'location.type' must be 'Point'
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  }
});


listingSchema.post("findOneAndDelete" , async(listing) => {
  if(listing) {
    await review.deleteMany({_id : {$in: listing.reviews}});
  }
  
});

const Listing = mongoose.model("Listing" , listingSchema);
module.exports = Listing;