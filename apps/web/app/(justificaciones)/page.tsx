import React from 'react';
import Link from 'next/link';

export default function JustificacionesPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[85vh] p-6 text-center">
      <div className="max-w-md w-full p-8 bg-white border border-slate-100 rounded-3xl shadow-xl dark:bg-slate-900 dark:border-slate-800 transition-all duration-300 hover:shadow-2xl">
        <div className="w-16 h-16 mx-auto flex items-center justify-center bg-teal-50 dark:bg-teal-950 rounded-2xl text-3xl">
          📄
        </div>
        <h1 className="mt-6 text-2xl font-bold text-slate-800 dark:text-white">Módulo de Justificaciones</h1>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          Espacio asignado a **Squad 1 (Gestión de Documentos y Faltas)**.
        </p>
        
        <div className="mt-6 p-5 text-left bg-slate-50 rounded-2xl dark:bg-slate-950 border border-slate-100 dark:border-slate-850">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-teal-650 dark:text-teal-400">Objetivos Sprint 0:</h2>
          <ul className="mt-3 space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-teal-500"></span>
              Crear bucket de almacenamiento en Supabase Storage
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-slate-350"></span>
              Diseñar el componente <code>DocumentUpload</code>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-slate-350"></span>
              Implementar la línea de tiempo <code>StateTimeline</code>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-slate-350"></span>
              Agregar políticas de seguridad de Storage (RLS)
            </li>
          </ul>
        </div>

        <div className="mt-8 flex flex-col gap-3">
          <Link 
            href="/" 
            className="w-full py-3 text-xs font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-xl active:scale-98 transition-all duration-200 shadow-lg shadow-teal-100 dark:shadow-none"
          >
            Volver al Dashboard
          </Link>
          <a 
            href="https://github.com/Cangregito/SyncUT/tree/main/apps/web/app/(justificaciones)/README.md"
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
