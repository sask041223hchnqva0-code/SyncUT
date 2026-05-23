import React from 'react';
import Link from 'next/link';

export default function CitasPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[85vh] p-6 text-center">
      <div className="max-w-md w-full p-8 bg-white border border-slate-100 rounded-3xl shadow-xl dark:bg-slate-900 dark:border-slate-800 transition-all duration-300 hover:shadow-2xl">
        <div className="w-16 h-16 mx-auto flex items-center justify-center bg-indigo-50 dark:bg-indigo-950 rounded-2xl text-3xl">
          📅
        </div>
        <h1 className="mt-6 text-2xl font-bold text-slate-800 dark:text-white">Módulo de Citas</h1>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          Espacio asignado a **Squad 3 (Agendamiento de Citas)**.
        </p>
        
        <div className="mt-6 p-5 text-left bg-slate-50 rounded-2xl dark:bg-slate-950 border border-slate-100 dark:border-slate-850">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">Objetivos Sprint 0:</h2>
          <ul className="mt-3 space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
              Crear tabla <code>appointments</code> en Supabase
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-slate-350"></span>
              Diseñar e implementar <code>CitasCalendar</code>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-slate-350"></span>
              Integrar hooks de conexión <code>useCitas</code>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-slate-350"></span>
              Conectar con notificaciones de recordatorio
            </li>
          </ul>
        </div>

        <div className="mt-8 flex flex-col gap-3">
          <Link 
            href="/" 
            className="w-full py-3 text-xs font-semibold text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 active:scale-98 transition-all duration-200 shadow-lg shadow-indigo-100 dark:shadow-none"
          >
            Volver al Dashboard
          </Link>
          <a 
            href="https://github.com/Cangregito/SyncUT/tree/main/apps/web/app/(citas)/README.md"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 text-xs font-semibold text-slate-650 bg-slate-100 rounded-xl hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-300 transition-all duration-200"
          >
            Ver Documentación (README)
          </a>
        </div>
      </div>
    </div>
  );
}
