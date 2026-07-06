'use client';

import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';

interface CardVerifyHandlerProps {
  onVerify: () => Promise<void>;
  onRetry: () => void;
  isError: boolean;
  errorMessage: string | null;
}

export function CardVerifyHandler({
  onVerify,
  onRetry,
  isError,
  errorMessage,
}: CardVerifyHandlerProps) {
  const [attempt, setAttempt] = useState(0);
  const hasStarted = useRef(false);

  useEffect(() => {
    if (hasStarted.current) return;
    hasStarted.current = true;

    const run = async () => {
      setAttempt(1);
      await onVerify();
    };
    run();
  }, [onVerify]);

  if (isError) {
    return (
      <div className="flex flex-col items-center gap-6 py-8 text-center">
        <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center">
          <span className="text-3xl">!</span>
        </div>
        <div>
          <h3 className="font-bold text-xl text-gray-900 mb-2">Error en la verificación</h3>
          <p className="text-sm text-gray-500">
            {errorMessage ?? 'No pudimos confirmar tu tarjeta. Intentalo de nuevo.'}
          </p>
        </div>
        <Button type="button" onClick={onRetry} className="w-full">
          Reintentar
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-6 py-8 text-center">
      <div className="w-16 h-16 bg-purple-50 rounded-2xl flex items-center justify-center">
        <span className="w-8 h-8 border-4 border-[#4F3A96] border-t-transparent rounded-full animate-spin block" />
      </div>
      <div>
        <h3 className="font-bold text-xl text-gray-900 mb-2">Verificando tu tarjeta...</h3>
        <p className="text-sm text-gray-500">
          Estamos confirmando el registro con Flow. Esto puede tomar unos segundos.
        </p>
      </div>
      {attempt > 0 && (
        <p className="text-xs text-gray-400">
          Intento {attempt} de 10
        </p>
      )}
    </div>
  );
}
