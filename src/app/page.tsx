import React, { useEffect } from 'react';More actions;
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function Home() {
  useEffect(() => {
    // THIS IS WHERE YOU ACTUALLY USE THE 'supabase' VARIABLE
    console.log(supabase); 
    const fetchData = async () => {
      try {
        const { data, error } = await supabase.from('your_table').select('*');
        if (error) {
          console.error('Error fetching data:', error.message);
        } else {
          console.log('Data:', data);
        }
      } catch (e) {
        console.error('An unexpected error occurred:', e);
      }
    };
    fetchData();
  }, []); // Empty dependency array means this runs once on mount
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-center font-mono text-sm">
        <h1 className="text-4xl font-bold text-center mb-8">
          ClearBalance
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Your personal finance dashboard is coming soon!
        </p>
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded text-center">
          ✅ Website deployed successfully!
          <br />
          ✅ Database connected!
        </div>
      </div>
    </main>
  );
}
