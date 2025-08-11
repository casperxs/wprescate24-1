import React, { useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link as RouterLink } from "react-router-dom";
import { PRICING, PROBLEMS, PROCESS, STATS, TESTIMONIALS, FAQS, HERO_IMAGES, TRUST_LOGOS } from "../mock/mock";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Checkbox } from "../components/ui/checkbox";
import { Label } from "../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../components/ui/accordion";
import { useToast } from "../hooks/use-toast";
import { Shield, Zap, Wrench, Lock, AlertTriangle, Server, Gauge, ShieldAlert, Phone, Mail, Globe, CheckCircle2 } from "lucide-react";

const schema = z.object({
  nombre: z.string().min(2, "Ingresa tu nombre"),
  email: z.string().email("Correo inválido"),
  telefono: z.string().min(7, "Teléfono inválido"),
  url: z.string().url("URL inválida"),
  mensaje: z.string().min(10, "Cuéntanos brevemente tu caso"),
  plan: z.string(),
  urgencia: z.string(),
  canal: z.string(),
  consentimiento: z.boolean().refine(v => v, { message: "Requerimos tu consentimiento" })
});

const NavLink = ({ href, children }) => (
  <a href={href} className="text-sm text-foreground/80 hover:text-white transition-colors">{children}</a>
);

