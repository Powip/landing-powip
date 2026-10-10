"use client";

import { useState } from "react";
import { Camera, Send } from "lucide-react";

interface YapePanelProps {
  orderNumber: string;
  amount: number;
  yapeNumber: string;
  businessName?: string;
  qrImageUrl?: string | null;
  onSubmitted: () => void;
}

// Segmento 4 (Hito 1), opcional y detrás de flag (`yapeDirectoEnabled`).
// Endpoint asumido: POST /tracking/:orderNumber/yape/comprobante
// (multipart/form-data, campo "comprobante"). No confirmado con backend.
// El QR real (con el payload de cobro) lo debe generar backend/Yape — este
// componente no genera ningún QR: si no llega `qrImageUrl`, no se muestra.
export default function YapePanel({
  orderNumber,
  amount,
  yapeNumber,
  businessName,
  qrImageUrl,
  onSubmitted,
}: YapePanelProps) {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleUpload = async () => {
    if (!file) return;
    setUploadError(null);
    setUploading(true);
    try {
      const form = new FormData();
      form.append("comprobante", file);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_VENTAS}/tracking/${orderNumber}/yape/comprobante`,
        { method: "POST", body: form },
      );
      if (!res.ok) {
        setUploadError("No pudimos subir el comprobante. Intenta de nuevo.");
        return;
      }
      onSubmitted();
    } catch {
      setUploadError("Error de conexión al subir el comprobante.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-purple-500/10 border border-purple-500/20 rounded-3xl p-6 space-y-4">
      <div className="flex items-center gap-3">
        <div className="w-11 h-11 rounded-xl bg-purple-600 flex items-center justify-center text-white font-bold">
          Y
        </div>
        <div>
          <p className="text-white font-bold text-lg">{yapeNumber}</p>
          <p className="text-white/50 text-xs">{businessName || "Tienda"}</p>
        </div>
      </div>

      {qrImageUrl && (
        <img
          src={qrImageUrl}
          alt="QR de Yape"
          className="w-32 h-32 mx-auto rounded-xl bg-white p-2"
        />
      )}

      <ol className="space-y-2 text-white/80 text-sm list-decimal list-inside">
        <li>
          Yapea S/ {amount.toFixed(2)} al número {yapeNumber}
        </li>
        <li>Sube la captura del comprobante aquí abajo</li>
        <li>El vendedor confirma y tu código se activa (máx. 30 min)</li>
      </ol>

      <label className="block border border-dashed border-purple-400/40 rounded-xl p-5 text-center text-white/60 text-sm cursor-pointer hover:border-purple-400/70 transition-colors">
        <Camera className="h-6 w-6 mx-auto mb-1 text-purple-300" />
        {file ? file.name : "Subir comprobante de Yape"}
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
        />
      </label>

      {uploadError && <p className="text-red-400 text-sm">{uploadError}</p>}

      <button
        onClick={handleUpload}
        disabled={!file || uploading}
        className="w-full flex items-center justify-center gap-2 bg-green-600/20 border border-green-500/40 text-green-300 font-semibold py-3 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Send className="h-4 w-4" />
        {uploading ? "Enviando..." : "Enviar comprobante"}
      </button>
    </div>
  );
}
