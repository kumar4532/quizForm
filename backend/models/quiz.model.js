import mongoose, { Schema } from "mongoose";

const QuizSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    questions: [
        {
            questionId: {
                type: mongoose.Schema.Types.ObjectId,
                required: true
            },
            questionType: {
                type: String,
                enum: ["CategoryQuestion", "ClozeQuestion", "CompQuestion"],
                required: true
            }
        }
    ]
}, { timestamps: true })

const Quiz = mongoose.model("quiz", QuizSchema)

export default Quiz;