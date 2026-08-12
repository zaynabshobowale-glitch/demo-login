'use client';

import { useActionState } from 'react';
import { checkResult } from './actions';
import { ActionResponse } from '@/types/result';

const initialState: ActionResponse = {
  success: false,
  error: '',
};

export default function ResultCheckerPage() {
  const [state, formAction, isPending] = useActionState(checkResult, initialState);

  const resultData = state.success ? state.data : null;

  return (
    <main className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-3xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
            Student Result Portal
          </h1>
          <p className="text-sm text-slate-600">
            Enter your Student ID and Scratch Card PIN below to view your terminal report card.
          </p>
        </div>

        {/* Input Form Card */}
        <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-slate-200">
          <form action={formAction} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              <div>
                <label htmlFor="studentId" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                  Student ID
                </label>
                <input
                  id="studentId"
                  name="studentId"
                  type="text"
                  required
                  placeholder="e.g. STU-1001"
                  disabled={isPending}
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent text-sm disabled:bg-slate-100"
                />
              </div>

              <div>
                <label htmlFor="pin" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                  Scratch Card PIN
                </label>
                <input
                  id="pin"
                  name="pin"
                  type="password"
                  required
                  placeholder="e.g. 123456"
                  disabled={isPending}
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent text-sm disabled:bg-slate-100"
                />
              </div>

            </div>

            {/* Error Message Alert */}
            {!state.success && state.error && (
              <div className="p-3.5 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
                {state.error}
              </div>
            )}

            <button
              type="submit"
              disabled={isPending}
              className="w-full py-2.5 px-4 rounded-lg bg-indigo-600 text-white font-medium text-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isPending ? 'Checking Record...' : 'Check Result'}
            </button>
          </form>
        </div>

        {/* Report Card View */}
        {resultData && (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            
            {/* Student Meta Header */}
            <div className="bg-indigo-900 text-white p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-widest text-indigo-300">
                    Official Academic Report
                  </span>
                  <h2 className="text-2xl font-bold mt-0.5">{resultData.student_name}</h2>
                </div>
                <div className="text-left sm:text-right space-y-0.5 text-xs text-indigo-200">
                  <p><strong className="text-white">ID:</strong> {resultData.student_id}</p>
                  <p><strong className="text-white">Class:</strong> {resultData.class_name}</p>
                  <p><strong className="text-white">Term:</strong> {resultData.term}</p>
                </div>
              </div>
            </div>

            {/* Academic Grades Table */}
            <div className="p-6 sm:p-8">
              <h3 className="text-base font-semibold text-slate-900 mb-4">Subject Summary</h3>
              
              <div className="overflow-x-auto border border-slate-200 rounded-lg">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase text-xs tracking-wider">
                    <tr>
                      <th scope="col" className="px-4 py-3">Subject</th>
                      <th scope="col" className="px-4 py-3 text-center">Score (%)</th>
                      <th scope="col" className="px-4 py-3 text-center">Grade</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 text-slate-700">
                    {resultData.subjects.map((item, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/50">
                        <td className="px-4 py-3 font-medium text-slate-900">{item.subject}</td>
                        <td className="px-4 py-3 text-center">{item.score}</td>
                        <td className="px-4 py-3 text-center font-bold text-indigo-600">{item.grade}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => window.print()}
                  className="px-4 py-2 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors"
                >
                  Print Report Card
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </main>
  );
}