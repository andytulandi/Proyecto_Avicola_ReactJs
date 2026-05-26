import { Bell, Check, Trash2 } from 'lucide-react';
import { useState } from 'react';

export default function NotificacionesView() {
  const [notificaciones, setNotificaciones] = useState([
    {
      id: 1,
      titulo: 'Producción Baja',
      mensaje: 'La producción del galpón 1 está 15% por debajo del promedio.',
      tipo: 'alerta',
      fecha: '2026-05-18T14:30:00',
      leida: false
    },
    {
      id: 2,
      titulo: 'Mortalidad Registrada',
      mensaje: 'Se registró una mortalidad inusual en el galpón 2: 12 aves.',
      tipo: 'error',
      fecha: '2026-05-18T13:15:00',
      leida: false
    },
    {
      id: 3,
      titulo: 'Nuevo Usuario Registrado',
      mensaje: 'María González se ha registrado como Aprendiz.',
      tipo: 'info',
      fecha: '2026-05-18T10:45:00',
      leida: true
    },
    {
      id: 4,
      titulo: 'Reporte Generado',
      mensaje: 'El reporte mensual está disponible para descargar.',
      tipo: 'exito',
      fecha: '2026-05-17T16:20:00',
      leida: true
    }
  ]);

  const marcarComoLeida = (id) => {
    setNotificaciones(notificaciones.map(n => 
      n.id === id ? { ...n, leida: true } : n
    ));
  };

  const eliminar = (id) => {
    setNotificaciones(notificaciones.filter(n => n.id !== id));
  };

  const getBgColor = (tipo) => {
    const colores = {
      'alerta': 'bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900',
      'error': 'bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-900',
      'info': 'bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900',
      'exito': 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900'
    };
    return colores[tipo] || colores['info'];
  };

  const getIconColor = (tipo) => {
    const colores = {
      'alerta': 'text-amber-500',
      'error': 'text-red-500',
      'info': 'text-blue-500',
      'exito': 'text-emerald-500'
    };
    return colores[tipo] || colores['info'];
  };

  const formatearFecha = (fecha) => {
    const d = new Date(fecha);
    const ahora = new Date();
    const diff = ahora - d;
    const minutos = Math.floor(diff / 60000);
    const horas = Math.floor(diff / 3600000);
    const dias = Math.floor(diff / 86400000);

    if (minutos < 60) return `hace ${minutos}m`;
    if (horas < 24) return `hace ${horas}h`;
    return `hace ${dias}d`;
  };

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <section className="mb-8">
        <h1 className="text-4xl font-black mb-2 text-slate-900 dark:text-white">Notificaciones</h1>
        <p className="text-slate-500 dark:text-slate-400">Mantente actualizado con los eventos de tu granja.</p>
      </section>

      <section className="space-y-3">
        {notificaciones.length === 0 ? (
          <article className="text-center py-12">
            <Bell className="w-16 h-16 mx-auto text-slate-300 dark:text-slate-600 mb-4" />
            <p className="text-slate-500 dark:text-slate-400">No hay notificaciones</p>
          </article>
        ) : (
          notificaciones.map(notif => (
            <article key={notif.id} className={`p-4 rounded-xl border ${getBgColor(notif.tipo)} transition-all ${!notif.leida ? 'ring-1 ring-primary' : ''}`}>
              <div className="flex items-start gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${getIconColor(notif.tipo)}`}>
                  <Bell className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-slate-900 dark:text-white">{notif.titulo}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">{notif.mensaje}</p>
                  <p className="text-xs text-slate-400 mt-2">{formatearFecha(notif.fecha)}</p>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  {!notif.leida && (
                    <button
                      onClick={() => marcarComoLeida(notif.id)}
                      className="p-2 hover:bg-white dark:hover:bg-slate-800 rounded-lg transition-all"
                      title="Marcar como leída"
                    >
                      <Check className="w-5 h-5 text-slate-400 hover:text-primary" />
                    </button>
                  )}
                  <button
                    onClick={() => eliminar(notif.id)}
                    className="p-2 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-all"
                    title="Eliminar"
                  >
                    <Trash2 className="w-5 h-5 text-slate-400 hover:text-red-500" />
                  </button>
                </div>
              </div>
            </article>
          ))
        )}
      </section>
    </main>
  );
}
