import ClozeQuestion from "../models/clozeQuestions.model.js";

const clozeQuestion = async(req, res) => {
    try {
        const { questionText, blanks } = req.body

        console.log(questionText);
        console.log(blanks);

        const question = await ClozeQuestion.create({
            questionText,
            blanks
        })

        return res
        .status(200)
        .json(question)
        
    } catch (error) {
        console.log("Error in create quiz controller", error);
        throw error;
    }
}

export default clozeQuestion;