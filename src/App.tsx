import { Header } from './components/Header';
import { HeroAndCalculator } from './components/HeroAndCalculator';
import { StepGuideWorkspace } from './components/StepGuideWorkspace';
import { AccommodationExamples } from './components/AccommodationExamples';
import { InteractivePracticeSheet } from './components/InteractivePracticeSheet';
import { CUSTOMER_SHARE_URL, OFFICIAL_TDAC_URL } from './data/tdacGuideData';

export default function App() {
  return (
    <div id="top" className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-900">
      <Header />

      <main className="flex-1">
        <HeroAndCalculator />
        <StepGuideWorkspace />
        <AccommodationExamples />
        <InteractivePracticeSheet />
      </main>

      <footer className="border-t border-slate-200 bg-white py-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div className="text-xs text-slate-500 leading-relaxed">
            <div className="font-semibold text-slate-800">
              태국 전자입국카드 (TDAC: Thailand Digital Arrival Card) 작성 안내
            </div>
            <div className="mt-1">
              2025년 5월 1일 시행 · 입국 3일(72시간) 전부터 작성 가능 · QR코드 저장 및 출력 권장
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-600">
            <a
              href={OFFICIAL_TDAC_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#0F4C81] underline underline-offset-4"
            >
              공식 사이트 (tdac.immigration.go.th)
            </a>
            <a
              href={CUSTOMER_SHARE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#0F4C81] underline underline-offset-4"
            >
              고객 안내 링크
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
