import React, { useState } from 'react';
import ChessBoard from './ChessBoard';

const ChessLesson = ({ 
  title, 
  description, 
  content, 
  position = 'start',
  pgn,
  difficulty = 'beginner',
  tags = []
}) => {
  const [showSolution, setShowSolution] = useState(false);

  // Define CSS classes for difficulty badges
  const difficultyClasses = {
    'beginner': 'bg-green-100 text-green-800',
    'intermediate': 'bg-yellow-100 text-yellow-800',
    'advanced': 'bg-orange-100 text-orange-800',
    'expert': 'bg-red-100 text-red-800'
  };
  
  return (
    <div className="chess-lesson mb-10 rounded-lg border border-border p-6 dark:border-darkmode-border">
      <div className="lesson-header mb-4">
        <h3 className="mb-2">{title}</h3>
        <div className="flex flex-wrap gap-2 mb-3">
          <span className={`inline-block px-2 py-1 text-xs font-medium rounded-md ${difficultyClasses[difficulty] || ''}`}>
            {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
          </span>
          
          {tags.map((tag, index) => (
            <span key={index} className="inline-block px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-md">
              {tag}
            </span>
          ))}
        </div>
        <p className="text-gray-700 dark:text-gray-300">{description}</p>
      </div>
      
      <div className="chess-board-wrapper mb-6">
        <ChessBoard 
          fen={position} 
          pgn={pgn} 
          interactive={false}
        />
      </div>
      
      <div className="lesson-content mb-6">
        {content}
      </div>
      
      {showSolution ? (
        <div className="solution mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <h4 className="text-lg font-medium mb-2">Solution</h4>
          <div className="solution-pgn whitespace-pre-wrap font-mono text-sm">
            {pgn}
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setShowSolution(true)}
          className="btn btn-sm btn-outline-primary"
        >
          Show Solution
        </button>
      )}
    </div>
  );
};

export default ChessLesson;