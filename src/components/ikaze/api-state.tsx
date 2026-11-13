import { Button } from '@/components/ui/button';
import { errorMessage, ApiError } from '@/api/errors';
export function ApiState({ loading, error, retry }: { loading?: boolean; error?: unknown; retry?: () => void }) {
  if (loading) return <div className="notice" role="status">Chargement…</div>;
  if (!error) return null;
  return <div className="notice" role="alert"><div><p>{errorMessage(error)}</p>{error instanceof ApiError && error.body.errors && <ul>{Object.entries(error.body.errors).flatMap(([field, messages]) => messages.map(message => <li key={`${field}:${message}`}>{field} : {message}</li>))}</ul>}{retry && <Button variant="outline" onClick={retry}>Réessayer</Button>}</div></div>;
}
