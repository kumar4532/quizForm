import mongoose, { Schema } from "mongoose";

const QuizSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['Categorize', 'Cloze', 'Comprehension'],
        required: true
    },
    questionRef: {
        type: Schema.Types.ObjectId,
        required: true,
        refPath: 'typeRef'
    },
    typeRef: {
        type: String,
        required: true,
        enum: ['CategoryQuestion', 'ClozeQuestion', 'CompQuestion'],
    },
}, { timestamps: true })

const Quiz = mongoose.model("quiz", QuizSchema)

export default Quiz;