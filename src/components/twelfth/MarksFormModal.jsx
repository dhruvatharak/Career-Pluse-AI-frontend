/**
 * CareerPulse AI - Marks Entry & Cutoff Modal
 * Form modal supporting Engineering, Medical, Commerce, and Arts/Science marks entry.
 */

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Calculator } from 'lucide-react';
import toast from 'react-hot-toast';
import Modal from '../common/Modal.jsx';
import Button from '../common/Button.jsx';
import MarksStreamFields from './MarksStreamFields.jsx';
import { calculateCutoffAPI } from '../../api/cutoff.api.js';
import { buildCutoffPayload, extractFormDefaults } from './cutoffPayloadHelper.js';

const STREAM_OPTIONS = ['Engineering', 'Medical', 'Commerce', 'Arts', 'Science'];

export const MarksFormModal = ({
  isOpen,
  onClose,
  initialData = null,
  onSaved
}) => {
  const [stream, setStream] = useState(initialData?.stream || 'Engineering');
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: extractFormDefaults(initialData)
  });

  useEffect(() => {
    if (initialData) {
      setStream(initialData.stream || 'Engineering');
      reset(extractFormDefaults(initialData));
    }
  }, [initialData, reset]);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const payload = buildCutoffPayload(data, stream);
      const res = await calculateCutoffAPI(payload);
      toast.success('12th Marks and Cutoff saved successfully!', { icon: '🎓' });
      if (onSaved) onSaved(res.data);
      onClose();
    } catch (err) {
      toast.error(err.message || 'Failed to calculate cutoff');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Enter Your 12th Marks & Entrance Scores"
      subtitle="We will calculate your TNEA Engineering cutoff (/200), NEET bands, and eligible colleges"
      maxWidth="max-w-2xl"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-xs font-bold text-[#4f4a56] mb-2 uppercase tracking-wider">
            Choose Your Target Stream / விருப்பமான பிரிவு
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {STREAM_OPTIONS.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setStream(s)}
                className={`py-2 px-3 rounded-2xl text-xs font-extrabold border transition-all cursor-pointer ${
                  stream === s
                    ? 'bg-[#ffcd64] text-[#2d2a32] border-[#e6b345] shadow-xs scale-102'
                    : 'bg-[#faf7f5] text-[#6b6475] border-[#eee8e2] hover:bg-white'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <MarksStreamFields stream={stream} register={register} errors={errors} />

        <div className="pt-4 border-t border-[#eee8e2] flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            className="text-xs font-bold text-[#a49ca8] hover:text-[#2d2a32] underline cursor-pointer"
          >
            I'll do it later / பிறகு செய்கிறேன்
          </button>

          <Button
            type="submit"
            variant="primary"
            size="md"
            loading={loading}
            icon={Calculator}
          >
            Calculate & Save Cutoff / கணக்கிடு
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default MarksFormModal;
