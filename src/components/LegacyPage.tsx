import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { HASH_TO_ROUTE, ROUTES } from '../lib/routes';
import {
  calculateDetailed,
  calculateSimple,
  CREDIT_RATES,
} from '../lib/calculator';

type Props = {
  html: string;
  pageKey: string;
};

const navigateHash = (
  href: string,
  navigate: ReturnType<typeof useNavigate>
) => {
  const route = HASH_TO_ROUTE[href];

  if (route) {
    navigate(route);
    return true;
  }

  return false;
};

export function LegacyPage({ html, pageKey }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const root = ref.current;

    if (!root) return;

    const onClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      // --------------------------------------------------
      // Gallery carousel arrows
      // --------------------------------------------------
      const galleryPrev = target.closest(
        '[data-gallery-prev]'
      );

      if (galleryPrev) {
        const track = root.querySelector(
          '.gallery-track'
        ) as HTMLElement | null;

        if (track) {
          track.scrollBy({
            left: -(track.clientWidth * 0.85),
            behavior: 'smooth',
          });
        }

        return;
      }

      const galleryNext = target.closest(
        '[data-gallery-next]'
      );

      if (galleryNext) {
        const track = root.querySelector(
          '.gallery-track'
        ) as HTMLElement | null;

        if (track) {
          track.scrollBy({
            left: track.clientWidth * 0.85,
            behavior: 'smooth',
          });
        }

        return;
      }
      // --------------------------------------------------
      // STUDIO: Start creating → Login
      // --------------------------------------------------
      if (
        pageKey === 'studio' &&
        target.closest('.studio-create-btn')
      ) {
        event.preventDefault();
        navigate(ROUTES.LOGIN);
        return;
      }

      // --------------------------------------------------
      // Account button
      // --------------------------------------------------
      if (target.closest('#account-btn')) {
        window.dispatchEvent(
          new CustomEvent('vivi:toggle-account')
        );
        return;
      }

      // --------------------------------------------------
      // data-route navigation
      // --------------------------------------------------
      const routeTarget = target.closest(
        '[data-route]'
      ) as HTMLElement | null;

      if (routeTarget) {
        const routeName =
          routeTarget.getAttribute('data-route') || '';

        const route = Object.entries(HASH_TO_ROUTE).find(
          ([k]) => k === '#page-' + routeName
        )?.[1];

        if (route) {
          event.preventDefault();
          navigate(route);
          return;
        }
      }

      // --------------------------------------------------
      // Hash links
      // --------------------------------------------------
      const anchor = target.closest('a') as HTMLAnchorElement | null;

      if (anchor) {
        const href = anchor.getAttribute('href') ?? '';

        if (href.startsWith('#page-')) {
          event.preventDefault();
          navigateHash(href, navigate);
          return;
        }

        if (href === '#') {
          event.preventDefault();
          return;
        }
      }

      // --------------------------------------------------
      // Prompt chips
      // --------------------------------------------------
      const prompt = target.closest(
        '[data-prompt], .prompt-chip, .create-chip'
      ) as HTMLElement | null;

      if (prompt) {
        const promptMap = [
          'A psychological thriller set in a Mumbai therapy clinic',
          'The Kakori train robbery, 1925, Indian freedom struggle',
          'Bedtime story: a boy who found a dinosaur egg in his backyard',
        ];

        const chips = [
          ...root.querySelectorAll('.prompt-chip'),
        ];

        const index = chips.indexOf(prompt);

        const text =
          prompt.dataset.prompt ??
          (index >= 0
            ? promptMap[index]
            : prompt.textContent?.trim() ?? '');

        const input = root.querySelector(
          '.create-textarea'
        ) as HTMLTextAreaElement | null;

        if (input && text) {
          input.value = text;

          input.dispatchEvent(
            new Event('input', {
              bubbles: true,
            })
          );
        }
      }

      // --------------------------------------------------
      // Category tabs
      // --------------------------------------------------
      const catTab = target.closest(
        '.cat-tab'
      ) as HTMLElement | null;

      if (catTab) {
        const tabs = [
          ...root.querySelectorAll('.cat-tab'),
        ];

        const index = tabs.indexOf(catTab);

        const ids = [
          'micro',
          'history',
          'kids',
          'animation',
        ];

        tabs.forEach((x) =>
          x.classList.remove('active')
        );

        catTab.classList.add('active');

        root
          .querySelectorAll('.cat-panel')
          .forEach((x) =>
            x.classList.remove('active')
          );

        root
          .querySelector('#cat-' + ids[index])
          ?.classList.add('active');

        return;
      }

      // --------------------------------------------------
      // History tabs
      // --------------------------------------------------
      const histTab = target.closest(
        '.hist-tab'
      ) as HTMLElement | null;

      if (histTab) {
        const tabs = [
          ...root.querySelectorAll('.hist-tab'),
        ];

        const index = tabs.indexOf(histTab);

        tabs.forEach((x) =>
          x.classList.remove('active')
        );

        histTab.classList.add('active');

        root
          .querySelectorAll('.hist-panel')
          .forEach((x) =>
            x.classList.remove('active')
          );

        const ids = [
          'ancient',
          'medieval',
          'modern',
        ];

        root
          .querySelector('#hist-' + ids[index])
          ?.classList.add('active');

        return;
      }

      // --------------------------------------------------
      // Pricing / billing toggle
      // --------------------------------------------------
      const billing = target.closest(
        '#billing-toggle, .pricing-toggle-wrap .toggle-track'
      ) as HTMLElement | null;

      if (billing && pageKey === 'pricing') {
        const on = !billing.classList.contains('on');

        billing.classList.toggle('on', on);

        const creator = root.querySelector(
          '#creator-price'
        );

        const pro = root.querySelector(
          '#pro-price'
        );

        if (creator) {
          creator.textContent = on
            ? '₹799'
            : '₹999';
        }

        if (pro) {
          pro.textContent = on
            ? '₹2,399'
            : '₹2,999';
        }

        root
          .querySelector('#label-monthly')
          ?.classList.toggle('active', !on);

        root
          .querySelector('#label-annual')
          ?.classList.toggle('active', on);

        return;
      }

      // --------------------------------------------------
      // FAQ accordion
      // --------------------------------------------------
      const faq = target.closest(
        '.faq-q'
      ) as HTMLElement | null;

      if (faq) {
        const item = faq.closest('.faq-item');

        if (!item) return;

        const wasOpen =
          item.classList.contains('open');

        item.parentElement
          ?.querySelectorAll('.faq-item.open')
          .forEach((x) =>
            x.classList.remove('open')
          );

        if (!wasOpen) {
          item.classList.add('open');
        }

        return;
      }

      // --------------------------------------------------
      // Credit tier cards
      // --------------------------------------------------
      const tier = target.closest(
        '.tier-card'
      ) as HTMLElement | null;

      if (tier && pageKey === 'credits') {
        const name = tier.id.replace(
          'tier-',
          ''
        ) as keyof typeof CREDIT_RATES;

        if (name in CREDIT_RATES) {
          const sel = root.querySelector(
            '#calc-tier'
          ) as HTMLSelectElement | null;

          if (sel) {
            sel.value = name;

            sel.dispatchEvent(
              new Event('change', {
                bubbles: true,
              })
            );
          }
        }
      }

      // --------------------------------------------------
      // Cookie accept
      // --------------------------------------------------
      if (target.closest('.cookie-accept')) {
        try {
          localStorage.setItem(
            'vivi_cookies',
            '1'
          );
        } catch {}

        root
          .querySelector('#cookie-banner')
          ?.remove();
      }

      // --------------------------------------------------
      // Cookie reject
      // --------------------------------------------------
      if (target.closest('.cookie-reject')) {
        try {
          localStorage.setItem(
            'vivi_cookies',
            '0'
          );
        } catch {}

        root
          .querySelector('#cookie-banner')
          ?.remove();
      }
    };

    const onChange = (event: Event) => {
      const target =
        event.target as HTMLSelectElement;

      if (
        pageKey === 'credits' &&
        target.id === 'calc-tier'
      ) {
        syncResolutionOptions(root);
      }

      if (
        pageKey === 'credits' &&
        target.id.startsWith('calc-')
      ) {
        updateDetailed(root);
      }

      if (
        pageKey === 'credits' &&
        target.id.startsWith('scr-')
      ) {
        updateSimple(root);
      }
    };

    root.addEventListener('click', onClick);
    root.addEventListener('change', onChange);

    return () => {
      root.removeEventListener('click', onClick);
      root.removeEventListener('change', onChange);
    };
  }, [navigate, pageKey]);

  useEffect(() => {
    const root = ref.current;

    if (!root) return;

    if (pageKey === 'credits') {
      updateDetailed(root);
      updateSimple(root);
    }
  }, [pageKey]);

  return (
    <div
      ref={ref}
      className="legacy-page"
      dangerouslySetInnerHTML={{
        __html: html,
      }}
    />
  );
}

