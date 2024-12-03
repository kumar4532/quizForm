import mongoose, { Schema } from "mongoose";

const CompQuestionSchema = new mongoose.Schema({
    passage: {
        type: String,
        required: true
    },
    questions: [
        {
            question: {
                type: String,
                required: true
            },
            options: [
                {
                    type: String,
                    validate: {
                        validator: function (options) {
                            return options.length === 4;
                        },
                    },
                }
            ],
            correctAnswer: {
                type: String,
                required: true,
                validate: {
                    validator: function (answer) {
                        return this.options.includes(answer);
                    },
                }
            }
        },
    ],
}, { timestamps: true })

const CompQuestion = mongoose.model("compQuestion", CompQuestionSchema);

export default CompQuestion;