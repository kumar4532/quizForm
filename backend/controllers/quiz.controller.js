import Quiz from "../models/quiz.model.js";
import CategoryQuestion from "../models/categoryQuestions.model.js";
import ClozeQuestion from "../models/clozeQuestions.model.js";
import CompQuestion from "../models/compQuestions.model.js";

const getQuestionWithType = async (questionId) => {
    const questionTypes = [
        { model: CategoryQuestion, type: "CategoryQuestion" },
        { model: ClozeQuestion, type: "ClozeQuestion" },
        { model: CompQuestion, type: "CompQuestion" },
    ];

    for (const { model, type } of questionTypes) {
        const question = await model.findById(questionId);
        if (question) {
            return { type, question };
        }
    }

    throw new Error(`Question with ID ${questionId} not found in any collection.`);
};

export const createQuiz = async (req, res) => {
    try {
        const { title, questionIds } = req.body;

        if (!title || !questionIds || !Array.isArray(questionIds)) {
            return res.status(400).json({ error: "Title and question IDs are required." });
        }

        const questions = await Promise.all(
            questionIds.map(async (questionId) => {
                const { type } = await getQuestionWithType(questionId);
                return { 
                    questionType: type, 
                    questionId
                };
            })
        );

        const newQuiz = new Quiz({ title, questions });
        await newQuiz.save();

        res.status(201).json({ message: "Quiz created successfully.", quiz: newQuiz });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getQuiz = async(req, res) => {
    try {
        const {id: quizId} = req.params    
        const quiz = await Quiz.findById(quizId);

        return res.status(200).json(quiz)
    } catch (error) {
        res.status(500).json({ error: error.message });   
    }
}
