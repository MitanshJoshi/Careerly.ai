import Image from 'next/image'
import path from 'path'
import React from 'react'
import AiToolsList from './AiToolsList'


const aiToolsList = [
    {
        name: "AI Career Q&A Chat",
        description: "Get instant answers to your career-related questions with our AI-powered chat assistant.",
        icon: "/chatbot.png",
        button:'Ask Now',
        path:'/ai-tools/ai-chat'
    },
    {
        name: "AI Resume Analyzer",
        description: "Get instant feedback on your resume with our AI-powered resume analyzer.",
        icon: "/resume.png",
        button:'Analyze Now',
        path:'/ai-resume-analyzer'
    },
    {
        name: "Career Roadmap Generator",
        description: "Create a personalized career roadmap with our AI-powered roadmap generator.",
        icon: "/roadmap.png",
        button:'Generate Roadmap',
        path:'/career-roadmap-generator'
    },
    {
        name: "Cover Letter Builder",
        description: "Craft a compelling cover letter with our AI-powered cover letter builder.",
        icon: "/cover.png",
        button:'Build Cover Letter',
        path:'/cover-letter-generator'
    },
]

const AiTools = () => {
  return (
    <div className='mt-7 p-5 border rounded-lg  bg-white '>
        <h2 className='text-2xl font-bold mb-2'>AI Tools</h2>
        <p className='text-gray-600 mb-6'>
           Explore our suite of AI-powered tools designed to enhance your career journey. 
        </p>
        <AiToolsList aiToolsList={aiToolsList}/>
        <p className='text-gray-500 text-sm mt-4'>
            Explore these tools to enhance your career journey and achieve your professional goals.
        </p>
       
    </div>  
  )
}

export default AiTools