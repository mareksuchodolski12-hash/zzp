'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const WHATSAPP_NUMBER = '31625320367';

const OrderSchema = z.object({
  plan: z.enum(['starter', 'professional', 'business']),
  paymentMode: z.enum(['full', 'installments']),
  businessName: z.string().min(2, 'Bedrijfsnaam is verplicht'),
  fullName: z.string().min(2, 'Volledige naam is verplicht'),
  email: z.string().email('Voer een geldig e-mailadres in'),
  phone: z.string().min(10, 'Voer een geldig telefoonnummer in'),
  domain: z.string().min(3, 'Voer een domeinnaam in'),
  businessType: z.string().min(2, 'Branche is verplicht'),
  coreOffer: z.string().min(10, 'Beschrijf kort je aanbod'),
  targetAudience: z.string().min(10, 'Beschrijf je doelgroep'),
  websiteGoal: z.string().min(10, 'Kies een duidelijk doel voor de website'),
  requiredPages: z.string().min(5, 'Geef aan welke pagina\'s je nodig hebt'),
  styleDirection: z.string().min(10, 'Geef je gewenste stijl door'),
  integrations: z.string().optional(),
  examples: z.string().optional(),
  deadline: z.string().optional(),
  description: z.string().optional(),
});

type OrderFormData = z.infer<typeof OrderSchema>;

interface OrderFormProps {
  defaultPlan?: string;
  planLocked?: boolean;
}

