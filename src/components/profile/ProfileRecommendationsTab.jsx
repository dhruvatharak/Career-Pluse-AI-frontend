/**
 * CareerPulse AI - Profile Recommendations Tab Component
 * Filterable recommendation history (Quiz, Diploma, 12th Career Guide) with view modal and delete actions.
 */

import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Sparkles, Calendar, Trash2, Eye } from 'lucide-react';
import Card from '../common/Card.jsx';
import Badge from '../common/Badge.jsx';
import AIBadge from '../common/AIBadge.jsx';
import Button from '../common/Button.jsx';
import RecommendationDetailModal from './RecommendationDetailModal.jsx';
import { deleteRecommendationAPI } from '../../api/user.api.js';

const TYPE_FILTERS = [
  { id: 'All', label: 'All Recommendations' },
  { id: 'quiz-group', label: 'Quiz (10th)' },
  { id: 'diploma', label: 'Diploma' },
  { id: 'career-12th', label: '12th Career Guide' }
];

export const ProfileRecommendationsTab = ({ recommendations = {}, onDeleted }) => {
  const [filterType, setFilterType] = useState('All');
  const [selectedRec, setSelectedRec] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const allList = [
    ...(recommendations['quiz-group'] || []),
    ...(recommendations.diploma || []),
    ...(recommendations['career-12th'] || [])
  ].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const filteredList = filterType === 'All'
    ? allList
    : allList.filter((r) => r.type === filterType);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this recommendation record?')) {
      return;
    }
    try {
      setDeletingId(id);
      await deleteRecommendationAPI(id);
      toast.success('Recommendation deleted successfully', { icon: '🗑️' });
      if (onDeleted) onDeleted(id);
    } catch (err) {
      toast.error(err.message || 'Could not delete recommendation');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Type Filter Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {TYPE_FILTERS.map((chip) => (
          <button
            key={chip.id}
            type="button"
            onClick={() => setFilterType(chip.id)}
            className={`px-4 py-2 rounded-2xl text-xs font-extrabold whitespace-nowrap transition-all cursor-pointer ${
              filterType === chip.id
                ? 'bg-[#123940] text-white shadow-xs'
                : 'bg-white border border-[#eee8e2] text-[#4f4a56] hover:bg-[#faf7f5]'
            }`}
          >
            {chip.label}
          </button>
        ))}
      </div>

      {/* Recommendations Cards Grid */}
      {filteredList.length === 0 ? (
        <Card pastel="yellow" className="p-8 text-center space-y-2">
          <p className="text-sm font-bold text-[#2d2a32]">No saved recommendations found.</p>
          <p className="text-xs text-[#6b6475]">
            Generate advice using the Aptitude Quiz, Diploma Recommender, or 12th Career Guide.
          </p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredList.map((rec) => (
            <Card key={rec._id} pastel="white" className="p-5 flex flex-col justify-between border border-[#eee8e2] space-y-3">
              <div className="space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <Badge variant={rec.type === 'career-12th' ? 'yellow' : rec.type === 'diploma' ? 'blue' : 'lavender'} size="xs">
                    {rec.type === 'career-12th' ? '12th Guide' : rec.type === 'diploma' ? 'Diploma' : '10th Quiz'}
                  </Badge>
                  <div className="flex items-center gap-2">
                    <AIBadge
                      generatedBy={rec.generatedBy}
                      fallbackReason={rec.fallbackReason}
                      size="xs"
                    />
                    <span className="text-[10px] text-[#a49ca8]">
                      {new Date(rec.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-[#4f4a56] line-clamp-2 leading-relaxed bg-[#faf7f5] p-2.5 rounded-xl border border-[#eee8e2]">
                  {rec.summary}
                </p>

                <div className="text-[11px] font-bold text-[#6b6475]">
                  {rec.results?.length || 0} Programs / Colleges Recommended
                </div>
              </div>

              <div className="pt-3 border-t border-[#eee8e2] flex items-center justify-between">
                <button
                  type="button"
                  disabled={deletingId === rec._id}
                  onClick={() => handleDelete(rec._id)}
                  className="text-xs font-bold text-[#78192a] hover:bg-[#fcdde3] p-1.5 rounded-xl transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete</span>
                </button>

                <Button variant="outline" size="xs" onClick={() => setSelectedRec(rec)} icon={Eye}>
                  View Details
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Details Modal */}
      <RecommendationDetailModal
        isOpen={Boolean(selectedRec)}
        onClose={() => setSelectedRec(null)}
        recommendation={selectedRec}
      />
    </div>
  );
};

export default ProfileRecommendationsTab;
