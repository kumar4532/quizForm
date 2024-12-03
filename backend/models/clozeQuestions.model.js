import mongoose, { Schema } from "mongoose";

const ClozeQuestionSchema = new mongoose.Schema({
    questionText: { 
        type: String, 
        required: true 
    },
    blanks: [
        {
            textBefore: { 
                type: String, 
                required: true 
            },
            textAfter: {
                type: String, 
                required: true 
            },
            correctAnswer: { 
                type: String, 
                required: true 
            }
        },
    ],
}, { timestamps: true })

const ClozeQuestion = mongoose.model("clozeQuestion", ClozeQuestionSchema);

export default ClozeQuestion;