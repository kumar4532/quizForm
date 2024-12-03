import mongoose, { Schema } from "mongoose";

const categoryQuestionSchema = new mongoose.Schema({
    questionText: {
        type: String,
        required: true
    },
    options: [
        {
            item: { 
                type: String, 
                required: true 
            },
            category: { 
                type: String, 
                required: true 
            },
        },
    ],
}, { timestamps: true })

const CategoryQuestion = mongoose.model("categoryQuestion", categoryQuestionSchema);

export default CategoryQuestion;