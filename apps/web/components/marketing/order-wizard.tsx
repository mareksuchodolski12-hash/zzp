'use client';

import { useState, useCallback, useMemo } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ProgressBar } from '@/components/ui/progress-bar';
import { StepIndicator } from '@/components/ui/step-indicator';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';

const WHATSAPP_NUMBER = '31625320367';
const TOTAL_STEPS = 5;

// Comprehensive validation schema
const OrderSchema = z.object({
  // Step 1: Offer
  plan: z.enum(['starter', 'business'], {
    errorMap: () => ({ message: 'Selecteer een pakket' }),
  }),
  paymentMode: z.enum(['full', 'installments'], {
    errorMap: () => ({ message: 'Selecteer een betaalwijze' }),
  }),

  // Step 2: Business
  businessType: z.string().min(2, 'Branche is verplicht').max(100),
  businessName: z.string().min(2, 'Bedrijfsnaam is verplicht').max(100),

  // Step 3: Contact
  fullName: z.string().min(2, 'Volledige naam is verplicht').max(100),
  email: z.string().email('Voer een geldig e-mailadres in').max(255),
  phone: z.string().min(10, 'Voer een geldig telefoonnummer in').max(20),

  // Step 4: Project basics
  domain: z.string().min(3, 'Voer een geldige domeinnaam in').max(100),
  websiteGoal: z.string().min(15, 'Beschrijf wat je website moet bereiken').max(1000),
  description: z.string().max(2000).optional().or(z.literal('')),
});

type FormData = z.infer<typeof OrderSchema>;

interface OrderWizardProps {
  defaultPlan?: string;
  planLocked?: boolean;
}

// Step configuration
const STEP_CONFIG = [
  { id: 1, title: 'Pakket & Betaling', description: 'Kies je plan en betaalmethode' },
  { id: 2, title: 'Bedrijfsgegevens', description: 'Vertel ons over je bedrijf' },
  { id: 3, title: 'Contactgegevens', description: 'Hoe bereiken we je?' },
  { id: 4, title: 'Projectdetails', description: 'Wat heb je nodig?' },
  { id: 5, title: 'Samenvatting', description: 'Controleer alles goed' },
];

