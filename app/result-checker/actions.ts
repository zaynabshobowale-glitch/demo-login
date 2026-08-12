'use server';

import { createClient } from '@/lib/supabase/server';
import { ActionResponse, StudentResult } from '@/types/result';

export async function checkResult(
  prevState: ActionResponse, 
  formData: FormData
): Promise<ActionResponse> {
  const studentId = formData.get('studentId')?.toString().trim();
  const pin = formData.get('pin')?.toString().trim();

  // Validate presence
  if (!studentId || !pin) {
    return {
      success: false,
      error: 'Both Student ID and Scratch Card PIN are required.',
    };
  }

  try {
    const supabase = await createClient();

    // Query database for matching record
    const { data, error } = await supabase
      .from('results')
      .select('*')
      .eq('student_id', studentId)
      .eq('pin', pin)
      .single();

    if (error || !data) {
      return {
        success: false,
        error: 'Invalid Student ID or PIN. Please check your credentials and try again.',
      };
    }

    return {
      success: true,
      data: data as StudentResult,
    };
  } catch (err) {
    return {
      success: false,
      error: 'An unexpected error occurred while fetching results.',
    };
  }
}