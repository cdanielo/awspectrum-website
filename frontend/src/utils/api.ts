import type { ContactPayload } from '../types';

const API_BASE = (import.meta.env.VITE_API_URL as string | undefined) ?? '/api';

export async function submitContact(payload: ContactPayload): Promise<void> {
  const res = await fetch(`${API_BASE}/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('Error al enviar el formulario');
}