export function OrderWizard({ defaultPlan = 'starter', planLocked = false }: OrderWizardProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    trigger,
    getValues,
  } = useForm<FormData>({
    resolver: zodResolver(OrderSchema),
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues: {
      plan: (defaultPlan as FormData['plan']) ?? 'starter',
      paymentMode: 'full',
      businessType: '',
      businessName: '',
      fullName: '',
      email: '',
      phone: '',
      domain: '',
      websiteGoal: '',
      description: '',
    },
  });

  const watchedPlan = watch('plan');

  const installmentLabel = useMemo(
    () =>
      watchedPlan === 'business'
        ? 'Termijnen (3x €439, 6x €224, 12x €119)'
        : 'Termijnen (3x €239, 6x €119, 12x €69)',
    [watchedPlan],
  );

  const validateStep = useCallback(
    async (stepNumber: number) => {
      const stepFieldsMap: Record<number, (keyof FormData)[]> = {
        1: ['plan', 'paymentMode'],
        2: ['businessType', 'businessName'],
        3: ['fullName', 'email', 'phone'],
        4: ['domain', 'websiteGoal'],
        5: [],
      };
      const fields = stepFieldsMap[stepNumber] || [];
      return await trigger(fields as any);
    },
    [trigger]
  );

  const handleNextStep = useCallback(async () => {
    const isValid = await validateStep(currentStep);
    if (isValid && currentStep < TOTAL_STEPS) {
      setCurrentStep(currentStep + 1);
      setSubmitError(null);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentStep, validateStep]);

  const handlePreviousStep = useCallback(() => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setSubmitError(null);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentStep]);

  const onSubmit = useCallback(
    async (data: FormData) => {
      setIsSubmitting(true);
      setSubmitError(null);

      try {
        const planLabel = data.plan === 'business' ? 'Business' : 'Starter';
        const planPrice = data.plan === 'business' ? '€1290' : '€690';

        let paymentLabel = 'Volledige betaling';
        if (data.paymentMode === 'installments') {
          paymentLabel =
            data.plan === 'business'
              ? 'Termijnen (3x €439, 6x €224, 12x €119)'
              : 'Termijnen (3x €239, 6x €119, 12x €69)';
        }

        const lines = [
          '✨ Nieuwe website-aanvraag (handmatig development)',
          '',
          '📦 PAKKET & BETALING',
          `Pakket: ${planLabel} (${planPrice})`,
          `Betaalwijze: ${paymentLabel}`,
          '',
          '🏢 BEDRIJFSGEGEVENS',
          `Bedrijfsnaam: ${data.businessName}`,
          `Branche: ${data.businessType}`,
          '',
          '👤 CONTACTGEGEVENS',
          `Contactpersoon: ${data.fullName}`,
          `E-mail: ${data.email}`,
          `Telefoon: ${data.phone}`,
          '',
          '🎯 PROJECTDETAILS',
          `Domein: ${data.domain}`,
          `Wat moet je website bereiken: ${data.websiteGoal}`,
          ...(data.description ? [`\nExtra opmerkingen: ${data.description}`] : []),
          '',
          '---',
          'Ingediend via professionele intake-flow',
        ];

        const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
          lines.filter(Boolean).join('\n')
        )}`;
        window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
      } catch (err) {
        setSubmitError(err instanceof Error ? err.message : 'Er is een onbekende fout opgetreden');
      } finally {
        setIsSubmitting(false);
      }
    },
    []
  );

  // Build summary data
  const summaryData = useMemo(() => {
    const formData = getValues();
    return {
      plan: formData.plan === 'business' ? 'Business' : 'Starter',
      planPrice: formData.plan === 'business' ? '€1290' : '€690',
      paymentMode:
        formData.paymentMode === 'full'
          ? 'Volledige betaling'
          : formData.plan === 'business'
            ? 'Termijnen (3x €439, 6x €224, 12x €119)'
            : 'Termijnen (3x €239, 6x €119, 12x €69)',
      businessType: formData.businessType,
      businessName: formData.businessName,
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      domain: formData.domain,
      websiteGoal: formData.websiteGoal,
      description: formData.description,
    };
  }, [getValues]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Header with progress tracking */}
      <div className="space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              {STEP_CONFIG[currentStep - 1].title}
            </h2>
            <p className="text-gray-600 text-sm md:text-base mt-1">
              {STEP_CONFIG[currentStep - 1].description}
            </p>
          </div>
          <div className="text-sm font-semibold text-gray-700 whitespace-nowrap">
            <span className="text-blue-600">Stap {currentStep}</span> van {TOTAL_STEPS}
          </div>
        </div>

        {/* Progress bar */}
        <ProgressBar current={currentStep} total={TOTAL_STEPS} className="h-2" />

        {/* Step indicators - visible on desktop */}
        <div className="hidden sm:flex gap-2">
          {STEP_CONFIG.map((step) => (
            <StepIndicator
              key={step.id}
              number={step.id}
              isActive={step.id === currentStep}
              isCompleted={step.id < currentStep}
            />
          ))}
        </div>
      </div>

      {/* Error message */}
      {submitError && (
        <div className="rounded-lg bg-red-50 border border-red-200 p-4 text-sm text-red-600 animate-in fade-in">
          {submitError}
        </div>
      )}

      <div className="space-y-6">
        {/* Step 1: Offer - Package & Payment */}
        {currentStep === 1 && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="plan" className="text-base font-semibold">
                  Welk pakket kies je?
                </Label>
                <p className="text-sm text-gray-600">
                  Beide pakketten bevatten professioneel ontwerp, hosting en SSL-certificaat.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {(['starter', 'business'] as const).map((pkgOption) => {
                  const isSelected = watch('plan') === pkgOption;
                  const pkgLabel = pkgOption === 'business' ? 'Business' : 'Starter';
                  const pkgPrice = pkgOption === 'business' ? '€1290' : '€690';
                  const pkgMonthly = pkgOption === 'business' ? '€119' : '€69';

                  return (
                    <label
                      key={pkgOption}
                      className={`relative flex flex-col p-6 rounded-lg border transition-all duration-200 cursor-pointer ${
                        isSelected
                          ? 'border-gray-900 bg-gray-50 shadow-sm'
                          : 'border-gray-200 bg-white hover:border-gray-300'
                      } ${planLocked && pkgOption !== defaultPlan ? 'opacity-40 cursor-not-allowed' : ''}`}
                    >
                      <input
                        type="radio"
                        {...register('plan')}
                        value={pkgOption}
                        disabled={planLocked && pkgOption !== defaultPlan}
                        className="sr-only"
                      />
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="text-sm font-semibold text-gray-900 tracking-tight">{pkgLabel}</h3>
                          <p className="text-2xl font-bold text-gray-900 mt-2">{pkgPrice}</p>
                          <p className="text-xs text-gray-500 mt-1">
                            Vanaf <span className="text-gray-700 font-medium">{pkgMonthly}/maand</span>
                          </p>
                        </div>
                        <div
                          className={`w-5 h-5 rounded-full border flex items-center justify-center flex-shrink-0 transition-all ${
                            isSelected
                              ? 'border-gray-900 bg-gray-900'
                              : 'border-gray-300'
                          }`}
                        >
                          {isSelected && <Check className="w-3 h-3 text-white" />}
                        </div>
                      </div>
                    </label>
                  );
                })}
              </div>
              {errors.plan && <p className="text-sm text-red-600">{errors.plan.message}</p>}
            </div>

            <div className="rounded-lg bg-gray-50 border border-gray-150 p-4 mt-6">
              <p className="text-sm text-gray-700">
                Beide pakketten bevatten professioneel ontwerp, hosting en SSL-certificaat.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="paymentMode" className="text-base font-semibold">
                Hoe wil je betalen?
              </Label>
              <p className="text-sm text-gray-600">
                Kies eenmalig of spreiding over maanden.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
              {[
                { value: 'full' as const, label: 'Volledige betaling' },
                { value: 'installments' as const, label: installmentLabel },
              ].map((option) => (
                <label
                  key={option.value}
                  className={`flex items-center p-4 rounded-lg border transition-all duration-200 cursor-pointer ${
                    watch('paymentMode') === option.value
                      ? 'border-gray-900 bg-gray-50 shadow-sm'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <input
                    type="radio"
                    {...register('paymentMode')}
                    value={option.value}
                    className="sr-only"
                  />
                  <div
                    className={`w-4 h-4 rounded-full border flex items-center justify-center flex-shrink-0 transition-all ${
                      watch('paymentMode') === option.value
                        ? 'border-gray-900 bg-gray-900'
                        : 'border-gray-300'
                    }`}
                  >
                    {watch('paymentMode') === option.value && (
                      <Check className="w-2.5 h-2.5 text-white" />
                    )}
                  </div>
                  <span className="font-medium text-gray-900 text-sm ml-3">{option.label}</span>
                </label>
              ))}
            </div>
            {errors.paymentMode && (
              <p className="text-sm text-red-600 mt-2">{errors.paymentMode.message}</p>
            )}
          </div>
        )}

        {/* Step 2: Business - Company info */}
        {currentStep === 2 && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <p className="text-gray-600">
              Vertel ons wat over je bedrijf zodat we beter begrijpen wat je nodig hebt.
            </p>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="businessType" className="font-semibold">
                  Wat is jouw branche/bedrijfstype?
                </Label>
                <Input
                  id="businessType"
                  placeholder="Bijv. loodgieter, online coach, IT-dienstverlening"
                  {...register('businessType')}
                  className="h-11 rounded-lg border-gray-300"
                />
                {errors.businessType && (
                  <p className="text-sm text-red-600">{errors.businessType.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="businessName" className="font-semibold">
                  Bedrijfsnaam
                </Label>
                <Input
                  id="businessName"
                  placeholder="Bijv. Jansen Consulting"
                  {...register('businessName')}
                  className="h-11 rounded-lg border-gray-300"
                />
                {errors.businessName && (
                  <p className="text-sm text-red-600">{errors.businessName.message}</p>
                )}
              </div>
            </div>

            <div className="rounded-lg bg-gray-50 border border-gray-150 p-4">
              <p className="text-sm text-gray-700">
                We gebruiken deze informatie om beter te begrijpen wat je aanbiedt en wie je doelgroep is.
              </p>
            </div>
          </div>
        )}

        {/* Step 3: Contact - Personal info */}
        {currentStep === 3 && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <p className="text-gray-600">
              We nemen snel contact met je op via deze gegevens.
            </p>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName" className="font-semibold">
                  Volledige naam
                </Label>
                <Input
                  id="fullName"
                  placeholder="Jan Jansen"
                  {...register('fullName')}
                  className="h-11 rounded-lg border-gray-300"
                />
                {errors.fullName && (
                  <p className="text-sm text-red-600">{errors.fullName.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="font-semibold">
                  E-mailadres
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="jan@jansen.nl"
                  {...register('email')}
                  className="h-11 rounded-lg border-gray-300"
                />
                {errors.email && <p className="text-sm text-red-600">{errors.email.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="font-semibold">
                  Telefoonnummer
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+31 6 12 34 56 78"
                  {...register('phone')}
                  className="h-11 rounded-lg border-gray-300"
                />
                {errors.phone && <p className="text-sm text-red-600">{errors.phone.message}</p>}
              </div>
            </div>

            <div className="rounded-lg bg-gray-50 border border-gray-150 p-4">
              <p className="text-sm text-gray-700">
                Je gegevens zijn beveiligd. We gebruiken dit alleen voor je briefing.
              </p>
            </div>
          </div>
        )}

        {/* Step 4: Project basics */}
        {currentStep === 4 && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <p className="text-gray-600">
              Vertel ons kort wat je website moet bereiken en wat je nodig hebt.
            </p>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="domain" className="font-semibold">
                  Gewenste domeinnaam
                </Label>
                <Input
                  id="domain"
                  placeholder="bijv. janjansen.nl"
                  {...register('domain')}
                  className="h-11 rounded-lg border-gray-300"
                />
                <p className="text-xs text-gray-500">
                  Laat dit leeg als je nog geen domein hebt in gedachte.
                </p>
                {errors.domain && <p className="text-sm text-red-600">{errors.domain.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="websiteGoal" className="font-semibold">
                  Wat moet je website bereiken?
                </Label>
                <Textarea
                  id="websiteGoal"
                  placeholder="Bijv. meer klanten aantrekken, afspraken boeken, leads verzamelen, producten verkopen..."
                  rows={4}
                  {...register('websiteGoal')}
                  className="rounded-lg border-gray-300"
                />
                <p className="text-xs text-gray-500">
                  Dit is de meest belangrijke vraag. Hoe uitgebreider je antwoord, hoe beter we
                  kunnen helpen.
                </p>
                {errors.websiteGoal && (
                  <p className="text-sm text-red-600">{errors.websiteGoal.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="font-semibold">
                  Extra opmerkingen <span className="text-gray-500 font-normal">(optioneel)</span>
                </Label>
                <Textarea
                  id="description"
                  placeholder="Iets specifieks wat we moeten weten? Bijv. favoriete websites, specifieke wensen, budget, deadline..."
                  rows={3}
                  {...register('description')}
                  className="rounded-lg border-gray-300"
                />
                {errors.description && (
                  <p className="text-sm text-red-600">{errors.description.message}</p>
                )}
              </div>
            </div>

            <div className="rounded-lg bg-gray-50 border border-gray-150 p-4">
              <p className="text-sm text-gray-700">
                Aanvullende vragen over ontwerp, pagina&apos;s, en integraties bespreken we graag persoonlijk op WhatsApp.
              </p>
            </div>
          </div>
        )}

        {/* Step 5: Summary */}
        {currentStep === 5 && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <p className="text-gray-600 mb-6">
              Controleer je gegevens. Klik op <strong>Verstuur via WhatsApp</strong> om je briefing
              in te dienen.
            </p>

            {/* Package Summary */}
            <div className="rounded-lg border border-gray-200 bg-white p-5">
              <h3 className="font-semibold text-gray-900 mb-4 text-sm uppercase tracking-wide">Package & Payment</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Package:</span>
                  <span className="font-medium text-gray-900">{summaryData.plan}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Price:</span>
                  <span className="font-medium text-gray-900">{summaryData.planPrice}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Payment:</span>
                  <span className="font-medium text-gray-900">{summaryData.paymentMode}</span>
                </div>
              </div>
            </div>

            {/* Business Summary */}
            <div className="rounded-lg border border-gray-200 bg-white p-5">
              <h3 className="font-semibold text-gray-900 mb-4 text-sm uppercase tracking-wide">Business</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Company:</span>
                  <span className="font-medium text-gray-900">{summaryData.businessName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Industry:</span>
                  <span className="font-medium text-gray-900">{summaryData.businessType}</span>
                </div>
              </div>
            </div>

            {/* Contact Summary */}
            <div className="rounded-lg border border-gray-200 bg-white p-5">
              <h3 className="font-semibold text-gray-900 mb-4 text-sm uppercase tracking-wide">Contact</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Name:</span>
                  <span className="font-medium text-gray-900">{summaryData.fullName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Email:</span>
                  <span className="font-medium text-gray-900">{summaryData.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Phone:</span>
                  <span className="font-medium text-gray-900">{summaryData.phone}</span>
                </div>
              </div>
            </div>

            {/* Project Summary */}
            <div className="rounded-lg border border-gray-200 bg-white p-5">
              <h3 className="font-semibold text-gray-900 mb-4 text-sm uppercase tracking-wide">Project</h3>
              <div className="space-y-4 text-sm">
                <div>
                  <span className="text-gray-500 block mb-2 text-xs uppercase tracking-wide">Domain</span>
                  <span className="font-medium text-gray-900">
                    {summaryData.domain || '—'}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500 block mb-2 text-xs uppercase tracking-wide">Goals</span>
                  <span className="font-medium text-gray-900 block whitespace-pre-wrap break-words">
                    {summaryData.websiteGoal}
                  </span>
                </div>
                {summaryData.description && (
                  <div>
                    <span className="text-gray-500 block mb-2 text-xs uppercase tracking-wide">Notes</span>
                    <span className="font-medium text-gray-900 block whitespace-pre-wrap break-words">
                      {summaryData.description}
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="rounded-lg bg-gray-50 border border-gray-150 p-4">
              <p className="text-sm text-gray-700">
                Na verzenden opent WhatsApp en ontvangt ons team je compleet ingevulde briefing direct. We nemen contact op voor vervolgstappen.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-gray-200">
        <Button
          type="button"
          variant="outline"
          onClick={handlePreviousStep}
          disabled={currentStep === 1}
          className="w-full sm:w-auto gap-2"
        >
          <ChevronLeft className="w-4 h-4" />
          Vorige stap
        </Button>

        {currentStep === TOTAL_STEPS ? (
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto gap-2 min-w-[220px] bg-gray-900 hover:bg-gray-800 text-white font-semibold"
            size="lg"
          >
            {isSubmitting ? 'Bezig...' : 'Verstuur via WhatsApp'}
            <ChevronRight className="w-4 h-4" />
          </Button>
        ) : (
          <Button
            type="button"
            onClick={handleNextStep}
            className="w-full sm:w-auto gap-2 min-w-[160px] font-semibold bg-gray-900 hover:bg-gray-800 text-white"
          >
            Volgende stap
            <ChevronRight className="w-4 h-4" />
          </Button>
        )}
      </div>

      {/* Help Text */}
      <div className="text-center">
        <p className="text-xs text-gray-500">
          {currentStep === TOTAL_STEPS
            ? 'Na verzenden opent WhatsApp. Ons team ontvangt je briefing direct.'
            : 'Je gegevens worden lokaal opgeslagen tot verzending.'}
        </p>
      </div>
    </form>
  );
}
