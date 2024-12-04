import CategoryQuestion from "../models/categoryQuestions.model.js";

const categoryQuestion = async(req, res) => {
    try {
        const { questionText, options } = req.body

        console.log(questionText);
        console.log(options);

        const question = await CategoryQuestion.create({
            questionText,
            options
        })

        return res
        .status(200)
        .json(question);
        
    } catch (error) {
        console.log("Error in create quiz controller", error);
        throw error;
    }
}

export default categoryQuestion;