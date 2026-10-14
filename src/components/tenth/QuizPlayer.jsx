/**
 * CareerPulse AI - Quiz Player Component
 * Interactive step-by-step MCQ assessment with progress tracking and option selection.
 */

import React, { useState } from 'react';
import Card from '../common/Card.jsx';
import Badge from '../common/Badge.jsx';
import Button from '../common/Button.jsx';
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';

export const QuizPlayer = ({ questions = [], onComplete, onCancel }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});

  if (!questions || questions.length === 0) return null;

  const currentQ = questions[currentIndex];
  const total = questions.length;
  const progressPercent = Math.round(((currentIndex + 1) / total) * 100);
  const selectedOption = answers[currentQ.questionId];

  const handleSelectOption = (opt) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQ.questionId]: opt
    }));
  };

  const handleNext = () => {
    if (currentIndex < total - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      const formattedAnswers = Object.entries(answers).map(([questionId, selectedOption]) => ({
        questionId,
        selectedOption
      }));
      onComplete(formattedAnswers);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex((prev) => prev - 1);
  };

  const options = [
    { key: 'A', text: currentQ.optionA },
    { key: 'B', text: currentQ.optionB },
    { key: 'C', text: currentQ.optionC },
    { key: 'D', text: currentQ.optionD }
  ];

  return (
    <Card pastel="white" className="p-6 sm:p-8 space-y-6 max-w-2xl mx-auto shadow-sm">
      {/* Top Header & Progress */}
      <div className="space-y-3 border-b border-[#eee8e2] pb-4">
        <div className="flex items-center justify-between text-xs font-bold text-[#6b6475]">
          <Badge variant="yellow" size="xs">
            {currentQ.category}
          </Badge>
          <span>
            Question {currentIndex + 1} of {total} ({progressPercent}%)
          </span>
        </div>
        <div className="w-full h-2 rounded-full bg-[#faf7f5] border border-[#eee8e2] overflow-hidden">
          <div
            className="h-full bg-[#ffcd64] transition-all duration-300 rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Question Text */}
      <h3 className="text-base sm:text-lg font-extrabold text-[#2d2a32] leading-snug">
        {currentQ.question}
      </h3>

      {/* Options List */}
      <div className="space-y-3">
        {options.map((opt) => {
          const isSelected = selectedOption === opt.key;
          return (
            <button
              key={opt.key}
              type="button"
              onClick={() => handleSelectOption(opt.key)}
              className={`w-full text-left p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-4 select-none ${
                isSelected
                  ? 'border-[#ffcd64] bg-[#ffcd64]/15 shadow-xs ring-1 ring-[#ffcd64]'
                  : 'border-[#eee8e2] bg-[#faf7f5] hover:bg-white hover:border-[#dec7e0]'
              }`}
            >
              <div className="flex items-center gap-3">
                <span
                  className={`w-7 h-7 rounded-xl flex items-center justify-center font-extrabold text-xs shrink-0 ${
                    isSelected ? 'bg-[#ffcd64] text-[#2d2a32]' : 'bg-white text-[#6b6475] border border-[#eee8e2]'
                  }`}
                >
                  {opt.key}
                </span>
                <span className="text-xs sm:text-sm font-semibold text-[#2d2a32]">
                  {opt.text}
                </span>
              </div>
              {isSelected && <CheckCircle2 className="w-4 h-4 text-[#ffcd64] shrink-0" />}
            </button>
          );
        })}
      </div>

      {/* Navigation Controls */}
      <div className="pt-4 border-t border-[#eee8e2] flex items-center justify-between gap-4">
        <Button
          variant="outline"
          size="sm"
          disabled={currentIndex === 0}
          onClick={handlePrev}
          icon={ArrowLeft}
        >
          Previous
        </Button>

        <div className="flex items-center gap-2">
          {onCancel && (
            <Button variant="ghost" size="sm" onClick={onCancel}>
              Cancel
            </Button>
          )}
          <Button
            variant="primary"
            size="sm"
            disabled={!selectedOption}
            onClick={handleNext}
            icon={currentIndex === total - 1 ? CheckCircle2 : ArrowRight}
          >
            {currentIndex === total - 1 ? 'Submit & Analyze' : 'Next Question'}
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default QuizPlayer;
