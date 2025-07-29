"use client";

import { useState, useEffect } from 'react';
import { formatDateTime } from '../lib/utils';

interface ClientFormattedDateTimeProps {
  timestamp: string;
}

export default function ClientFormattedDateTime({ timestamp }: ClientFormattedDateTimeProps) {
  const [clientTimeZone, setClientTimeZone] = useState<string | undefined>(undefined);

  useEffect(() => {
    setClientTimeZone(Intl.DateTimeFormat().resolvedOptions().timeZone);
  }, []);

  if (!clientTimeZone) {
    return <>...</>; // Or a loading skeleton
  }

  return <>{formatDateTime(timestamp, clientTimeZone)}</>;
}
