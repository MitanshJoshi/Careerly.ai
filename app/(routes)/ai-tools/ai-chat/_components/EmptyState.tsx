import React from 'react'

const questionList = [
  "What are the latest trends in AI?",
  "How can I improve my coding skills?",
  "What are the best resources for learning data science?",
];

interface EmptyStateProps {
  onQuestionSelect: (question: string) => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ onQuestionSelect }) => {
  return (
    <div>
      <h2 className='text-2xl font-semibold text-center mt-10'>
        Ask anything to AI career agent
      </h2>
      <p className='text-gray-600 text-center mt-2'>
        You can ask questions related to career, job search, resume building, and more.
      </p>
      <div className='mt-6 flex flex-col items-center justify-center gap-2'>
        {questionList.map((question, index) => (
          <input
            key={index}
            type="text"
            value={question}
            onClick={() => onQuestionSelect(question)}
            readOnly
            className="w-full max-w-3xl px-4 py-4 rounded-lg border border-gray-300 bg-gray-100 hover:border hover:border-1 hover:border-black cursor-pointer text-gray-700 focus:outline-none"
          />
        ))}
      </div>
    </div>
  )
}

export default EmptyState