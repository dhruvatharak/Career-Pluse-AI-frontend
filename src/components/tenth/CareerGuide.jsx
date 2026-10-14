/**
 * CareerPulse AI - Career Guide Container Component
 * Coordinates quiz introductory onboarding, optional 10th marks input, interactive test player, and result view.
 */

import React, { useState, useEffect } from 'react';
import Card from '../common/Card.jsx';
import Button from '../common/Button.jsx';
import Badge from '../common/Badge.jsx';
import Loader from '../common/Loader.jsx';
import EmptyState from '../common/EmptyState.jsx';
import QuizPlayer from './QuizPlayer.jsx';
import QuizResult from './QuizResult.jsx';
import { fetchQuizQuestions, submitQuizAPI } from '../../api/quiz.api.js';
import { Compass, Sparkles, ChevronDown, ChevronUp, BookOpen, Award } from 'lucide-react';
import toast from 'react-hot-toast';

export const CareerGuide = () => {
  const [step, setStep] = useState('intro'); // 'intro' | 'playing' | 'loading' | 'result'
  const [questions, setQuestions] = useState([]);
  const [loadingQuestions, setLoadingQuestions] = useState(false);
  const [error, setError] = useState(null);

  // Optional 10th Marks
  const [showMarksForm, setShowMarksForm] = useState(false);
  const [marks, setMarks] = useState({ maths: '', science: '', social: '', english: '', tamil: '' });

  // Quiz result
  const [recommendation, setRecommendation] = useState(null);

  const loadQuestions = async () => {
    try {
      setLoadingQuestions(true);
      setError(null);
      const res = await fetchQuizQuestions();
      if (res?.data) setQuestions(res.data);
    } catch (err) {
      setError(err.message || 'Failed to load quiz questions');
    } finally {
      setLoadingQuestions(false);
    }
  };

  useEffect(() => {
    loadQuestions();
  }, []);

  const handleStartQuiz = () => {
    if (questions.length === 0) {
      toast.error('Questions are not loaded yet. Please retry.');
      return;
    }
    setStep('playing');
  };

  const handleQuizComplete = async (submittedAnswers) => {
    try {
      setStep('loading');
      const total =
        (Number(marks.maths) || 0) +
        (Number(marks.science) || 0) +
        (Number(marks.social) || 0) +
        (Number(marks.english) || 0) +
        (Number(marks.tamil) || 0);

      const tenthMarks =
        marks.maths || marks.science || marks.social
          ? {
              maths: Number(marks.maths) || 0,
              science: Number(marks.science) || 0,
              social: Number(marks.social) || 0,
              english: Number(marks.english) || 0,
              tamil: Number(marks.tamil) || 0,
              total
            }
          : null;

      const res = await submitQuizAPI({ answers: submittedAnswers, tenthMarks });
      if (res?.data?.recommendation) {
        setRecommendation(res.data.recommendation);
        setStep('result');
        toast.success('Your personalized pathways are ready!');
      } else {
        throw new Error('Unexpected response format from recommendation engine');
      }
    } catch (err) {
      toast.error(err.message || 'Failed to submit quiz');
      setStep('intro');
    }
  };

  if (loadingQuestions) return <Loader message="Preparing Tamil Nadu Career Aptitude assessment..." />;
  if (error) return <EmptyState title="Could not load quiz" description={error} onReset={loadQuestions} />;

  if (step === 'playing') {
    return (
      <QuizPlayer
        questions={questions}
        onComplete={handleQuizComplete}
        onCancel={() => setStep('intro')}
      />
    );
  }

  if (step === 'loading') {
    return (
      <Card pastel="lavender" className="p-10 text-center max-w-lg mx-auto space-y-4 animate-pulse">
        <div className="w-16 h-16 rounded-3xl bg-[#dec7e0] flex items-center justify-center mx-auto text-[#361a3b]">
          <Sparkles className="w-8 h-8 animate-spin" />
        </div>
        <Badge variant="purple" size="sm">AI Pathway Engine (Groq / Gemini)</Badge>
        <h3 className="text-xl font-extrabold text-[#2d2a32]">Analyzing Your Responses...</h3>
        <p className="text-xs sm:text-sm text-[#6b6475]">
          Synthesizing your aptitude, interests, and Tamil Nadu state board curriculum roadmaps.
        </p>
      </Card>
    );
  }

  if (step === 'result' && recommendation) {
    return <QuizResult recommendation={recommendation} onRetake={() => setStep('intro')} />;
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
      <Card pastel="lavender" className="p-6 sm:p-8 space-y-5">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-[#dec7e0] flex items-center justify-center text-[#361a3b]">
            <Compass className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-extrabold text-[#2d2a32]">Career Guide & Aptitude Assessment</h3>
            <p className="text-xs text-[#6b6475] mt-0.5">20 questions grounded in Tamil Nadu higher secondary combinations.</p>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-[#4f4a56] leading-relaxed">
          Not sure whether to choose Bio-Maths, Computer Science, Commerce, or Pure Science? Take this 5-minute interactive test to receive recommendations with personalized reasons and career roadmaps.
        </p>

        {/* Collapsible Marks Form */}
        <div className="border border-[#dec7e0]/50 rounded-2xl bg-white/80 p-4 space-y-3">
          <button
            type="button"
            onClick={() => setShowMarksForm(!showMarksForm)}
            className="w-full flex items-center justify-between text-xs font-bold text-[#361a3b] cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-[#dec7e0]" />
              <span>Optional: Add my 10th Standard marks to boost accuracy</span>
            </div>
            {showMarksForm ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {showMarksForm && (
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 pt-2 border-t border-[#eee8e2]">
              {['maths', 'science', 'social', 'english', 'tamil'].map((subj) => (
                <div key={subj}>
                  <label className="text-[10px] uppercase font-bold text-[#a49ca8] block mb-1">{subj}</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    placeholder="Marks"
                    value={marks[subj]}
                    onChange={(e) => setMarks({ ...marks, [subj]: e.target.value })}
                    className="w-full px-2.5 py-1.5 rounded-xl border border-[#eee8e2] bg-[#faf7f5] text-xs font-bold text-[#2d2a32] focus:outline-none focus:border-[#ffcd64]"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="pt-2 flex justify-end">
          <Button variant="primary" size="lg" icon={Sparkles} onClick={handleStartQuiz}>
            Start Career Quiz / தேர்வைத் தொடங்கு
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default CareerGuide;
