export const CREDIT_RATES = {
  Basic: { resolutions: ['480p','720p','1080p'], values: { '480p': 600, '720p': 1050, '1080p': 1875 } },
  Pro: { resolutions: ['720p','1080p'], values: { '720p': 1050, '1080p': 2100 } },
  Max: { resolutions: ['480p','720p','1080p'], values: { '480p': 1653.75, '720p': 3547.5, '1080p': 5115 } },
} as const;
export const SIMPLE_RATES = { Basic: { Standard: 1563, HD: 2388 }, Pro: { Standard: 1563, HD: 2613 }, Max: { Standard: 4060, HD: 5628 } } as const;
export function calculateSimple(model: keyof typeof SIMPLE_RATES, quality: 'Standard'|'HD', mins: number, music: boolean) { const credits = Math.round((SIMPLE_RATES[model][quality] + (music ? 62.5 : 0)) * mins); const usd = credits/100; return { credits, usd, inr: Math.round(usd*84) }; }
export function calculateDetailed(model: keyof typeof CREDIT_RATES, resolution: string, length: number, music: boolean) { const tier=CREDIT_RATES[model]; const video=tier.values[resolution as keyof typeof tier.values] ?? 0; const image=262.5*length; const llm=187.5; const musicCredits=music?62.5*length:0; const total=video*length+image+llm+musicCredits; const usd=total/100; return {video:video*length,image,llm,music:musicCredits,total,usd,inr:Math.round(usd*84)}; }
