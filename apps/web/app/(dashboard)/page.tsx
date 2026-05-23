'use client';

import React, { useState } from 'react';
import Link from 'next/link';

type UserRole = 'student' | 'teacher' | 'tutor' | 'admin' | 'coordinator';

export default function DashboardPage() {
  const [activeRole, setActiveRole] = useState<UserRole>('student');

  const roleNames: Record<UserRole, string> = {
    student: 'Estudiante Académico',
    teacher: 'Profesor / Docente',
    tutor: 'Tutor de Grupo',
    admin: 'Administrador de Plataforma',
    coordinator: 'Coordinador Académico',
  };

  const moduleAccess: Record<UserRole, string[]> = {
    student: ['📅 Agendar Citas', '🔔 Notificaciones', '📄 Enviar Justificantes'],
    teacher: ['📅 Calendario Docente', '🔔 Avisos de Citas', '📄 Revisar Justificantes'],
    tutor: ['📅 Citas de Estudiantes', '🔔 Alertas de Grupo', '📄 Aprobar/Rechazar Justificantes'],
    admin: ['📅 Control de Citas', '🔔 Configuración General', '📄 Auditoría de Justificantes', '🔐 Logs de Auditoría (Squad 2)'],
    coordinator: ['📅 Estadísticas y Reportes', '🔔 Difusión Institucional', '📄 Reportes de Faltas'],
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-6 sm:p-10 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 dark:border-slate-850 pb-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-650 dark:text-indigo-400">SyncUT - Staff Dashboard</span>
            <h1 className="text-3xl font-extrabold text-slate-800 dark:text-white mt-1">Panel de Control</h1>
          </div>
          
          {/* Selector de Rol Simulado */}
          <div className="flex flex-col sm:items-end gap-1.5 w-full sm:w-auto">
            <label className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wide">
              Vista previa por Rol (Simulación):
            </label>
            <select 
              value={activeRole} 
              onChange={(e) => setActiveRole(e.target.value as UserRole)}
              className="px-4 py-2 text-xs font-semibold bg-white border border-slate-200 rounded-xl dark:bg-slate-900 dark:border-slate-800 text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full sm:w-56 transition-all"
            >
              {Object.entries(roleNames).map(([role, name]) => (
                <option key={role} value={role}>{name}</option>
              ))}
            </select>
          </div>
        </header>

        {/* Info Banner */}
        <section className="mt-8 bg-indigo-650 text-white rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-xl shadow-indigo-100 dark:shadow-none">
          <div className="relative z-10 max-w-lg">
            <span className="bg-white/20 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              Listo para Integrar
            </span>
            <h2 className="text-2xl font-bold mt-4">Bienvenido, {roleNames[activeRole]}</h2>
            <p className="text-indigo-100 text-sm mt-2 leading-relaxed">
              Estás visualizando la vista previa dinámica del **Dashboard Compartido**. Este módulo filtrará automáticamente las vistas una vez que el Squad 2 termine la integración de base de datos.
            </p>
          </div>
          <div className="absolute right-0 bottom-0 opacity-10 text-9xl select-none pointer-events-none transform translate-y-6 translate-x-4">
            🎓
          </div>
        </section>

        {/* Dashboard Grid */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Módulos Disponibles */}
          <div className="md:col-span-2 space-y-6">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">Tus Módulos Activos</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Card Citas */}
              <Link 
                href="/citas" 
                className="group p-6 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 dark:bg-slate-900 dark:border-slate-850"
              >
                <div className="w-12 h-12 flex items-center justify-center bg-indigo-50 dark:bg-indigo-950/50 rounded-xl text-2xl group-hover:scale-105 transition-transform">
                  📅
                </div>
                <h4 className="font-bold text-slate-800 dark:text-white mt-4 group-hover:text-indigo-600 transition-colors">Agendamiento de Citas</h4>
                <p className="text-xs text-slate-400 mt-1">Agendar, cancelar y ver calendarios de asesorías.</p>
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-indigo-600 mt-4 group-hover:translate-x-1 transition-transform">
                  Ir al módulo →
                </span>
              </Link>

              {/* Card Justificaciones */}
              <Link 
                href="/justificaciones" 
                className="group p-6 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 dark:bg-slate-900 dark:border-slate-850"
              >
                <div className="w-12 h-12 flex items-center justify-center bg-teal-50 dark:bg-teal-950/50 rounded-xl text-2xl group-hover:scale-105 transition-transform">
                  📄
                </div>
                <h4 className="font-bold text-slate-800 dark:text-white mt-4 group-hover:text-teal-650 transition-colors">Justificación de Inasistencias</h4>
                <p className="text-xs text-slate-400 mt-1">Cargar documentos médicos o laborales para justificar faltas.</p>
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-teal-650 mt-4 group-hover:translate-x-1 transition-transform">
                  Ir al módulo →
                </span>
              </Link>

              {/* Card Notificaciones */}
              <Link 
                href="/notificaciones" 
                className="group p-6 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 dark:bg-slate-900 dark:border-slate-850"
              >
                <div className="w-12 h-12 flex items-center justify-center bg-rose-50 dark:bg-rose-950/50 rounded-xl text-2xl group-hover:scale-105 transition-transform">
                  🔔
                </div>
                <h4 className="font-bold text-slate-800 dark:text-white mt-4 group-hover:text-rose-600 transition-colors">Centro de Notificaciones</h4>
                <p className="text-xs text-slate-400 mt-1">Historial de alertas, notificaciones de email y avisos urgentes.</p>
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-rose-600 mt-4 group-hover:translate-x-1 transition-transform">
                  Ir al módulo →
                </span>
              </Link>

              {/* Card Auditoría (Solo visible para Admin simulado) */}
              <div className="p-6 bg-white border border-slate-100 rounded-2xl shadow-sm dark:bg-slate-900 dark:border-slate-850 opacity-60">
                <div className="w-12 h-12 flex items-center justify-center bg-slate-100 dark:bg-slate-800 rounded-xl text-2xl">
                  🔐
                </div>
                <h4 className="font-bold text-slate-800 dark:text-white mt-4">Auditoría e Inmutabilidad</h4>
                <p className="text-xs text-slate-400 mt-1">Mapeado de RLS y logs del sistema. *(Reservado Squad 2)*</p>
                <span className="inline-flex items-center text-[10px] font-bold text-slate-400 mt-4">
                  Integración pendiente
                </span>
              </div>
            </div>
          </div>

          {/* Lateral - Sidebar de Permisos */}
          <div className="space-y-6">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">Detalles de Acceso: {roleNames[activeRole]}</h3>
            
            <div className="bg-white border border-slate-100 rounded-3xl p-6 dark:bg-slate-900 dark:border-slate-850 shadow-sm">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wide">Acciones Autorizadas:</h4>
              <ul className="mt-4 space-y-3">
                {moduleAccess[activeRole].map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-xs text-slate-600 dark:text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-850 text-center">
                <a 
                  href="https://github.com/Cangregito/SyncUT/tree/main/apps/web/app/(dashboard)/README.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
                >
                  Ver Plan del Staff (README) →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