export default function Landing() {
  const { toast } = useToast();
  const formRef = useRef(null);
  const [planPrefill, setPlanPrefill] = useState("");

  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      nombre: "",
      email: "",
      telefono: "",
      url: "",
      mensaje: "",
      plan: planPrefill || "plata",
      urgencia: "24h",
      canal: "Email",
      consentimiento: false
    }
  });

  React.useEffect(() => {
    if (planPrefill) setValue("plan", planPrefill);
  }, [planPrefill, setValue]);

  const onSubmit = (data) => {
    try {
      const lead = { ...data, createdAt: new Date().toISOString(), source: "landing-react-mock" };
      const arr = JSON.parse(localStorage.getItem("leads_recuperacion") || "[]");
      arr.push(lead);
      localStorage.setItem("leads_recuperacion", JSON.stringify(arr));
      console.log("[MOCK] Pixel/Ads events would fire here", { event: "Lead", plan: data.plan, urgencia: data.urgencia });
      toast({ title: "¡Solicitud recibida!", description: "Te contactaremos en breve por tu canal preferido.", });
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    } catch (e) {
      console.error(e);
      toast({ title: "Error al guardar", description: "Intenta de nuevo o contáctanos por WhatsApp.", });
    }
  };

  const heroCtas = (
    <div className="flex flex-col sm:flex-row items-center gap-3 mt-6">
      <Button className="bg-teal-500 hover:bg-teal-400 text-black font-semibold px-6 py-6" onClick={() => document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" })}>
        ¡Solicita ayuda ahora!
      </Button>
      <Button variant="outline" className="border-teal-500/40 text-white hover:bg-white/10" onClick={() => document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" })}>
        Ver planes y precios
      </Button>
    </div>
  );

  const ProblemIcon = ({ name }) => {
    const map = { AlertTriangle, Server, Gauge, ShieldAlert };
    const Icon = map[name] || AlertTriangle;
    return <Icon className="w-5 h-5 text-teal-400" />;
  };

  const heroImage = HERO_IMAGES[0];

  return (
    <div className="dark min-h-screen bg-[radial-gradient(ellipse_at_top_left,rgba(20,184,166,0.15)_0%,rgba(2,6,23,0)_40%),radial-gradient(ellipse_at_bottom_right,rgba(56,189,248,0.12)_0%,rgba(2,6,23,0)_40%)]">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-black/30 border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
          <RouterLink to="/" className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-teal-400" />
            <span className="font-semibold text-white">Rescate WP</span>
          </RouterLink>
          <nav className="hidden md:flex items-center gap-6">
            <NavLink href="#problemas">Problemas</NavLink>
            <NavLink href="#proceso">Proceso</NavLink>
            <NavLink href="#pricing">Precios</NavLink>
            <NavLink href="#testimonios">Testimonios</NavLink>
            <NavLink href="#faqs">FAQ</NavLink>
          </nav>
          <Button className="bg-teal-500 hover:bg-teal-400 text-black font-semibold" onClick={() => document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" })}>Contacto</Button>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 opacity-40" aria-hidden>
          <div className="absolute w-72 h-72 bg-teal-500/20 rounded-full blur-3xl -top-10 -left-10" />
          <div className="absolute w-80 h-80 bg-cyan-400/20 rounded-full blur-3xl bottom-0 right-0" />
        </div>
        <div className="max-w-6xl mx-auto px-6 py-16 md:py-24 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl">
              <Zap className="w-4 h-4 text-teal-300" />
              <span className="text-xs text-foreground/80">Recuperación en 24h garantizada</span>
            </div>
            <h1 className="mt-4 text-3xl md:text-5xl font-semibold tracking-tight text-white">
              ¿Tu sitio WordPress fue hackeado o está caído?
            </h1>
            <p className="mt-3 text-foreground/80 max-w-xl">
              Micro-agencia experta en rescate y blindaje de sitios. Volvemos a poner tu web en línea y la protegemos para que no vuelva a pasar.
            </p>
            {heroCtas}
            <div className="mt-6 flex items-center gap-4 text-sm text-foreground/70">
              <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-teal-400" /> 200+ sitios recuperados</div>
              <div className="flex items-center gap-2"><Lock className="w-4 h-4 text-teal-400" /> Endurecimiento de seguridad</div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-3 bg-teal-500/20 rounded-3xl blur-2xl -z-10" aria-hidden />
            <img src={heroImage} alt="Ilustración de ciberseguridad" loading="eager" className="w-full h-[360px] md:h-[440px] object-cover rounded-2xl border border-white/10 shadow-2xl" />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-8">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          {STATS.map((s) => (
            <div key={s.label} className="rounded-xl bg-white/5 border border-white/10 backdrop-blur-xl p-4 text-center">
              <div className="text-2xl font-semibold text-white">{s.label}</div>
              <div className="text-foreground/70 text-sm">{s.value}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Problemas */}
      <section id="problemas" className="py-12">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-semibold text-white">¿Tu sitio presenta estos problemas?</h2>
          <div className="grid md:grid-cols-4 gap-4 mt-6">
            {PROBLEMS.map((p) => (
              <Card key={p.title} className="bg-white/5 border-white/10 backdrop-blur-xl card-hover">
                <CardContent className="p-4 flex items-start gap-3">
                  <ProblemIcon name={p.icon} />
                  <div>
                    <div className="font-medium text-white">{p.title}</div>
                    <div className="text-foreground/70 text-sm">{p.desc}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Proceso */}
      <section id="proceso" className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-semibold text-white">Cómo trabajamos</h2>
          <p className="text-foreground/80 mt-2 max-w-2xl">Paso a paso: diagnóstico, recuperación, blindaje y prevención para que duermas tranquilo.</p>
          <div className="grid md:grid-cols-4 gap-4 mt-8">
            {PROCESS.map((step) => (
              <Card key={step.step} className="bg-white/5 border-white/10 backdrop-blur-xl hover:translate-y-[-2px] transition-transform">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-teal-500/20 text-teal-300 text-xs border border-teal-400/30">{step.step}</span>
                    {step.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-foreground/80 text-sm">{step.desc}</CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-semibold text-white">Planes y precios</h2>
          <p className="text-foreground/80 mt-2">Elige el nivel adecuado para tu urgencia y contexto.</p>
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            {PRICING.map((p) => (
              <Card key={p.id} className={`relative bg-white/5 border ${p.highlight ? "border-teal-400/50" : "border-white/10"} backdrop-blur-xl overflow-hidden`}>
                {p.highlight && (
                  <div className="absolute right-3 top-3 text-xs px-2 py-1 rounded-full bg-teal-500 text-black font-semibold">Más elegido</div>
                )}
                <CardHeader>
                  <CardTitle className="text-white flex items-baseline justify-between">
                    <span>{p.name}</span>
                    <span className="text-teal-300 text-xl">${p.price}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-foreground/80">
                  <p className="text-sm">{p.description}</p>
                  <ul className="mt-4 space-y-2">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm"><CheckCircle2 className="w-4 h-4 text-teal-400 mt-0.5" /> {f}</li>
                    ))}
                  </ul>
                  <Button className="mt-6 w-full bg-teal-500 hover:bg-teal-400 text-black font-semibold" onClick={() => { setPlanPrefill(p.id); document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" }); }}>Elegir {p.name}</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="py-10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center text-foreground/70 text-xs uppercase tracking-widest">Herramientas que usamos</div>
          <div className="mt-4 grid grid-cols-2 md:grid-cols-5 gap-3 items-center">
            {TRUST_LOGOS.map(l => (
              <div key={l.name} className="h-12 rounded-lg bg-white/5 border border-white/10 backdrop-blur-xl flex items-center justify-center text-white/90 text-sm">{l.name}</div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonios" className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-semibold text-white">Lo que dicen nuestros clientes</h2>
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            {TESTIMONIALS.map((t) => (
              <Card key={t.name} className="bg-white/5 border-white/10 backdrop-blur-xl">
                <CardContent className="pt-6">
                  <p className="text-foreground/90">“{t.quote}”</p>
                  <div className="mt-4 flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-teal-500/20 border border-teal-400/30 text-teal-200 flex items-center justify-center text-sm font-semibold">
                      {t.initials}
                    </div>
                    <div>
                      <div className="text-white text-sm font-medium">{t.name}</div>
                      <div className="text-foreground/70 text-xs">{t.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ + Contacto */}
      <section id="faqs" className="py-16">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-8 items-start">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold text-white">Preguntas frecuentes</h2>
            <p className="text-foreground/80 mt-2 max-w-xl">Transparencia total: esto es lo que más nos consultan antes de iniciar.</p>
            <div className="mt-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xl p-6">
              <Accordion type="single" collapsible className="w-full">
                {FAQS.map((f, i) => (
                  <AccordionItem key={i} value={`item-${i}`}>
                    <AccordionTrigger className="text-left text-white">{f.q}</AccordionTrigger>
                    <AccordionContent className="text-foreground/80">{f.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
          {/* Contact form */}
          <div id="contacto" ref={formRef} className="rounded-xl bg-white/5 border border-white/10 backdrop-blur-2xl p-6">
            <h3 className="text-xl font-semibold text-white">Contáctanos</h3>
            <p className="text-foreground/70 text-sm">Respuesta en minutos. Cuéntanos tu caso y tu urgencia.</p>
            <form className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleSubmit(onSubmit)}>
              <div className="col-span-1">
                <Label htmlFor="nombre">Nombre</Label>
                <Input id="nombre" placeholder="Tu nombre" {...register("nombre")} className="bg-black/40 border-white/15 text-white placeholder:text-foreground/50" />
                {errors.nombre && <p className="text-red-400 text-xs mt-1">{errors.nombre.message}</p>}
              </div>
              <div className="col-span-1">
                <Label htmlFor="email">Email</Label>
                <Input id="email" placeholder="tucorreo@ejemplo.com" {...register("email")} className="bg-black/40 border-white/15 text-white placeholder:text-foreground/50" />
                {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
              </div>
              <div className="col-span-1">
                <Label htmlFor="telefono">Teléfono</Label>
                <Input id="telefono" placeholder="+34 600 000 000" {...register("telefono")} className="bg-black/40 border-white/15 text-white placeholder:text-foreground/50" />
                {errors.telefono && <p className="text-red-400 text-xs mt-1">{errors.telefono.message}</p>}
              </div>
              <div className="col-span-1">
                <Label htmlFor="url">URL del sitio</Label>
                <Input id="url" placeholder="https://tusitio.com" {...register("url")} className="bg-black/40 border-white/15 text-white placeholder:text-foreground/50" />
                {errors.url && <p className="text-red-400 text-xs mt-1">{errors.url.message}</p>}
              </div>
              <div className="col-span-1">
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
              <div className="col-span-1">
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
              <div className="col-span-1">
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
              <div className="md:col-span-2 col-span-1">
                <Label htmlFor="mensaje">Mensaje</Label>
                <Textarea id="mensaje" rows={4} placeholder="Cuéntanos qué pasó, qué hosting usas y desde cuándo..." {...register("mensaje")} className="bg-black/40 border-white/15 text-white placeholder:text-foreground/50" />
                {errors.mensaje && <p className="text-red-400 text-xs mt-1">{errors.mensaje.message}</p>}
              </div>
              <div className="md:col-span-2 col-span-1 flex items-center gap-2">
                <Checkbox id="consentimiento" {...register("consentimiento")} />
                <Label htmlFor="consentimiento" className="text-sm text-foreground/80">Acepto ser contactado y la política de privacidad.</Label>
              </div>
              <div className="md:col-span-2 col-span-1">
                <Button type="submit" className="w-full bg-teal-500 hover:bg-teal-400 text-black font-semibold">Enviar solicitud</Button>
              </div>
            </form>
            <div className="mt-3 text-xs text-foreground/60 flex items-center gap-3">
              <div className="flex items-center gap-1"><Phone className="w-3.5 h-3.5" /> Soporte 24/7</div>
              <div className="flex items-center gap-1"><Mail className="w-3.5 h-3.5" /> Respuesta rápida</div>
              <div className="flex items-center gap-1"><Globe className="w-3.5 h-3.5" /> Cobertura internacional</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer / CTA final */}
      <footer className="border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-10 grid md:grid-cols-2 gap-6 items-center">
          <div>
            <h3 className="text-white text-xl font-semibold">¿Listo para recuperar tu sitio web?</h3>
            <p className="text-foreground/80">Actuamos ya. El tiempo es clave para minimizar daños y pérdidas.</p>
          </div>
          <div className="flex md:justify-end">
            <Button className="bg-teal-500 hover:bg-teal-400 text-black font-semibold" onClick={() => document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" })}>¡Contáctanos ahora!</Button>
          </div>
        </div>
        <div className="max-w-6xl mx-auto px-6 py-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between text-xs text-foreground/60">
          <div>© {new Date().getFullYear()} Rescate WP. Todos los derechos reservados.</div>
          <div className="flex items-center gap-4 mt-3 md:mt-0">
            <RouterLink to="#" className="hover:text-foreground/90">Términos</RouterLink>
            <RouterLink to="#" className="hover:text-foreground/90">Privacidad</RouterLink>
          </div>
        </div>
      </footer>
    </div>
  );
}