function syncResolutionOptions(root: HTMLElement) {
  const model =
    ((root.querySelector(
      '#calc-tier'
    ) as HTMLSelectElement | null)?.value ||
      'Max') as keyof typeof CREDIT_RATES;

  const sel = root.querySelector(
    '#calc-res'
  ) as HTMLSelectElement | null;

  if (!sel) return;

  const current = sel.value;

  sel.innerHTML = CREDIT_RATES[
    model
  ].resolutions
    .map(
      (r) =>
        `<option value="${r}">${r}</option>`
    )
    .join('');

  if (
    (
      CREDIT_RATES[model]
        .resolutions as readonly string[]
    ).includes(current)
  ) {
    sel.value = current;
  } else {
    sel.value = '720p';
  }
}

function updateDetailed(root: HTMLElement) {
  const model =
    (root.querySelector(
      '#calc-tier'
    ) as HTMLSelectElement | null)?.value as
      | keyof typeof CREDIT_RATES
      | undefined || 'Max';

  const res =
    (root.querySelector(
      '#calc-res'
    ) as HTMLSelectElement | null)?.value ||
    '720p';

  const len = Number(
    (
      root.querySelector(
        '#calc-len'
      ) as HTMLSelectElement | null
    )?.value || 1
  );

  const music =
    (
      root.querySelector(
        '#calc-music'
      ) as HTMLSelectElement | null
    )?.value === 'yes';

  const r = calculateDetailed(
    model,
    res,
    len,
    music
  );

  const set = (id: string, v: string) => {
    const e = root.querySelector('#' + id);

    if (e) {
      e.textContent = v;
    }
  };

  set(
    'cr-total',
    Math.round(r.total).toLocaleString('en-IN')
  );

  set(
    'cr-usd',
    '$' + r.usd.toFixed(2)
  );

  set(
    'cr-inr',
    '≈ ₹' + r.inr.toLocaleString('en-IN')
  );

  set(
    'bd-vid',
    Math.round(r.video).toLocaleString('en-IN') +
      ' cr'
  );

  set(
    'bd-img',
    Math.round(r.image).toLocaleString('en-IN') +
      ' cr'
  );

  set(
    'bd-llm',
    Math.round(r.llm).toLocaleString('en-IN') +
      ' cr (fixed/video)'
  );

  set(
    'bd-mus',
    music
      ? Math.round(r.music).toLocaleString('en-IN') +
          ' cr'
      : '—'
  );

  set(
    'bd-tot',
    Math.round(r.total).toLocaleString('en-IN') +
      ' cr'
  );

  const label = root.querySelector('#cr-lbl');

  if (label) {
    label.textContent = `${
      len === 1 ? '1 min' : len + ' min'
    } · ${model} · ${res}${
      music ? ' · music' : ' · no music'
    }`;
  }
}

