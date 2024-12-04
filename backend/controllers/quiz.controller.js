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

export const getQuiz = async (req, res) => {
    try {
        const { id: quizId } = req.params;

        // Fetch the quiz
        const quiz = await Quiz.findById(quizId);
        if (!quiz) {
            return res.status(404).json({ error: "Quiz not found" });
        }

        // Populate questions manually
        const populatedQuestions = await Promise.all(
            quiz.questions.map(async ({ questionId, questionType }) => {
                let question = null;

                // Fetch from the respective collection
                switch (questionType) {
                    case "CategoryQuestion":
                        question = await CategoryQuestion.findById(questionId);
                        break;
                    case "ClozeQuestion":
                        question = await ClozeQuestion.findById(questionId);
                        break;
                    case "CompQuestion":
                        question = await CompQuestion.findById(questionId);
                        break;
                    default:
                        throw new Error(`Invalid question type: ${questionType}`);
                }

                return { questionType, question };
            })
        );

        // Send the populated quiz data
        res.status(200).json({
            ...quiz._doc, // Spread existing quiz data
            questions: populatedQuestions, // Replace with populated questions
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

