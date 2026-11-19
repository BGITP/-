import { ExternalLink } from 'lucide-react';
import { OFFICIAL_TDAC_URL } from '../data/tdacGuideData';

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-8 px-4 py-3.5 sm:px-6">
        <a
          href="#top"
          className="text-base font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0 sm:text-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F4C81] rounded-sm"
        >
          태국 TDAC 가이드
        </a>

        <nav
          aria-label="주요 메뉴"
          className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600"
        >
          <a
            href="#overview"
            className="hover:text-[#0F4C81] transition-colors whitespace-nowrap shrink-0 py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F4C81] rounded-sm"
          >
            핵심 안내
          </a>
          <a
            href="#step-guide"
            className="hover:text-[#0F4C81] transition-colors whitespace-nowrap shrink-0 py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F4C81] rounded-sm"
          >
            단계별 가이드
          </a>
          <a
            href="#accommodation"
            className="hover:text-[#0F4C81] transition-colors whitespace-nowrap shrink-0 py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F4C81] rounded-sm"
          >
            숙소 입력 예시
          </a>
          <a
            href="#practice-sheet"
            className="hover:text-[#0F4C81] transition-colors whitespace-nowrap shrink-0 py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F4C81] rounded-sm"
          >
            사전 작성 도우미
          </a>
        </nav>

        <div className="flex items-center shrink-0">
          <a
            href={OFFICIAL_TDAC_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg bg-[#0F4C81] px-4 py-2 text-xs font-semibold text-white hover:bg-[#0B3A63] transition-colors whitespace-nowrap shrink-0 min-h-[40px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F4C81] focus-visible:ring-offset-2"
          >
            <span>공식 사이트 열기</span>
            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </header>
  );
}
