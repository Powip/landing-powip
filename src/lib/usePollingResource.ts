"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface UsePollingResourceOptions<T> {
  // null salta el fetch (ej. mientras el param de ruta todavía no llega).
  url: string | null;
  intervalMs: number;
  notFoundMessage: string;
  genericErrorMessage: string;
  // Si devuelve true con el último dato recibido, deja de pollear (ej. guía
  // cerrada, pedido entregado/anulado) — no tiene sentido seguir pegándole
  // al backend por algo que ya no va a cambiar.
  shouldStopPolling?: (data: T) => boolean;
}

interface UsePollingResourceResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

// Hook compartido por /rastreo/:orderNumber y /rep/:token: ambos hacían el
// mismo fetch-con-spinner-inicial + polling de fondo + refetch tras una
// acción. Centralizarlo evita que un mismo bug (o arreglo) tenga que
// aplicarse dos veces.
//
// Guarda contra una condición de carrera real: si el usuario dispara una
// acción (pagar, confirmar agencia, validar código) justo cuando un poll de
// fondo ya está en vuelo, la respuesta del poll puede llegar después del
// refetch de la acción y pisar el estado más fresco. Cada fetch lleva un
// id incremental y solo aplica `setData` si sigue siendo la petición más
// reciente en curso.
export function usePollingResource<T>({
  url,
  intervalMs,
  notFoundMessage,
  genericErrorMessage,
  shouldStopPolling,
}: UsePollingResourceOptions<T>): UsePollingResourceResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const isMountedRef = useRef(true);
  const requestIdRef = useRef(0);
  const dataRef = useRef<T | null>(null);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    dataRef.current = data;
  }, [data]);

  const fetchResource = useCallback(
    async (isInitial: boolean) => {
      if (!url) return;
      const requestId = ++requestIdRef.current;
      try {
        const res = await fetch(url);

        if (!isMountedRef.current || requestId !== requestIdRef.current) return;

        if (!res.ok) {
          if (isInitial) {
            setError(res.status === 404 ? notFoundMessage : genericErrorMessage);
          }
          return;
        }

        const json = (await res.json()) as T;
        if (!isMountedRef.current || requestId !== requestIdRef.current) return;
        setData(json);
        if (isInitial) setError(null);
      } catch {
        if (isMountedRef.current && requestId === requestIdRef.current && isInitial) {
          setError(genericErrorMessage);
        }
      } finally {
        if (isMountedRef.current && requestId === requestIdRef.current && isInitial) {
          setLoading(false);
        }
      }
    },
    [url, notFoundMessage, genericErrorMessage],
  );

  useEffect(() => {
    if (!url) return;
    fetchResource(true);
    const interval = setInterval(() => {
      if (dataRef.current && shouldStopPolling?.(dataRef.current)) {
        clearInterval(interval);
        return;
      }
      fetchResource(false);
    }, intervalMs);
    return () => clearInterval(interval);
    // shouldStopPolling se lee vía ref a propósito: no debe reiniciar el
    // interval cada vez que cambia (normalmente es una función inline).
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, intervalMs, fetchResource]);

  const refetch = useCallback(() => {
    fetchResource(false);
  }, [fetchResource]);

  return { data, loading, error, refetch };
}
