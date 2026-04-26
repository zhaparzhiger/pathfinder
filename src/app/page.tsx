import { createClient } from '@/utils/supabase/server';
import { fetchUserResults } from './actions';
import LandingClient from './LandingClient';

export default async function Page() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  let hasResults = false;
  if (user) {
    const result = await fetchUserResults(user.id);
    if (result) hasResults = true;
  }

  return <LandingClient user={user} hasResults={hasResults} />;
}
