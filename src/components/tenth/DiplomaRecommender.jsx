/**
 * CareerPulse AI - Diploma Recommender Component
 * Multi-select interest chips filter to generate grounded polytechnic recommendations.
 */

import React, { useState } from 'react';
import Card from '../common/Card.jsx';
import Badge from '../common/Badge.jsx';
import AIBadge from '../common/AIBadge.jsx';
import Button from '../common/Button.jsx';
import DistrictFilter from '../common/DistrictFilter.jsx';
import { recommendDiplomaAPI } from '../../api/diploma.api.js';
import { Sparkles, Check, Building2, ExternalLink, ShieldCheck } from 'lucide-react';
import toast from 'react-hot-toast';

const POPULAR_TAGS = [
  'coding', 'machines', 'electronics', 'design', 'construction',
  'automotive', 'healthcare', 'business', 'agriculture', 'chemistry', 'marine', 'drawing'
];

export const DiplomaRecommender = () => {
  const [selectedInterests, setSelectedInterests] = useState(['coding', 'machines']);
  const [district, setDistrict] = useState('All');
  const [loading, setLoading] = useState(false);
  const [resultsData, setResultsData] = useState(null);

  const toggleInterest = (tag) => {
    if (selectedInterests.includes(tag)) {
      if (selectedInterests.length === 1) {
        toast.error('Select at least one interest');
        return;
      }
      setSelectedInterests(selectedInterests.filter((t) => t !== tag));
    } else {
      setSelectedInterests([...selectedInterests, tag]);
    }
  };

  const handleGetRecommendations = async () => {
    try {
      setLoading(true);
      const res = await recommendDiplomaAPI({
        interests: selectedInterests,
        district
      });
      if (res?.data) {
        setResultsData(res.data);
        toast.success('Diploma recommendations ready!');
      }
    } catch (err) {
      toast.error(err.message || 'Failed to generate diploma recommendations');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card pastel="white" className="p-6 space-y-5 border border-[#eee8e2]">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-extrabold text-[#2d2a32]">
              Find Matching Diploma Pathways / டிப்ளமோ வழிகாட்டி
            </h3>
            <p className="text-xs text-[#6b6475] mt-0.5">
              Select what hands-on subjects excite you most to discover top courses and colleges.
            </p>
          </div>
          <DistrictFilter value={district} onChange={setDistrict} />
        </div>

        {/* Multi-select Chips */}
        <div className="space-y-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#a49ca8]">
            Pick your interest areas ({selectedInterests.length} selected):
          </span>
          <div className="flex flex-wrap gap-2">
            {POPULAR_TAGS.map((tag) => {
              const active = selectedInterests.includes(tag);
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => toggleInterest(tag)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                    active
                      ? 'bg-[#c3df96] text-[#1e3a12] shadow-xs'
                      : 'bg-[#faf7f5] text-[#6b6475] hover:bg-[#eee8e2]'
                  }`}
                >
                  {active && <Check className="w-3.5 h-3.5" />}
                  <span>#{tag}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <Button
            variant="primary"
            size="md"
            loading={loading}
            onClick={handleGetRecommendations}
            icon={Sparkles}
          >
            Get Diploma Recommendations
          </Button>
        </div>
      </Card>

      {/* Results View */}
      {resultsData && (
        <div className="space-y-6 animate-fade-in">
          <div className="flex items-center justify-between">
            <h4 className="text-base font-extrabold text-[#2d2a32]">
              Recommended Diploma Specializations
            </h4>
            <AIBadge
              generatedBy={resultsData.recommendation?.generatedBy}
              fallbackReason={resultsData.recommendation?.fallbackReason}
              size="xs"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {resultsData.recommendation?.results?.map((rec) => (
              <Card key={rec.id} pastel="white" className="p-5 space-y-3 border border-[#eee8e2]">
                <div className="flex items-center justify-between">
                  <Badge variant={rec.category === 'best' ? 'green' : 'yellow'} size="xs">
                    {rec.category.toUpperCase()} • {rec.matchScore}% Match
                  </Badge>
                  <span className="text-xs font-bold text-[#a49ca8]">{rec.id}</span>
                </div>
                <h4 className="text-base font-extrabold text-[#2d2a32]">{rec.name}</h4>
                <p className="text-xs text-[#4f4a56] leading-relaxed bg-[#faf7f5] p-3 rounded-xl">
                  {rec.reason}
                </p>
              </Card>
            ))}
          </div>

          {/* Matching Colleges */}
          {resultsData.colleges?.length > 0 && (
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-2 text-sm font-extrabold text-[#2d2a32]">
                <Building2 className="w-4 h-4 text-[#b1dfe4]" />
                <span>Affiliated Polytechnic Colleges Offering These Courses ({resultsData.colleges.length})</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {resultsData.colleges.map((col) => (
                  <Card key={col.collegeId} pastel="white" className="p-4 space-y-2 border border-[#eee8e2]">
                    <div className="flex items-center justify-between">
                      <Badge variant="blue" size="xs">{col.district}</Badge>
                      <span className="text-[10px] font-bold text-[#6b6475]">{col.type}</span>
                    </div>
                    <h5 className="text-xs font-bold text-[#2d2a32] line-clamp-2">{col.name}</h5>
                    {col.website && (
                      <a
                        href={col.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] font-bold text-[#123940] hover:underline pt-1"
                      >
                        <span>Official Website</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DiplomaRecommender;
