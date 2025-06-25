import Button from '@/components/CustomButton';
import Image from 'next/image'
import React from 'react'

interface AiTool {
    name: string;
    description: string;
    icon: string;
    button: string;
    path: string;
}

interface AiToolsListProps {
    aiToolsList: AiTool[];
}

const AiToolsList: React.FC<AiToolsListProps> = ({ aiToolsList }) => {
  return (
      <div className='grid grid-cols-1 lg:grid-cols-4 gap-6'>
        {aiToolsList.map((tool, index) => (
            <div
                key={index}
                className='p-4 border rounded-lg shadow hover:shadow-lg transition-shadow flex flex-col h-full'
            >
                <div className="flex items-center gap-3 mb-2">
                    <Image width={50} height={50} src={tool.icon} alt={tool.name} />
                    <h3 className='text-xl font-semibold'>{tool.name}</h3>
                </div>
                <p className='text-gray-600 mb-4 flex-1'>{tool.description}</p>
                <Button
                href={tool.path}
                >
                    
                {tool.button}
                </Button>
            </div>
        ))}
    </div>
  )
}

export default AiToolsList