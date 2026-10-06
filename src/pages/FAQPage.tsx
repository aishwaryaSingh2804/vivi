import { useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { AccordionItem } from '../components/common/AccordionItem';
import { PageNavigation } from '../components/common/PageNavigation';
import { ROUTES } from '../lib/routes';

type FAQEntry = {
  question: string;
  answer: ReactNode;
};

type FAQGroup = {
  category: string;
  items: FAQEntry[];
};

const faqGroups: FAQGroup[] = [
  {
    category: 'General',
    items: [
      {
        question: 'What is Visl?',
        answer:
          'Visl is an AI video generator built for long-form storytelling. Describe a story and Visl writes the script, casts consistent characters, generates visuals, adds narration and dialogue, and delivers a finished video of 2-8 minutes.',
      },
      {
        question: 'What kinds of videos can I make?',
        answer:
          'Microdramas (2-3 min thrillers, sci-fi, heist stories), history videos (cinematic retellings of real events), kids stories (educational, safe animated stories), and adult animation (Indian Ghibli-style, literature classics).',
      },
      {
        question: 'How is Visl different from other AI video tools?',
        answer:
          'Three things: (1) Long-form — most AI video tools max out at 30-60 seconds. Visl is built for 2-8 minute complete stories with a real arc. (2) Consistent characters — the same face across every scene. (3) Narration and dialogue — characters speak to each other. Visl writes and voices the entire script.',
      },
      {
        question: 'How long does generation take?',
        answer:
          '4-8 minutes for a standard video. Pro plan gets instant generation. You will get a notification when ready — no need to stay on the page.',
      },
    ],
  },
  {
    category: 'Getting Started',
    items: [
      {
        question: 'Do I need any creative experience?',
        answer:
          'No. If you can describe a story in a few sentences, Visl can build it. No screenwriting, animation, or video production knowledge needed.',
      },
      {
        question: 'Can I use my own script?',
        answer:
          'Yes. Paste your own script and Visl produces visuals, voices, and audio around it. Or write a rough outline and let Visl expand it.',
      },
      {
        question: 'Can I upload my own voice?',
        answer:
          'Yes, on Creator and Pro plans. Upload a 30-second sample and Visl uses it for narration. Your voice sample is private and never used to train models.',
      },
      {
        question: 'How do I get the best results?',
        answer:
          'Be specific. "A psychological thriller set in a Mumbai therapy clinic where the therapist realises her patient knows things only she could know" beats "a thriller." Specifying the visual style also makes a significant difference.',
      },
    ],
  },
  {
    category: 'Video Quality & Styles',
    items: [
      {
        question: 'What visual styles are available?',
        answer:
          'Pixar-style 3D, Indian Ghibli (painterly, warm), Cinematic Realistic (live-action look), 2D Animation, Watercolour, and Shadow Puppet. More styles added regularly.',
      },
      {
        question: 'Do characters stay consistent between scenes?',
        answer:
          "Yes. This is Visl's core technical differentiator. Characters maintain the same face, voice, and visual presence across every scene — what makes the output feel like a film rather than a series of disconnected clips.",
      },
      {
        question: 'Can I make videos in Hindi or other Indian languages?',
        answer:
          "Yes. Subtitles in 12 languages on Creator and Pro. Full audio dubbing into Hindi, Tamil, and Telugu on Pro — characters' voices are generated in the target language, not just subtitled.",
      },
    ],
  },
  {
    category: 'Publishing & Rights',
    items: [
      {
        question: 'Who owns the videos I create?',
        answer:
          'You do. Videos you generate are yours. Publish, distribute, monetize, and use commercially with no attribution or royalty required.',
      },
      {
        question: 'Can I publish directly to YouTube, TikTok, or Instagram?',
        answer:
          'Yes. Direct publishing is included on all plans. You can also download as MP4 and upload anywhere manually.',
      },
      {
        question: 'Can I use Visl videos for ads or brand content?',
        answer:
          'Yes, commercial use is included on all plans. For high-volume brand/agency work, a Pro or Enterprise plan is recommended.',
      },
    ],
  },
  {
    category: 'Pricing & Billing',
    items: [
      {
        question: 'Is there a free plan?',
        answer:
          'Yes. 3 videos per month, up to 3 minutes each, all visual styles. No credit card required. No expiry.',
      },
      {
        question: 'Can I cancel anytime?',
        answer:
          'Yes. No lock-in, no cancellation fee. Cancel from account settings; you keep access until the end of the current billing period.',
      },
      {
        question: 'Do unused videos roll over?',
        answer:
          'No. Unused video credits reset each billing month. Pro plan\'s unlimited generation removes the need to track credits at all.',
      },
    ],
  },
  {
    category: 'Privacy & Data',
    items: [
      {
        question: 'Does Visl train on my videos or prompts?',
        answer: (
          <>
            No. Your prompts and generated videos are not used to train Visl&apos;s
            models. See our{' '}
            <Link
              to={ROUTES.PRIVACY}
              style={{ color: 'var(--accent)' }}
            >
              privacy policy
            </Link>{' '}
            for full details.
          </>
        ),
      },
      {
        question: 'How long do you store my videos?',
        answer:
          'Videos are stored for as long as you have an active account. If you close your account, data is retained for 90 days then permanently deleted. You can delete individual videos anytime.',
      },
    ],
  },
];

export function FAQPage() {
  const [openByGroup, setOpenByGroup] = useState<
    Record<string, string | null>
  >({});

  return (
    <PageNavigation>
      <div id="page-faq" className="page">
        <div className="faq-layout">
          <div className="section-overline">FAQ</div>

          <h1
            style={{
              fontFamily: 'var(--ff-display)',
              fontSize: 'clamp(38px, 5vw, 56px)',
              fontWeight: 700,
              color: 'var(--text)',
              marginBottom: 8,
              lineHeight: 1.1,
            }}
          >
            Questions, answered.
          </h1>

          <p
            style={{
              fontSize: 16,
              color: 'var(--muted)',
              marginBottom: 40,
            }}
          >
            Can&apos;t find what you need?{' '}
            <Link
              to={ROUTES.CONTACT}
              style={{ color: 'var(--accent)' }}
            >
              Reach out →
            </Link>
          </p>

          {faqGroups.map((group) => (
            <div className="faq-category-group" key={group.category}>
              <div className="faq-category-label">{group.category}</div>

              {group.items.map((item) => (
                <AccordionItem
                  key={item.question}
                  question={item.question}
                  isOpen={openByGroup[group.category] === item.question}
                  onToggle={() =>
                    setOpenByGroup((current) => ({
                      ...current,
                      [group.category]:
                        current[group.category] === item.question
                          ? null
                          : item.question,
                    }))
                  }
                >
                  {item.answer}
                </AccordionItem>
              ))}
            </div>
          ))}
        </div>
      </div>
    </PageNavigation>
  );
}