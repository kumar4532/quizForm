import mongoose from "mongoose";

const CompQuestionSchema = new mongoose.Schema(
    {
        passage: {
            type: String,
            required: true,
        },
        questions: [
            {
                question: {
                    type: String,
                    required: true,
                },
                options: {
                    type: [String],
                    validate: {
                        validator: function (options) {
                            return options.length === 4;
                        },
                        message: "Each question must have exactly 4 options.",
                    },
                },
                correctAnswer: {
                    type: String,
                    required: true,
                    validate: {
                        validator: function (answer) {
                            return this.options.includes(answer);
                        },
                        message: "Correct answer must be one of the options.",
                    },
                },
            },
        ],
    },
    { timestamps: true }
);

const CompQuestion = mongoose.model("CompQuestion", CompQuestionSchema);

export default CompQuestion;
