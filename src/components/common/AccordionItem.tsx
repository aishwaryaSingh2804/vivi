import { useId, useState, type CSSProperties, type ReactNode } from 'react';

type AccordionItemProps = {
  question: string;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  isOpen?: boolean;
  onToggle?: () => void;
};

export function AccordionItem({ question, children, className = '', style, isOpen: controlledOpen, onToggle }: AccordionItemProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const isOpen = controlledOpen ?? internalOpen;
  const toggle = onToggle ?? (() => setInternalOpen((current) => !current));
  const answerId = useId();

  return (
    <div className={`faq-item${isOpen ? ' open' : ''}${className ? ` ${className}` : ''}`} style={style}>
      <button
        type="button"
        className="faq-q"
        aria-expanded={isOpen}
        aria-controls={answerId}
        onClick={toggle}
        style={{
          width: '100%',
          border: 0,
          background: 'transparent',
          color: 'inherit',
          font: 'inherit',
          textAlign: 'left',
          cursor: 'pointer',
        }}
      >
        {question}
        <span className="faq-chevron" aria-hidden="true">▾</span>
      </button>
      <div className="faq-a" id={answerId}>
        {children}
      </div>
    </div>
  );
}
