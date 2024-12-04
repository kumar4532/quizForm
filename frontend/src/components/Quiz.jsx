import React, { useEffect, useState } from 'react'

const Quiz = () => {
    const [quizQuestions, setQuizQuestions] = useState();

    useEffect(() => {
        const quiz = async () => {
            try {
                const res = await fetch("/api/quiz/67508c90d6719cc34db78207")
                const data = await res.json();
                setQuizQuestions(data.questions)
            } catch (error) {
                console.log("Error while fetching the quiz", error)
            }
        }
        quiz();
    }, [])

    const categoryQuestion = quizQuestions?.find(questions => questions.questionType === "CategoryQuestion");
    const category = categoryQuestion?.question

    const clozeQuestion = quizQuestions?.find(questions => questions.questionType === "ClozeQuestion");
    const cloze = clozeQuestion?.question

    const compQuestion = quizQuestions?.find(questions => questions.questionType === "CompQuestion");
    const comp = compQuestion?.question

    console.log(comp);

    const [selectedAnswers, setSelectedAnswers] = useState(0);
    
      // Handler to update selected answer for a specific question
      const handleAnswerSelect = (index, option) => {
        const newSelectedAnswers = [...selectedAnswers];
        newSelectedAnswers[index] = option;
        setSelectedAnswers(newSelectedAnswers);
      };
    

    return (
        <div>
            <div className="w-full mt-8 ml-8 space-y-6">
                <div className='border shadow-md rounded-xl p-10 flex flex-row justify-around w-3/5'>
                    {category?.options.map((option, index) => (
                        <div key={index} className='space-y-4'>
                            <div className='border rounded-lg px-6 py-2'>
                                <span>{option?.item}</span>
                            </div>
                            <div className='border rounded-lg px-6 py-2 bg-yellow-300'>
                                <span>{option?.category}</span>
                            </div>
                            <div className='border rounded-lg px-6 py-10 bg-yellow-300'>
                                <span></span>
                            </div>
                        </div>
                    ))}
                </div>
                <div className='border shadow-md rounded-xl space-y-8 p-10 w-3/5'>
                    {cloze?.blanks.map((blank, index) => (
                        <div key={index} className='space-y-4'>
                            <span className='border rounded-md p-2'>{blank.correctAnswer}</span>
                            <div className='space-x-2 text-lg font-semibold'>
                                <span>{blank.textBefore}</span>
                                <span className='border px-8 py-2 rounded-md'></span>
                                <span>{blank.textAfter}</span>
                            </div>
                        </div>
                    ))}
                </div>
                <div className='border shadow-md rounded-xl space-y-8 p-10 w-3/5'>
                    <div>{comp?.passage}</div>
                    <div className='space-y-6'>
                        {comp?.questions.map((question, index) => (
                            <div key={index} className="space-y-4">
                            <span className="font-semibold text-lg">{question.question}</span>
                            <div className="space-y-2">
                              {question.options.map((option, optionIndex) => (
                                <label 
                                  key={optionIndex} 
                                  className="flex items-center space-x-3 cursor-pointer group"
                                >
                                  <input
                                    type="radio"
                                    name={`question-${index}`}
                                    value={option}
                                    checked={selectedAnswers[index] === option}
                                    onChange={() => handleAnswerSelect(index, option)}
                                    className="hidden"
                                  />
                                  <span 
                                    className={`
                                      w-5 h-5 rounded-full border-2 
                                      ${selectedAnswers[index] === option 
                                        ? 'bg-blue-500 border-blue-500' 
                                        : 'border-gray-300 group-hover:border-blue-300'}
                                      inline-block transition-all duration-200
                                    `}
                                  >
                                    {selectedAnswers[index] === option && (
                                      <span className="w-2 h-2 bg-white rounded-full block m-1"></span>
                                    )}
                                  </span>
                                  <span className="text-gray-700 group-hover:text-blue-600">
                                    {option}
                                  </span>
                                </label>
                              ))}
                            </div>
                          </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Quiz