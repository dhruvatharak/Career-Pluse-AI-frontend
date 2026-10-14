/**
 * CareerPulse AI - Frontend Shared Constants
 * Tamil Nadu districts, categories, streams, chance badge styles, and official disclaimers.
 */

export const TN_DISTRICTS = [
  'Ariyalur',
  'Chengalpattu',
  'Chennai',
  'Coimbatore',
  'Cuddalore',
  'Dharmapuri',
  'Dindigul',
  'Erode',
  'Kallakurichi',
  'Kanchipuram',
  'Kanyakumari',
  'Karur',
  'Krishnagiri',
  'Madurai',
  'Mayiladuthurai',
  'Nagapattinam',
  'Namakkal',
  'Nilgiris',
  'Perambalur',
  'Pudukkottai',
  'Ramanathapuram',
  'Ranipet',
  'Salem',
  'Sivaganga',
  'Tenkasi',
  'Thanjavur',
  'Theni',
  'Thoothukudi',
  'Tiruchirappalli',
  'Tirunelveli',
  'Tirupathur',
  'Tiruppur',
  'Tiruvallur',
  'Tiruvannamalai',
  'Tiruvarur',
  'Vellore',
  'Viluppuram',
  'Virudhunagar'
];

export const RESERVATION_CATEGORIES = [
  { value: 'OC', label: 'OC (Open Competition)' },
  { value: 'BC', label: 'BC (Backward Class)' },
  { value: 'BCM', label: 'BCM (Backward Class Muslim)' },
  { value: 'MBC', label: 'MBC / DNC (Most Backward Class)' },
  { value: 'SC', label: 'SC (Scheduled Caste)' },
  { value: 'SCA', label: 'SCA (SC Arunthathiyar)' },
  { value: 'ST', label: 'ST (Scheduled Tribe)' }
];

export const CHANCE_CONFIG = {
  HIGH: {
    label: 'High Chance',
    badgeClass: 'bg-[#c3df96] text-[#1e3a12] border border-[#a8c973]',
    bg: '#c3df96'
  },
  GOOD: {
    label: 'Good Chance',
    badgeClass: 'bg-[#b1dfe4] text-[#123940] border border-[#91cad0]',
    bg: '#b1dfe4'
  },
  MODERATE: {
    label: 'Moderate Chance',
    badgeClass: 'bg-[#dec7e0] text-[#361a3b] border border-[#c9accb]',
    bg: '#dec7e0'
  },
  BORDERLINE: {
    label: 'Borderline Chance',
    badgeClass: 'bg-[#ffcd64] text-[#4d3800] border border-[#e6b345]',
    bg: '#ffcd64'
  },
  LOW: {
    label: 'Low / Not Eligible',
    badgeClass: 'bg-[#fcdde3] text-[#5c1c28] border border-[#f5b8c3]',
    bg: '#fcdde3'
  }
};

export const OFFICIAL_DISCLAIMER =
  'Previous-year cutoff does not guarantee admission in the current year. Cutoffs, seats, eligibility, fees and recruitment requirements can change every year. Always verify the latest information from the official authority before applying.';

export const OFFICIAL_DISCLAIMER_TA =
  'முந்தைய ஆண்டு கட்-ஆஃப் நடப்பு ஆண்டில் சேர்க்கையை உறுதிப்படுத்தாது. சேர்க்கை மற்றும் தகுதிகள் அதிகாரப்பூர்வ அறிவிப்பின்படி சரிபார்க்கப்பட வேண்டும்.';

export const CAREER_GUIDE_OPTIONS = [
  'NEET',
  'Without NEET',
  'JEE',
  'Without JEE',
  'Engineering Stream',
  'Medical Stream',
  'Commerce Stream',
  'Arts & Science Stream'
];

/**
 * Global toggle to show 'Demo Data' badge on items whose isSample = true.
 * Set to false once real official datasets replace CSV demo rows.
 */
export const SHOW_DEMO_BADGE = true;