function updateSimple(root: HTMLElement) {
  const model =
    ((root.querySelector(
      '#scr-model'
    ) as HTMLSelectElement | null)?.value ||
      'Pro') as 'Basic' | 'Pro' | 'Max';

  const quality =
    ((root.querySelector(
      '#scr-quality'
    ) as HTMLSelectElement | null)?.value ||
      'Standard') as 'Standard' | 'HD';

  const mins = Number(
    (
      root.querySelector(
        '#scr-mins'
      ) as HTMLSelectElement | null
    )?.value || 1
  );

  const music =
    (
      root.querySelector(
        '#scr-music'
      ) as HTMLSelectElement | null
    )?.value === 'yes';

  const r = calculateSimple(
    model,
    quality,
    mins,
    music
  );

  const set = (id: string, v: string) => {
    const e = root.querySelector('#' + id);

    if (e) {
      e.textContent = v;
    }
  };

  set(
    'scr-usd',
    '$' + r.usd.toFixed(2)
  );

  set(
    'scr-inr',
    '≈ ₹' + r.inr.toLocaleString('en-IN')
  );

  set(
    'scr-cr',
    r.credits.toLocaleString('en-IN') +
      ' credits'
  );

  set(
    'scr-lbl',
    `${
      mins === 1 ? '1-minute' : mins + '-minute'
    } ${model} video, ${quality}${
      music ? ', with music' : ' no music'
    }`
  );
}