export function OrderForm({
  defaultPlan = 'professional',
  planLocked = false,
}: OrderFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OrderFormData>({
    resolver: zodResolver(OrderSchema),
    defaultValues: {
      plan: (defaultPlan as OrderFormData['plan']) ?? 'starter',
      paymentMode: 'full',
    },
  });

  async function onSubmit(data: OrderFormData) {
    setIsSubmitting(true);
    setError(null);

    try {
      const lines = [
        'Nieuwe website-aanvraag (handmatig development)',
        '',
        `Pakket: ${data.plan}`,
        `Betaalwijze: ${data.paymentMode === 'full' ? 'Volledige betaling' : 'Termijnen (12x €45)'}`,
        `Bedrijfsnaam: ${data.businessName}`,
        `Contactpersoon: ${data.fullName}`,
        `E-mail: ${data.email}`,
        `Telefoon: ${data.phone}`,
        `Domein: ${data.domain}`,
        `Branche: ${data.businessType}`,
        '',
        `Aanbod: ${data.coreOffer}`,
        `Doelgroep: ${data.targetAudience}`,
        `Hoofddoel website: ${data.websiteGoal}`,
        `Benodigde pagina's: ${data.requiredPages}`,
        `Stijlrichting: ${data.styleDirection}`,
        `Integraties: ${data.integrations || '-'}`,
        `Voorbeelden/referenties: ${data.examples || '-'}`,
        `Gewenste deadline: ${data.deadline || '-'}`,
        `Extra info: ${data.description || '-'}`,
      ];

      const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join('\n'))}`;
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Er is een onbekende fout opgetreden');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="space-y-2 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <Label htmlFor="plan">Pakket</Label>
          <select
            id="plan"
            {...register('plan')}
            aria-readonly={true}
            tabIndex={-1}
            className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
              'pointer-events-none bg-gray-50 text-gray-500'
            }`}
          >
            <option value="professional">Promotiepakket — €400</option>
          </select>
          {errors.plan && <p className="text-xs text-red-500">{errors.plan.message}</p>}
        </div>

        <div className="space-y-2 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-75">
          <Label htmlFor="paymentMode">Betaalwijze</Label>
          <select
            id="paymentMode"
            {...register('paymentMode')}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <option value="full">Volledige betaling</option>
            <option value="installments">Termijnen (12x €45)</option>
          </select>
          {errors.paymentMode && <p className="text-xs text-red-500">{errors.paymentMode.message}</p>}
        </div>
      </div>

      <div className="space-y-2 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-75">
          <Label htmlFor="businessType">Branche / type bedrijf</Label>
          <Input id="businessType" placeholder="bijv. loodgieter, coach, IT-dienstverlening" {...register('businessType')} />
          {errors.businessType && <p className="text-xs text-red-500">{errors.businessType.message}</p>}
        </div>

      <div className="space-y-2 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">
        <Label htmlFor="businessName">Bedrijfsnaam</Label>
        <Input id="businessName" placeholder="Jansen Consulting" {...register('businessName')} />
        {errors.businessName && (
          <p className="text-xs text-red-500">{errors.businessName.message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="space-y-2 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-150">
          <Label htmlFor="fullName">Volledige naam</Label>
          <Input id="fullName" placeholder="Jan Jansen" {...register('fullName')} />
          {errors.fullName && <p className="text-xs text-red-500">{errors.fullName.message}</p>}
        </div>

        <div className="space-y-2 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200">
          <Label htmlFor="email">E-mailadres</Label>
          <Input id="email" type="email" placeholder="jan@jansen.nl" {...register('email')} />
          {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="space-y-2 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-250">
          <Label htmlFor="phone">Telefoonnummer</Label>
          <Input id="phone" type="tel" placeholder="+31 6 12 34 56 78" {...register('phone')} />
          {errors.phone && <p className="text-xs text-red-500">{errors.phone.message}</p>}
        </div>

        <div className="space-y-2 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-300">
          <Label htmlFor="domain">Gewenste domeinnaam</Label>
          <Input id="domain" placeholder="janjansen.nl" {...register('domain')} />
          {errors.domain && <p className="text-xs text-red-500">{errors.domain.message}</p>}
        </div>
      </div>

      <div className="space-y-2 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-300">
        <Label htmlFor="coreOffer">Wat bied je precies aan?</Label>
        <Textarea
          id="coreOffer"
          placeholder="Welke diensten/producten verkoop je en wat is je kernpropositie?"
          rows={3}
          {...register('coreOffer')}
        />
        {errors.coreOffer && <p className="text-xs text-red-500">{errors.coreOffer.message}</p>}
      </div>

      <div className="space-y-2 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-300">
        <Label htmlFor="targetAudience">Wie is je ideale klant?</Label>
        <Textarea
          id="targetAudience"
          placeholder="Beschrijf doelgroep, regio, budget of type klant dat je wilt aantrekken."
          rows={3}
          {...register('targetAudience')}
        />
        {errors.targetAudience && <p className="text-xs text-red-500">{errors.targetAudience.message}</p>}
      </div>

      <div className="space-y-2 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-300">
        <Label htmlFor="websiteGoal">Wat moet de website voor je doen?</Label>
        <Textarea
          id="websiteGoal"
          placeholder="Bijv. meer offerte-aanvragen, afspraken, telefoontjes of sollicitaties."
          rows={3}
          {...register('websiteGoal')}
        />
        {errors.websiteGoal && <p className="text-xs text-red-500">{errors.websiteGoal.message}</p>}
      </div>

      <div className="space-y-2 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-300">
        <Label htmlFor="requiredPages">Welke pagina&apos;s heb je nodig?</Label>
        <Textarea
          id="requiredPages"
          placeholder="Bijv. Home, Over ons, Diensten, Cases, Contact, FAQ, Privacy, Voorwaarden."
          rows={3}
          {...register('requiredPages')}
        />
        {errors.requiredPages && <p className="text-xs text-red-500">{errors.requiredPages.message}</p>}
      </div>

      <div className="space-y-2 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-300">
        <Label htmlFor="styleDirection">Welke stijl wil je?</Label>
        <Textarea
          id="styleDirection"
          placeholder="Bijv. strak/minimalistisch, zakelijk, modern, premium, speels."
          rows={3}
          {...register('styleDirection')}
        />
        {errors.styleDirection && <p className="text-xs text-red-500">{errors.styleDirection.message}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="space-y-2 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-300">
          <Label htmlFor="integrations">Nodige koppelingen</Label>
          <Input id="integrations" placeholder="Bijv. WhatsApp, agenda, CRM, Stripe, Mailchimp" {...register('integrations')} />
        </div>

        <div className="space-y-2 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-300">
          <Label htmlFor="deadline">Gewenste deadline</Label>
          <Input id="deadline" placeholder="Bijv. binnen 7 dagen of vaste lanceringsdatum" {...register('deadline')} />
        </div>
      </div>

      <div className="space-y-2 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-300">
        <Label htmlFor="examples">Voorbeeldsites die je mooi vindt</Label>
        <Textarea
          id="examples"
          placeholder="Plak 1-3 links met korte uitleg wat je wilt overnemen."
          rows={3}
          {...register('examples')}
        />
      </div>

      <div className="space-y-2 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-300">
        <Label htmlFor="description">
          Extra briefing <span className="text-gray-400 font-normal">(optioneel)</span>
        </Label>
        <Textarea
          id="description"
          placeholder="Alles wat belangrijk is voor de bouw van je website (must-haves, no-go's, inhoud, etc.)."
          rows={4}
          {...register('description')}
        />
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {error}
        </div>
      )}

      <Button
        type="submit"
        className="w-full md:w-auto md:min-w-[240px] md:self-center md:px-10 transition-all hover:scale-[1.01] hover:shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-500 delay-300"
        size="lg"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'WhatsApp openen...' : 'Verstuur briefing via WhatsApp'}
      </Button>

      <p className="text-center text-xs text-gray-500 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-300">
        Na verzenden opent direct WhatsApp met je complete briefing naar +31 6 25 32 03 67.
      </p>
    </form>
  );
}
