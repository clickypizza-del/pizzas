"use client";

import { useEffect, useState } from "react";
import {
  RefreshCw,
  Link2,
  Unlink,
  CheckCircle,
  AlertTriangle,
  Clock,
  Activity,
  Loader2,
} from "lucide-react";

type SyncStatus = {
  connected: boolean;
  lastSync: string | null;
  totalSynced: number;
  pendingCount: number;
  errorCount: number;
};

type SyncLog = {
  id: string;
  productId: string;
  productName: string;
  action: string;
  status: string;
  errorMessage?: string;
  httpCode?: number;
  durationMs: number;
  createdAt: string;
};

type SyncData = {
  status: SyncStatus;
  logs: SyncLog[];
};

function StatusCard({
  label,
  value,
  icon: Icon,
  color,
}: {
  label: string;
  value: number | string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}) {
  return (
    <div className="bg-[#111111] border border-white/10 rounded-xl p-4 sm:p-5">
      <div className="flex items-center gap-2 mb-2">
        <Icon className={`size-4 ${color}`} />
        <span className="text-xs text-white/40 uppercase tracking-wider">{label}</span>
      </div>
      <div className="text-xl sm:text-2xl font-bold text-white">{value}</div>
    </div>
  );
}

function formatAction(action: string) {
  const map: Record<string, string> = {
    create: "Creó",
    update: "Actualizó",
    delete: "Eliminó",
    sync_all: "Sincronización completa",
    error: "Error",
  };
  return map[action] || action;
}

