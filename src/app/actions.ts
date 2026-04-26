'use server';

import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';

export async function submitTest(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login?error=Please log in to save your test results');
  }

  const userId = user.id;
  
  const answersJson = formData.get('answers') as string;
  let answers: string[] = [];
  try {
    if (answersJson) answers = JSON.parse(answersJson);
  } catch(e) {}

  // Calculate RIASEC scores
  const scores: Record<string, number> = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };
  for (const type of answers) {
    if (scores[type] !== undefined) {
      scores[type]++;
    }
  }

  // Sort by score descending
  const sortedTypes = Object.keys(scores).sort((a, b) => scores[b] - scores[a]);
  const top2 = sortedTypes.slice(0, 2).join(''); // e.g., 'IR', 'SA'

  // Map to personality type and careers
  const mappings: Record<string, { type: string, careers: string[] }> = {
    'RI': { type: 'Realistic-Investigative (The Doer/Thinker)', careers: ['Mechanical Engineer', 'Software Developer', 'Architect'] },
    'RA': { type: 'Realistic-Artistic (The Creator)', careers: ['Product Designer', 'Chef', 'Animator'] },
    'RS': { type: 'Realistic-Social (The Helper)', careers: ['Physical Therapist', 'Athletic Trainer', 'Police Officer'] },
    'RE': { type: 'Realistic-Enterprising (The Builder)', careers: ['Construction Manager', 'Contractor', 'Logistics Director'] },
    'RC': { type: 'Realistic-Conventional (The Organizer)', careers: ['Surveyor', 'Quality Inspector', 'IT Technician'] },
    'IR': { type: 'Investigative-Realistic (The Analyst)', careers: ['Data Scientist', 'Biomedical Engineer', 'Geologist'] },
    'IA': { type: 'Investigative-Artistic (The Innovator)', careers: ['Research Scientist', 'UX Researcher', 'Astronomer'] },
    'IS': { type: 'Investigative-Social (The Scholar)', careers: ['Professor', 'Psychologist', 'Medical Doctor'] },
    'IE': { type: 'Investigative-Enterprising (The Strategist)', careers: ['Management Analyst', 'Economist', 'Financial Quant'] },
    'IC': { type: 'Investigative-Conventional (The Evaluator)', careers: ['Actuary', 'Technical Writer', 'Information Security Analyst'] },
    'AR': { type: 'Artistic-Realistic (The Maker)', careers: ['Industrial Designer', 'Sound Engineer', 'Photographer'] },
    'AI': { type: 'Artistic-Investigative (The Explorer)', careers: ['Writer', 'Anthropologist', 'Sociologist'] },
    'AS': { type: 'Artistic-Social (The Expresser)', careers: ['Art Therapist', 'Teacher', 'Counselor'] },
    'AE': { type: 'Artistic-Enterprising (The Visionary)', careers: ['Creative Director', 'Public Relations Manager', 'Producer'] },
    'AC': { type: 'Artistic-Conventional (The Detailer)', careers: ['Graphic Designer', 'Editor', 'Curator'] },
    'SR': { type: 'Social-Realistic (The Caretaker)', careers: ['Nurse', 'Occupational Therapist', 'Paramedic'] },
    'SI': { type: 'Social-Investigative (The Advisor)', careers: ['Clinical Psychologist', 'Dietitian', 'Speech Pathologist'] },
    'SA': { type: 'Social-Artistic (The Communicator)', careers: ['Special Education Teacher', 'Interpreter', 'Social Worker'] },
    'SE': { type: 'Social-Enterprising (The Leader)', careers: ['School Principal', 'HR Manager', 'Sales Manager'] },
    'SC': { type: 'Social-Conventional (The Supporter)', careers: ['Medical Assistant', 'HR Specialist', 'Librarian'] },
    'ER': { type: 'Enterprising-Realistic (The Director)', careers: ['Operations Manager', 'Project Manager', 'Entrepreneur'] },
    'EI': { type: 'Enterprising-Investigative (The Pioneer)', careers: ['Venture Capitalist', 'Market Researcher', 'Consultant'] },
    'EA': { type: 'Enterprising-Artistic (The Promoter)', careers: ['Marketing Director', 'Event Planner', 'Brand Manager'] },
    'ES': { type: 'Enterprising-Social (The Persuader)', careers: ['Real Estate Agent', 'Politician', 'Sales Executive'] },
    'EC': { type: 'Enterprising-Conventional (The Organizer)', careers: ['Financial Manager', 'Accountant', 'Compliance Officer'] },
    'CR': { type: 'Conventional-Realistic (The Technician)', careers: ['Database Administrator', 'Electrician', 'Draftsman'] },
    'CI': { type: 'Conventional-Investigative (The Auditor)', careers: ['Financial Analyst', 'Auditor', 'Statistician'] },
    'CA': { type: 'Conventional-Artistic (The Formatter)', careers: ['Web Developer', 'Copy Editor', 'Archivist'] },
    'CS': { type: 'Conventional-Social (The Coordinator)', careers: ['Office Manager', 'Customer Success Manager', 'Paralegal'] },
    'CE': { type: 'Conventional-Enterprising (The Administrator)', careers: ['Business Analyst', 'Logistics Manager', 'Banker'] }
  };

  const defaultMapping = { type: 'Balanced Explorer', careers: ['Business Operations', 'General Management', 'Consulting'] };
  
  // Find mapping regardless of order (e.g. if 'IR' doesn't exist, try 'RI')
  const matchedMapping = mappings[top2] || mappings[top2.split('').reverse().join('')] || defaultMapping;
  
  const personalityType = matchedMapping.type;
  const topCareers = JSON.stringify(matchedMapping.careers);

  // Save to Supabase
  const { error } = await supabase
    .from('test_results')
    .insert([
      {
        user_id: userId,
        personality_type: top2, // Save the code (e.g. 'IR')
        top_careers: topCareers // Keep careers as JSON for now, or we can look them up by code too
      }
    ]);

  if (error) {
    console.error('Error inserting test result:', error);
  }

  // Redirect to results page
  redirect(`/results`);
}

export async function fetchUserResults(userId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('test_results')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(1)
    .single();

  if (error) {
    console.error('Error fetching test result:', error);
    return null;
  }

  return data;
}
