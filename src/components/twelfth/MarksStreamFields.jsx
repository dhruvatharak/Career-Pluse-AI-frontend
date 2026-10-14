/**
 * CareerPulse AI - Stream Specific Form Fields
 * Dynamically renders inputs for Engineering, Medical, Commerce, and Arts/Science.
 */

import React from 'react';

export const MarksStreamFields = ({ stream, register, errors }) => {
  const inputClass = (fieldName) =>
    `w-full px-3.5 py-2.5 rounded-2xl border text-sm font-bold bg-white transition-colors focus:outline-none ${
      errors?.[fieldName]
        ? 'border-[#f5b8c3] focus:border-[#e02444]'
        : 'border-[#eee8e2] focus:border-[#ffcd64]'
    }`;

  const renderField = (name, label, required = true, max = 100, min = 0) => (
    <div>
      <label className="block text-xs font-bold text-[#4f4a56] mb-1">
        {label} {required && <span className="text-[#e02444]">*</span>}
      </label>
      <input
        type="number"
        step="any"
        placeholder={`0 - ${max}`}
        {...register(name, {
          required: required ? `${label} is required` : false,
          min: { value: min, message: `Min is ${min}` },
          max: { value: max, message: `Max is ${max}` }
        })}
        className={inputClass(name)}
      />
      {errors?.[name] && (
        <p className="text-[11px] font-semibold text-[#e02444] mt-1">
          {errors[name]?.message}
        </p>
      )}
    </div>
  );

  if (stream === 'Engineering') {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {renderField('maths', 'Maths (out of 100)', true)}
          {renderField('physics', 'Physics (out of 100)', true)}
          {renderField('chemistry', 'Chemistry (out of 100)', true)}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          {renderField('computerScience', 'Computer Science (Optional)', false)}
          {renderField('jeeScore', 'JEE Main Score', false, 300, 0)}
          {renderField('jeeRank', 'JEE All India Rank', false, 1000000, 1)}
        </div>
      </div>
    );
  }

  if (stream === 'Medical') {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {renderField('physics', 'Physics (out of 100)', true)}
          {renderField('chemistry', 'Chemistry (out of 100)', true)}
          {renderField('biology', 'Biology (out of 100)', true)}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          {renderField('neetScore', 'NEET UG Score (out of 720)', true, 720, 0)}
          {renderField('maths', 'Maths / Other Subject', false)}
        </div>
      </div>
    );
  }

  if (stream === 'Commerce') {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {renderField('accountancy', 'Accountancy', true)}
          {renderField('commerce', 'Commerce', true)}
          {renderField('economics', 'Economics', true)}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          {renderField('businessMaths', 'Business Maths', false)}
          {renderField('computerScience', 'Computer Applications', false)}
        </div>
      </div>
    );
  }

  // Arts & Science generic stream
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {renderField('maths', 'Major Subject 1', true)}
        {renderField('physics', 'Major Subject 2', true)}
        {renderField('chemistry', 'Major Subject 3', true)}
        {renderField('other', 'Language / Allied Subject', true)}
      </div>
    </div>
  );
};

export default MarksStreamFields;
