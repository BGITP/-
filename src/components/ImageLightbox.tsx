import { useEffect } from 'react';
import { X, ZoomIn } from 'lucide-react';

interface ImageLightboxProps {
  isOpen: boolean;
  imagePath: string;
  imageAlt: string;
  title: string;
  subtitle?: string;
  onClose: () => void;
}

export function ImageLightbox({
  isOpen,
  imagePath,
  imageAlt,
  title,
  subtitle,
  onClose,
}: ImageLightboxProps) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="relative flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-xl border border-slate-700 bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-4 border-b border-slate-200 bg-slate-50 px-5 py-3.5">
          <div className="min-w-0">
            <h3 className="truncate text-sm font-semibold text-slate-900 sm:text-base">
              {title}
            </h3>
            {subtitle && (
              <p className="truncate text-xs text-slate-500 mt-0.5">{subtitle}</p>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="확대 이미지 닫기"
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F4C81]"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <div className="overflow-auto bg-slate-100 p-4 sm:p-6 flex items-start justify-center">
          <img
            src={imagePath}
            alt={imageAlt}
            referrerPolicy="no-referrer"
            className="max-w-full h-auto rounded-lg border border-slate-200 bg-white shadow-sm"
          />
        </div>

        <div className="flex items-center justify-between border-t border-slate-200 bg-white px-5 py-2.5 text-xs text-slate-500">
          <span className="inline-flex items-center gap-1.5">
            <ZoomIn className="h-3.5 w-3.5 text-slate-400" aria-hidden="true" />
            화면 안의 빨간 원 번호(①~㉚)를 확인하세요.
          </span>
          <span>ESC 키 또는 바깥 영역을 누르면 닫힙니다.</span>
        </div>
      </div>
    </div>
  );
}
