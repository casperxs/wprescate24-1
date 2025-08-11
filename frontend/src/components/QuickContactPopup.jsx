import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../components/ui/dialog";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Checkbox } from "../components/ui/checkbox";
import { PRICING } from "../mock/mock";
import { useToast } from "../hooks/use-toast";

const popupSchema = z.object({
  nombre: z.string().min(2, "Ingresa tu nombre"),
  email: z.string().email("Correo inválido"),
  url: z.string().url("URL inválida"),
  plan: z.string().min(1, "Selecciona un plan"),
  urgencia: z.string().min(1, "Selecciona urgencia"),
  canal: z.string().min(1, "Selecciona canal"),
  mensaje: z.string().min(5, "Cuéntanos brevemente"),
  consentimiento: z.boolean().refine(v => v, { message: "Requerimos tu consentimiento" })
});

export default function QuickContactPopup({ open, onOpenChange, prefillPlan = "", onSubmitted }) {
  const { toast } = useToast();
  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(popupSchema),
    defaultValues: {
      nombre: "",
      email: "",
      url: "",
      plan: prefillPlan || "plata",
      urgencia: "24h",
      canal: "Email",
      mensaje: "",
      consentimiento: false,
    },
  });

  React.useEffect(() => {
    if (prefillPlan) setValue("plan", prefillPlan);
  }, [prefillPlan, setValue]);

  const onSubmit = (data) => {
    const lead = { ...data, createdAt: new Date().toISOString(), source: "quick-popup-mock" };
    const arr = JSON.parse(localStorage.getItem("leads_recuperacion") || "[]");
    arr.push(lead);
    localStorage.setItem("leads_recuperacion", JSON.stringify(arr));
    toast({ title: "¡Solicitud enviada!", description: "Te contactaremos en breve.", });
    onOpenChange(false);
    onSubmitted?.(data);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg bg-white/5 border-white/10 backdrop-blur-2xl">
        <DialogHeader>
          <DialogTitle className="text-white">Solicita ayuda ahora</DialogTitle>
          <DialogDescription className="text-foreground/70">Completa los datos y nos pondremos en contacto en minutos.</DialogDescription>
        </DialogHeader>
        <form className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-3" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Label htmlFor="q-nombre">Nombre</Label>
            <Input id="q-nombre" placeholder="Tu nombre" {...register("nombre")} className="bg-black/40 border-white/15 text-white" />
            {errors.nombre && <p className="text-red-400 text-xs mt-1">{errors.nombre.message}</p>}
          </div>
          <div>
            <Label htmlFor="q-email">Email</Label>
            <Input id="q-email" placeholder="tucorreo@ejemplo.com" {...register("email")} className="bg-black/40 border-white/15 text-white" />
            {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
          </div>
          <div>
            <Label htmlFor="q-url">URL del sitio</Label>
            <Input id="q-url" placeholder="https://tusitio.com" {...register("url")} className="bg-black/40 border-white/15 text-white" />
            {errors.url && <p className="text-red-400 text-xs mt-1">{errors.url.message}</p>}
          </div>
          <div>
            <Label>Plan</Label>
            <Select onValueChange={(v) => setValue("plan", v)}>
              <SelectTrigger className="bg-black/40 border-white/15 text-white">
                <SelectValue placeholder="Elige un plan" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-900 border-white/15 text-white">
                {PRICING.map(p => <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>)}
              </SelectContent>
            </Select>
            {errors.plan && <p className="text-red-400 text-xs mt-1">{errors.plan.message}</p>}
          </div>
          <div>
            <Label>Urgencia</Label>
            <Select onValueChange={(v) => setValue("urgencia", v)}>
              <SelectTrigger className="bg-black/40 border-white/15 text-white">
                <SelectValue placeholder="Selecciona urgencia" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-900 border-white/15 text-white">
                <SelectItem value="4h">Inmediata (0-4h)</SelectItem>
                <SelectItem value="24h">Alta (24h)</SelectItem>
                <SelectItem value="48-72h">Media (48-72h)</SelectItem>
              </SelectContent>
            </Select>
            {errors.urgencia && <p className="text-red-400 text-xs mt-1">{errors.urgencia.message}</p>}
          </div>
          <div>
            <Label>Canal preferido</Label>
            <Select onValueChange={(v) => setValue("canal", v)}>
              <SelectTrigger className="bg-black/40 border-white/15 text-white">
                <SelectValue placeholder="¿Cómo te contactamos?" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-900 border-white/15 text-white">
                <SelectItem value="Email">Email</SelectItem>
                <SelectItem value="WhatsApp">WhatsApp</SelectItem>
                <SelectItem value="Llamada">Llamada</SelectItem>
              </SelectContent>
            </Select>
            {errors.canal && <p className="text-red-400 text-xs mt-1">{errors.canal.message}</p>}
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="q-mensaje">Mensaje</Label>
            <Textarea id="q-mensaje" rows={3} placeholder="Cuéntanos brevemente tu caso" {...register("mensaje")} className="bg-black/40 border-white/15 text-white" />
            {errors.mensaje && <p className="text-red-400 text-xs mt-1">{errors.mensaje.message}</p>}
          </div>
          <div className="md:col-span-2 flex items-center gap-2">
            <Checkbox id="q-consent" {...register("consentimiento")} />
            <Label htmlFor="q-consent" className="text-sm text-foreground/80">Acepto ser contactado y la política de privacidad.</Label>
          </div>
          <div className="md:col-span-2">
            <Button type="submit" className="w-full bg-teal-500 hover:bg-teal-400 text-black font-semibold">Enviar solicitud</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}