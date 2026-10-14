/**
 * CareerPulse AI - 12th Career Guide SubTab Component
 * Coordinates career track option selection, AI recommendations, results view, and history.
 */

import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { Award, PlusCircle, AlertCircle } from 'lucide-react';
import CareerGuideOptionsSelector from './CareerGuideOptionsSelector.jsx';
import CareerGuideResultsView from './CareerGuideResultsView.jsx';
import CareerGuideHistoryList from './CareerGuideHistoryList.jsx';
import Card from '../common/Card.jsx';
import Button from '../common/Button.jsx';
import { getCareerGuideRecommendations, fetchCareerGuideHistory } from '../../api/careerGuide.api.js';
import { fetchCourses } from '../../api/course.api.js';

export const CareerGuideSubTab = ({ cutoffRecord, onOpenMarksModal }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [district, setDistrict] = useState('All');
  const [preferredCourse, setPreferredCourse] = useState('');
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [recommendationData, setRecommendationData] = useState(null);
  const [history, setHistory] = useState([]);

  // Set default option matching student's stream if available
  useEffect(() => {
    if (cutoffRecord?.stream && selectedOptions.length === 0) {
      if (cutoffRecord.stream === 'Engineering') setSelectedOptions(['Engineering Stream']);
      else if (cutoffRecord.stream === 'Medical') setSelectedOptions(['Medical Stream']);
      else if (cutoffRecord.stream === 'Commerce') setSelectedOptions(['Commerce Stream']);
      else setSelectedOptions(['Arts & Science Stream']);
    }
  }, [cutoffRecord]);

  // Load course catalog options and past career guide history
  useEffect(() => {
    fetchCourses()
      .then((res) => setCourses(res?.data || []))
      .catch(() => setCourses([]));

    fetchCareerGuideHistory()
      .then((res) => {
        if (res?.data && res.data.length > 0) {
          setHistory(res.data);
          // Auto-load latest recommendation if not yet generated
          if (!recommendationData) {
            setRecommendationData({ recommendation: res.data[0], govJobs: [] });
          }
        }
      })
      .catch(() => setHistory([]));
  }, []);

  // Reset preferredCourse if it no longer matches selected stream options
  const handleOptionsChange = (newOptions) => {
    setSelectedOptions(newOptions);
    if (preferredCourse && courses.length > 0) {
      const selectedStreams = [];
      if (newOptions.includes('Engineering Stream')) selectedStreams.push('Engineering');
      if (newOptions.includes('Medical Stream')) selectedStreams.push('Medical');
      if (newOptions.includes('Commerce Stream')) selectedStreams.push('Commerce');
      if (newOptions.includes('Arts & Science Stream')) {
        selectedStreams.push('Arts', 'Science');
      }

      if (selectedStreams.length > 0) {
        const currentCourse = courses.find((c) => c.courseId === preferredCourse);
        if (currentCourse && !selectedStreams.includes(currentCourse.stream)) {
          setPreferredCourse('');
        }
      }
    }
  };

  useEffect(() => {
    if (!preferredCourse || courses.length === 0) return;
    const selectedStreams = [];
    if (selectedOptions.includes('Engineering Stream')) selectedStreams.push('Engineering');
    if (selectedOptions.includes('Medical Stream')) selectedStreams.push('Medical');
    if (selectedOptions.includes('Commerce Stream')) selectedStreams.push('Commerce');
    if (selectedOptions.includes('Arts & Science Stream')) {
      selectedStreams.push('Arts', 'Science');
    }
    if (selectedStreams.length > 0) {
      const currentCourse = courses.find((c) => c.courseId === preferredCourse);
      if (currentCourse && !selectedStreams.includes(currentCourse.stream)) {
        setPreferredCourse('');
      }
    }
  }, [selectedOptions, courses, preferredCourse]);

  const handleGenerate = async () => {
    if (!cutoffRecord) {
      toast.error('Please add your 12th marks first');
      onOpenMarksModal();
      return;
    }

    try {
      setLoading(true);
      const res = await getCareerGuideRecommendations({
        options: selectedOptions,
        district: district !== 'All' ? district : '',
        preferredCourse
      });

      setRecommendationData(res.data);
      toast.success('Your personalized 12th career guide is ready!', { icon: '🎓' });

      // Refresh history
      fetchCareerGuideHistory().then((h) => setHistory(h?.data || []));
    } catch (err) {
      toast.error(err.message || 'Could not generate career guide');
      if (err.message?.includes('Please add your marks first')) {
        onOpenMarksModal();
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Missing Marks Banner if user hasn't added marks */}
      {!cutoffRecord && (
        <Card pastel="yellow" className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#ffcd64] flex items-center justify-center text-[#2d2a32]">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-extrabold text-[#2d2a32]">
                12th Board Marks Not Yet Entered
              </h4>
              <p className="text-xs text-[#6b6475]">
                Enter your subject marks or entrance exam scores to calculate cutoff parity.
              </p>
            </div>
          </div>
          <Button variant="primary" size="sm" onClick={onOpenMarksModal} icon={PlusCircle}>
            Enter 12th Marks / மதிப்பெண்கள் சேர்
          </Button>
        </Card>
      )}

      {/* Options Selector */}
      <CareerGuideOptionsSelector
        selectedOptions={selectedOptions}
        onOptionsChange={handleOptionsChange}
        district={district}
        onDistrictChange={setDistrict}
        preferredCourse={preferredCourse}
        onPreferredCourseChange={setPreferredCourse}
        courses={courses}
        onSubmit={handleGenerate}
        loading={loading}
      />

      {/* Results View */}
      {recommendationData?.recommendation && (
        <CareerGuideResultsView
          recommendation={recommendationData.recommendation}
          govJobs={recommendationData.govJobs}
          cutoffRecord={cutoffRecord}
        />
      )}

      {/* Collapsible History */}
      <CareerGuideHistoryList
        history={history}
        onSelectRecommendation={(rec) => setRecommendationData({ recommendation: rec, govJobs: [] })}
      />
    </div>
  );
};

export default CareerGuideSubTab;