export default function SyncPage() {
  const [data, setData] = useState<SyncData | null>(null);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [message, setMessage] = useState("");

  const fetchData = () => {
    fetch("/admin/api/sync")
      .then((r) => r.json())
      .then(setData)
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSyncAll = async () => {
    setSyncing(true);
    setMessage("");
    const res = await fetch("/admin/api/sync", { method: "POST" });
    const result = await res.json();
    if (result.logs) {
      const errors = result.logs.filter((l: SyncLog) => l.status === "error");
      const success = result.logs.filter((l: SyncLog) => l.status === "success");
      setMessage(
        errors.length > 0
          ? `${success.length} productos sincronizados, ${errors.length} errores`
          : `${success.length} productos sincronizados correctamente`
      );
    }
    fetchData();
    setSyncing(false);
    setTimeout(() => setMessage(""), 5000);
  };

  const handleVerifyConnection = async () => {
    setConnecting(true);
    const res = await fetch("/admin/api/sync/connection");
    const result = await res.json();
    setMessage(result.connected ? "Conexión exitosa" : `Error: ${result.error}`);
    fetchData();
    setConnecting(false);
    setTimeout(() => setMessage(""), 5000);
  };

  const handleRefreshToken = async () => {
    setConnecting(true);
    const res = await fetch("/admin/api/sync/connection", { method: "POST" });
    const result = await res.json();
    setMessage(result.message || result.error);
    setConnecting(false);
    setTimeout(() => setMessage(""), 8000);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin size-8 border-2 border-brand-red border-t-transparent rounded-full" />
      </div>
    );
  }

  const { status, logs } = data || { status: { connected: false, lastSync: null, totalSynced: 0, pendingCount: 0, errorCount: 0 }, logs: [] };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-brand text-2xl sm:text-3xl text-white mb-1">
          Sincronización Meta
        </h1>
        <p className="text-sm text-white/40">
          Catálogo de WhatsApp Business
        </p>
      </div>

      {message && (
        <div
          className={`px-4 py-3 rounded-lg text-sm ${
            message.includes("Error") || message.includes("error")
              ? "bg-red-500/10 border border-red-500/20 text-red-400"
              : "bg-green-500/10 border border-green-500/20 text-green-400"
          }`}
        >
          {message}
        </div>
      )}

      {/* Estado de conexión */}
      <div
        className={`rounded-xl border p-5 ${
          status.connected
            ? "bg-green-500/5 border-green-500/20"
            : "bg-red-500/5 border-red-500/20"
        }`}
      >
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            {status.connected ? (
              <Link2 className="size-5 text-green-400" />
            ) : (
              <Unlink className="size-5 text-red-400" />
            )}
            <div>
              <div className="font-medium text-white">
                {status.connected ? "Conectado a Meta" : "Desconectado"}
              </div>
              <div className="text-xs text-white/40">
                {status.connected
                  ? "La sincronización está activa"
                  : "Configurá las credenciales en Vercel"}
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleVerifyConnection}
              disabled={connecting}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white hover:bg-white/10 transition-all disabled:opacity-50"
            >
              {connecting ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <CheckCircle className="size-4" />
              )}
              Verificar
            </button>
            <button
              onClick={handleRefreshToken}
              disabled={connecting}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white hover:bg-white/10 transition-all disabled:opacity-50"
            >
              <RefreshCw className="size-4" />
              Refrescar Token
            </button>
          </div>
        </div>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <StatusCard
          label="Sincronizados"
          value={status.totalSynced}
          icon={CheckCircle}
          color="text-green-400"
        />
        <StatusCard
          label="Errores"
          value={status.errorCount}
          icon={AlertTriangle}
          color="text-red-400"
        />
        <StatusCard
          label="Pendientes"
          value={status.pendingCount}
          icon={Clock}
          color="text-yellow-400"
        />
        <StatusCard
          label="Última sinc."
          value={status.lastSync ? new Date(status.lastSync).toLocaleString("es-AR") : "—"}
          icon={Activity}
          color="text-blue-400"
        />
      </div>

      {/* Botón sincronizar todo */}
      <div className="flex gap-3">
        <button
          onClick={handleSyncAll}
          disabled={syncing || !status.connected}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-red text-white text-sm font-bold uppercase tracking-wider rounded-lg hover:bg-brand-red/90 transition-all disabled:opacity-50"
        >
          {syncing ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <RefreshCw className="size-4" />
          )}
          {syncing ? "Sincronizando..." : "Sincronizar Todo"}
        </button>
      </div>

      {/* Requisitos si no está conectado */}
      {!status.connected && (
        <div className="bg-[#111111] border border-white/10 rounded-xl p-5 space-y-3">
          <h3 className="font-brand text-lg text-white">Configuración requerida</h3>
          <p className="text-sm text-white/50">
            Agregá estas variables de entorno en Vercel → Settings → Environment Variables:
          </p>
          <div className="bg-[#0D0D0D] rounded-lg p-4 text-xs text-white/60 font-mono space-y-1">
            <div>META_ACCESS_TOKEN=tu-access-token</div>
            <div>META_BUSINESS_ID=tu-business-id</div>
            <div>META_CATALOG_ID=tu-catalog-id</div>
            <div>META_APP_ID=tu-app-id</div>
            <div>META_APP_SECRET=tu-app-secret</div>
            <div>META_PIXEL_ID=tu-pixel-id</div>
            <div>META_WEBHOOK_VERIFY_TOKEN=clickypizza_webhook_2024</div>
          </div>
          <p className="text-xs text-white/30">
            Obtené estos datos en business.facebook.com → Commerce Manager → Catálogo
          </p>
        </div>
      )}

      {/* Logs */}
      <div className="bg-[#111111] border border-white/10 rounded-xl p-5">
        <h3 className="font-brand text-lg text-white mb-4">
          Registro de actividad
        </h3>
        {logs.length === 0 ? (
          <p className="text-sm text-white/30">Sin actividad de sincronización</p>
        ) : (
          <div className="space-y-2">
            {logs.map((log) => (
              <div
                key={log.id}
                className="flex items-center gap-3 text-sm py-2 border-b border-white/5 last:border-0"
              >
                <span
                  className={`size-2 rounded-full shrink-0 ${
                    log.status === "success"
                      ? "bg-green-400"
                      : log.status === "error"
                        ? "bg-red-400"
                        : "bg-yellow-400"
                  }`}
                />
                <span className="text-white/70 flex-1 truncate">
                  {formatAction(log.action)} — {log.productName}
                </span>
                {log.errorMessage && (
                  <span className="text-xs text-red-400/60 truncate max-w-[200px]">
                    {log.errorMessage}
                  </span>
                )}
                <span className="text-xs text-white/20 shrink-0">
                  {log.durationMs}ms
                </span>
                <span className="text-xs text-white/15 shrink-0">
                  {new Date(log.createdAt).toLocaleString("es-AR")}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
