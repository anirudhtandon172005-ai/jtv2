import React, { useState, useEffect } from 'react';
import './AskDoubtModal.css';

const DEFAULT_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSfNX_0xYgxddMdjT7FZHeLRZtxW5huw1R50_vH9umr6y793TQ/viewform?embedded=true';

export default function AskDoubtModal({
  isOpen,
  onClose,
  formUrl = DEFAULT_FORM_URL
}) {
  const [loading, setLoading] = useState(true);

  // Close on Escape key & disable background scroll
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, onClose]);

  // Reset loading state when modal reopens
  useEffect(() => {
    if (isOpen) {
      setLoading(true);
    }
  }, [isOpen, formUrl]);

  if (!isOpen) return null;

  // External viewform URL for the open in new tab helper button
  const externalUrl = formUrl.replace('embedded=true', 'usp=sf_link');

  return (
    <div
      className="ask-doubt-modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="ask-doubt-modal-heading"
    >
      <div
        className="ask-doubt-modal-container"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="ask-doubt-modal-header">
          <div className="ask-doubt-modal-title-group">
            <h3 id="ask-doubt-modal-heading" className="ask-doubt-modal-title">
              Submit a Technical Doubt
              <span className="ask-doubt-modal-badge">Direct Mentorship</span>
            </h3>
            <p className="ask-doubt-modal-subtitle">
              Fill in your doubt below. Senior technical leads and mentors will review and respond.
            </p>
          </div>

          <div className="ask-doubt-modal-actions">
            <a
              href={externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ask-doubt-modal-link-btn"
              title="Open form in a separate tab"
            >
              <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              <span>Full Tab</span>
            </a>

            <button
              onClick={onClose}
              className="ask-doubt-modal-close-btn"
              aria-label="Close dialog"
            >
              &times;
            </button>
          </div>
        </div>

        {/* Form Body */}
        <div className="ask-doubt-modal-body">
          {loading && (
            <div className="ask-doubt-modal-loader" aria-hidden="true">
              <div className="ask-doubt-modal-spinner" />
              <div className="ask-doubt-modal-loading-text">Loading Google Form…</div>
            </div>
          )}

          <iframe
            src={formUrl}
            className="ask-doubt-modal-iframe"
            title="Google Form - Submit a Technical Doubt"
            onLoad={() => setLoading(false)}
            frameBorder="0"
            marginHeight="0"
            marginWidth="0"
          >
            Loading form…
          </iframe>
        </div>
      </div>
    </div>
  );
}

