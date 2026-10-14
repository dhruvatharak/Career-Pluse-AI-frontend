/**
 * CareerPulse AI - Cutoff Payload Formatting Helper
 */

export const buildCutoffPayload = (data, stream) => {
  const marksPayload = {
    maths: data.maths !== '' && data.maths !== undefined ? Number(data.maths) : null,
    physics: data.physics !== '' && data.physics !== undefined ? Number(data.physics) : null,
    chemistry: data.chemistry !== '' && data.chemistry !== undefined ? Number(data.chemistry) : null,
    biology: data.biology !== '' && data.biology !== undefined ? Number(data.biology) : null,
    computerScience: data.computerScience !== '' && data.computerScience !== undefined ? Number(data.computerScience) : null,
    accountancy: data.accountancy !== '' && data.accountancy !== undefined ? Number(data.accountancy) : null,
    economics: data.economics !== '' && data.economics !== undefined ? Number(data.economics) : null,
    commerce: data.commerce !== '' && data.commerce !== undefined ? Number(data.commerce) : null,
    businessMaths: data.businessMaths !== '' && data.businessMaths !== undefined ? Number(data.businessMaths) : null,
    other: data.other !== '' && data.other !== undefined ? Number(data.other) : null
  };

  return {
    stream,
    twelfthMarks: marksPayload,
    jee: data.jeeScore || data.jeeRank ? {
      score: data.jeeScore ? Number(data.jeeScore) : null,
      rank: data.jeeRank ? Number(data.jeeRank) : null
    } : null,
    neet: data.neetScore !== '' && data.neetScore !== undefined ? { score: Number(data.neetScore) } : null
  };
};

export const extractFormDefaults = (initialData) => ({
  maths: initialData?.twelfthMarks?.maths ?? '',
  physics: initialData?.twelfthMarks?.physics ?? '',
  chemistry: initialData?.twelfthMarks?.chemistry ?? '',
  biology: initialData?.twelfthMarks?.biology ?? '',
  computerScience: initialData?.twelfthMarks?.computerScience ?? '',
  accountancy: initialData?.twelfthMarks?.accountancy ?? '',
  economics: initialData?.twelfthMarks?.economics ?? '',
  commerce: initialData?.twelfthMarks?.commerce ?? '',
  businessMaths: initialData?.twelfthMarks?.businessMaths ?? '',
  other: initialData?.twelfthMarks?.other ?? '',
  neetScore: initialData?.neet?.score ?? '',
  jeeScore: initialData?.jee?.score ?? '',
  jeeRank: initialData?.jee?.rank ?? ''
});
