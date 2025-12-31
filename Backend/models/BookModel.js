import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
            min: 0,
        },
        image: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        author: {
            type: String,
            required: true,
        },
        ratings: {
            type: Number,
            default: 0,
            min: 0,
            max: 5,
        },
        publishDate: {
            type: Date,
            required: true,
        },
    },
    {
        timestamps: true, // adds createdAt & updatedAt
    }
);

const BookModel = mongoose.model("books", bookSchema);

export default BookModel;
