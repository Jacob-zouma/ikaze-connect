import { ArrowRight, ShieldCheck, X, CheckCircle2 } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import type { ReactNode } from "react";
import * as Dialog from "@radix-ui/react-dialog";
export const pageHead = (title: string, description: string) => ({
  meta: [
    { title: `${title} | IKAZE CONNECT` },
    { name: "description", content: description },
    { property: "og:title", content: `${title} | IKAZE CONNECT` },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ],
});
export function SectionTitle({
  eyebrow,
  title,
  children,
}: {
  eyebrow?: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <div className="section-heading">
      <div>
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h2>{title}</h2>
      </div>
      {children}
    </div>
  );
}
export function EmptyState({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <div className="empty-state">
      <ShieldCheck size={38} />
      <h3>{title}</h3>
      <p>
        {children ?? "Les données réelles seront disponibles après connexion de l’API Laravel."}
      </p>
    </div>
  );
}
export function DemoNotice() {
  return (
    <div className="notice">
      <ShieldCheck size={18} />
      <span>
        <strong>Mode démonstration.</strong> Données fictives, actions non transmises. Aucun
        paiement ni compte réel.
      </span>
    </div>
  );
}
export function ActionDialog({
  title,
  children,
  onClose,
}: {
  title: string;
  children: ReactNode;
  onClose: () => void;
}) {
  return (
    <Dialog.Root
      open
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="dialog-overlay" />
        <Dialog.Content className="action-dialog-accessible" aria-describedby={undefined}>
          <div className="dialog-heading">
            <Dialog.Title asChild>
              <h2>{title}</h2>
            </Dialog.Title>
            <Button variant="ghost" size="icon" aria-label="Fermer" onClick={onClose}>
              <X />
            </Button>
          </div>
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
export function Success({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <div className="success-state" role="status">
      <CheckCircle2 size={42} />
      <h2>{title}</h2>
      <p>
        {children ??
          "Brouillon enregistré dans cette démonstration uniquement. Rien n’a été envoyé et les données disparaissent au rechargement."}
      </p>
      <Button asChild>
        <Link to="/espace/$role" params={{ role: "client" }}>
          Voir mon espace démo <ArrowRight />
        </Link>
      </Button>
    </div>
  );
}
