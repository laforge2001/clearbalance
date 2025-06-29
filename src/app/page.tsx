'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

// Make sure these environment variables are properly set
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Add error handling for missing environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables');
}

const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export default function Home() {
  const [data, setData] = useState<unknown[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!supabase) {
        setError('Supabase client not initialized - check environment variables');
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);
        
        // Replace 'your_table' with your actual table name
        const { data: fetchedData, error: fetchError } = await supabase
          .from('your_table') // Update this to your actual table name
          .select('*');
        
        if (fetchError) {
          console.error('Error fetching data:', fetchError.message);
          setError(fetchError.message);
        } else {
          console.log('Data:', fetchedData);
          setData(fetchedData);
        }
      } catch (e) {
        console.error('An unexpected error occurred:', e);
        setError('An unexpected error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-center font-mono text-sm">
        <h1 className="text-4xl font-bold text-center mb-8">
          ClearBalance
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Your personal finance dashboard is coming soon!
        </p>
        
        {/* Dynamic status based on actual connection */}
        <div className={`border px-4 py-3 rounded text-center ${
          error 
            ? 'bg-red-100 border-red-400 text-red-700'
            : 'bg-green-100 border-green-400 text-green-700'
        }`}>
          ✅ Website deployed successfully!
          <br />
          {isLoading ? (
            '🔄 Connecting to database...'
          ) : error ? (
            `❌ Database connection error: ${error}`
          ) : (
            '✅ Database connected!'
          )}
        </div>

        {/* Optional: Display fetched data */}
        {data && !error && (
          <div className="mt-4 p-4 bg-gray-100 rounded">
            <h2 className="text-lg font-semibold mb-2">Database Data:</h2>
            <pre className="text-xs overflow-auto">
              {JSON.stringify(data, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </main>
  );
}