'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const OrderSchema = z.object({
  plan: z.enum(['starter', 'professional', 'business']),
  template: z.enum(['business', 'freelancer', 'portfolio']),
  businessName: z.string().min(2, 'Bedrijfsnaam is verplicht'),
  fullName: z.string().min(2, 'Volledige naam is verplicht'),
  email: z.string().email('Voer een geldig e-mailadres in'),
  phone: z.string().min(10, 'Voer een geldig telefoonnummer in'),
  domain: z.string().min(3, 'Voer een domeinnaam in'),
  description: z.string().optional(),
});

type OrderFormData = z.infer<typeof OrderSchema>;

interface OrderFormProps {
  defaultPlan?: string;
  defaultTemplate?: string;
}

export function OrderForm({ defaultPlan = 'starter', defaultTemplate = 'business' }: OrderFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OrderFormData>({
    resolver: zodResolver(OrderSchema),
    defaultValues: {
      plan: (defaultPlan as OrderFormData['plan']) ?? 'starter',
      template: (defaultTemplate as OrderFormData['template']) ?? 'business',
    },
  });

  async function onSubmit(data: OrderFormData) {
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message ?? 'Er is een fout opgetreden');
      }

      if (result.paymentUrl) {
        window.location.href = result.paymentUrl;
      } else {
        router.push('/order/success');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Er is een onbekende fout opgetreden');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="plan">Pakket</Label>
          <select
            id="plan"
            {...register('plan')}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <option value="starter">Starter — €299</option>
            <option value="professional">Professional — €499</option>
            <option value="business">Business — €799</option>
          </select>
          {errors.plan && <p className="text-xs text-red-500">{errors.plan.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="template">Template</Label>
          <select
            id="template"
            {...register('template')}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <option value="business">Business</option>
            <option value="freelancer">Freelancer</option>
            <option value="portfolio">Portfolio</option>
          </select>
          {errors.template && <p className="text-xs text-red-500">{errors.template.message}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="businessName">Bedrijfsnaam</Label>
        <Input id="businessName" placeholder="Jansen Consulting" {...register('businessName')} />
        {errors.businessName && (
          <p className="text-xs text-red-500">{errors.businessName.message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="fullName">Volledige naam</Label>
          <Input id="fullName" placeholder="Jan Jansen" {...register('fullName')} />
          {errors.fullName && <p className="text-xs text-red-500">{errors.fullName.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">E-mailadres</Label>
          <Input id="email" type="email" placeholder="jan@jansen.nl" {...register('email')} />
          {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="phone">Telefoonnummer</Label>
          <Input id="phone" type="tel" placeholder="+31 6 12 34 56 78" {...register('phone')} />
          {errors.phone && <p className="text-xs text-red-500">{errors.phone.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="domain">Domeinnaam</Label>
          <Input id="domain" placeholder="janjansen.nl" {...register('domain')} />
          {errors.domain && <p className="text-xs text-red-500">{errors.domain.message}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">
          Omschrijving van je bedrijf{' '}
          <span className="text-gray-400 font-normal">(optioneel)</span>
        </Label>
        <Textarea
          id="description"
          placeholder="Beschrijf kort wat je doet, voor wie en wat jou onderscheidt..."
          rows={4}
          {...register('description')}
        />
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
          {error}
        </div>
      )}

      <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
        {isSubmitting ? 'Bestelling verwerken...' : 'Bestellen & betalen'}
      </Button>

      <p className="text-center text-xs text-gray-500">
        Veilig betalen via iDEAL, Bancontact of creditcard. Powered by Mollie.
      </p>
    </form>
  );
}
