"use client";

import { useState, useEffect } from "react";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PLANS } from "@/lib/site-data";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/site/icons";

const registerSchema = z.object({
  nombre: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  whatsapp: z
    .string()
    .min(8, "El teléfono debe tener al menos 8 dígitos")
    .regex(/^[0-9\s\-+()]+$/, "Formato de teléfono inválido"),
  email: z.string().email("Ingresá un email válido"),
});

type RegisterFormProps = {
  open: boolean;
  onClose: () => void;
  defaultPlan?: string;
};

type FormState = "idle" | "loading" | "success" | "error";

export function RegisterForm({ open, onClose, defaultPlan }: RegisterFormProps) {
  const [nombre, setNombre] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [email, setEmail] = useState("");
  const [plan, setPlan] = useState(defaultPlan ?? "kit-semanal");
  const [status, setStatus] = useState<FormState>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (defaultPlan) setPlan(defaultPlan);
  }, [defaultPlan]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = registerSchema.safeParse({ nombre, whatsapp, email });
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of result.error.issues) {
        const field = issue.path[0] as string;
        fieldErrors[field] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }

    setStatus("loading");

    try {
      const res = await fetch("/api/subscribers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, whatsapp, email, plan }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Error al registrar");
      }

      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  const handleClose = () => {
    setStatus("idle");
    setNombre("");
    setWhatsapp("");
    setEmail("");
    setErrors({});
    onClose();
  };

  const selectedPlan = PLANS.find((p) => p.id === plan);

  return (
    <Dialog open={open} onOpenChange={(v) => !v && handleClose()}>
      <DialogContent className="sm:max-w-md bg-card border-border">
        {status === "success" ? (
          <div className="py-8 text-center space-y-4">
            <div className="size-16 rounded-full bg-brand-green/15 flex items-center justify-center mx-auto">
              <Check className="size-8 text-brand-green" />
            </div>
            <DialogTitle className="text-xl font-extrabold text-foreground">
              ¡Registro exitoso!
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Te registramos en el {selectedPlan?.name}. Nos contactamos por WhatsApp para confirmar.
            </DialogDescription>
            <Button asChild className="w-full cta-section bg-brand-green hover:bg-brand-green-hover text-white">
              <a
                href={buildWhatsAppUrl(`¡Hola! Me acabo de registrar en el ${selectedPlan?.name}. Mi nombre es ${nombre}.`)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <WhatsAppIcon className="size-4" />
                Confirmar por WhatsApp
              </a>
            </Button>
          </div>
        ) : (
          <>
            <DialogTitle className="text-xl font-extrabold text-foreground">
              Anotarte en el {selectedPlan?.name ?? "kit"}
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Completá tus datos y nos contactamos para confirmar tu suscripción.
            </DialogDescription>

            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="reg-name" className="text-sm font-medium text-foreground">Nombre</Label>
                <Input
                  id="reg-name"
                  type="text"
                  placeholder="Tu nombre completo"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  className="bg-secondary border-border"
                />
                {errors.nombre && <p className="text-xs text-destructive">{errors.nombre}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="reg-phone" className="text-sm font-medium text-foreground">WhatsApp</Label>
                <Input
                  id="reg-phone"
                  type="tel"
                  placeholder="Ej: 261 555-1234"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  className="bg-secondary border-border"
                />
                {errors.whatsapp && <p className="text-xs text-destructive">{errors.whatsapp}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="reg-email" className="text-sm font-medium text-foreground">Email</Label>
                <Input
                  id="reg-email"
                  type="email"
                  placeholder="tu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-secondary border-border"
                />
                {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-foreground">Plan</Label>
                <Select value={plan} onValueChange={setPlan}>
                  <SelectTrigger className="bg-secondary border-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {PLANS.map((p) => (
                      <SelectItem key={p.id} value={p.id}>
                        {p.emoji} {p.name} — {p.price}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {status === "error" ? (
                <p className="text-sm text-destructive">
                  Hubo un error. Intentá de nuevo o contactanos por WhatsApp.
                </p>
              ) : null}

              <Button
                type="submit"
                disabled={status === "loading"}
                className="w-full cta-section"
              >
                {status === "loading" ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <>
                    Registrarme
                    <ArrowRight className="size-4" />
                  </>
                )}
              </Button>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
