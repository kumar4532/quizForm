import CompQuestion from "../models/compQuestions.model.js";


const compQuestion = async(req, res) => {
    try {
        const { passage, questions } = req.body
        
        const question = await CompQuestion.create({
            passage,
            questions
        })

        return res
        .status(200)
        .json(question);
        
    } catch (error) {
        console.log("Error in create quiz controller", error);
        throw error;
    }
}

export default compQuestion;