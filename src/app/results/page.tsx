import { fetchUserResults } from '../actions';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import ResultsClient from './ResultsClient';

export default async function ResultsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const result = await fetchUserResults(user.id);
  
  if (!result) {
    redirect('/test');
  }

  return <ResultsClient user={user} result={result} />;
}
