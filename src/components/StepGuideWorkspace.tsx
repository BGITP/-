import { useState } from 'react';
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Copy,
  ZoomIn,
  AlertCircle,
  ImageOff,
} from 'lucide-react';
import {
  ALL_GUIDE_MARKERS,
  GUIDE_STAGES,
  OCCUPATION_EXAMPLES,
  type GuideStage,
} from '../data/tdacGuideData';
import { ImageLightbox } from './ImageLightbox';

export function StepGuideWorkspace() {
  const [activeStageId, setActiveStageId] = useState<string>(GUIDE_STAGES[0].id);
  const [highlightedMarker, setHighlightedMarker] = useState<string>('①');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [imgErrorIds, setImgErrorIds] = useState<Record<string, boolean>>({});

  const activeStageIndex = GUIDE_STAGES.findIndex((s) => s.id === activeStageId);
  const activeStage: GuideStage = GUIDE_STAGES[activeStageIndex] || GUIDE_STAGES[0];

  const handleCopy = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId((prev) => (prev === id ? null : prev)), 1800);
    } catch {
      // Ignore clipboard failures
    }
  };

  const handleJumpToMarker = (marker: string, stageId: string) => {
    setActiveStageId(stageId);
    setHighlightedMarker(marker);
    const el = document.getElementById(`guide-item-${marker}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  const handleStageChange = (stage: GuideStage) => {
    setActiveStageId(stage.id);
    if (stage.items.length > 0) {
      setHighlightedMarker(stage.items[0].marker);
    }
  };

  return (
    <section id="step-guide" className="border-b border-slate-200 bg-[#F8FAFC] py-12 lg:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Section header */}
        <div className="max-w-3xl">
          <div className="text-xs font-semibold text-[#0F4C81]">
            화면 번호별 상세 안내 · ① ~ ㉚
          </div>
          <h2 className="mt-1.5 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl text-balance">
            실제 TDAC 화면 순서대로 따라하는 단계별 가이드
          </h2>
          <p className="mt-2.5 text-sm leading-relaxed text-slate-600 sm:text-base">
            단계를 선택하거나 아래 번호를 누르면 해당 화면 이미지와 입력 요령으로 바로 이동합니다. 스크린샷을 클릭하면 크게 확대해 볼 수 있습니다.
          </p>
        </div>

        {/* Stage Tabs */}
        <div
          role="tablist"
          aria-label="TDAC 작성 단계 선택"
          className="mt-6 flex items-center gap-1.5 overflow-x-auto rounded-xl border border-slate-200 bg-white p-1.5"
        >
          {GUIDE_STAGES.map((stage) => {
            const isActive = stage.id === activeStage.id;
            return (
              <button
                key={stage.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => handleStageChange(stage)}
                className={`flex items-center gap-2 rounded-lg px-3.5 py-2.5 text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap shrink-0 min-h-[40px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F4C81] ${
                  isActive
                    ? 'bg-[#0F4C81] text-white'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <span>{stage.stepNumber}</span>
                <span className="opacity-60" aria-hidden="true">
                  ·
                </span>
                <span>{stage.shortLabel}</span>
                <span
                  className={`font-mono-code text-xs ${
                    isActive ? 'text-sky-100' : 'text-slate-400'
                  }`}
                >
                  ({stage.markersSummary})
                </span>
              </button>
            );
          })}
        </div>

        {/* Quick-jump numbered index bar */}
        <div className="mt-3 rounded-lg border border-slate-200 bg-white px-3.5 py-2.5">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="mr-1.5 text-xs font-semibold text-slate-500 whitespace-nowrap">
              번호 바로가기:
            </span>
            {ALL_GUIDE_MARKERS.map((entry) => {
              const isSelected = highlightedMarker === entry.marker;
              return (
                <button
                  key={entry.marker}
                  type="button"
                  onClick={() => handleJumpToMarker(entry.marker, entry.stageId)}
                  title={`${entry.marker} ${entry.title}`}
                  className={`rounded-md px-2 py-1 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 min-h-[30px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F4C81] ${
                    isSelected
                      ? 'bg-red-600 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {entry.marker}
                </button>
              );
            })}
          </div>
        </div>

        {/* Two-zone interactive workspace */}
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-start">
          {/* Left Zone: Annotated Screenshot Preview */}
          <div className="lg:col-span-5 lg:sticky lg:top-20">
            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
              <div className="flex items-center justify-between gap-3 border-b border-slate-200 bg-slate-50 px-4 py-3">
                <div className="min-w-0">
                  <div className="text-xs font-semibold text-[#0F4C81]">
                    {activeStage.stepNumber} 화면 ({activeStage.markersSummary})
                  </div>
                  <div className="truncate text-sm font-bold text-slate-900">
                    {activeStage.shortLabel}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setLightboxOpen(true)}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors whitespace-nowrap shrink-0 min-h-[36px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F4C81]"
                >
                  <ZoomIn className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>화면 확대</span>
                </button>
              </div>

              <div className="bg-slate-100 p-3 sm:p-4">
                {imgErrorIds[activeStage.id] ? (
                  <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-slate-300 bg-white p-10 text-center">
                    <ImageOff className="h-8 w-8 text-slate-400" aria-hidden="true" />
                    <p className="mt-2 text-sm font-semibold text-slate-700">
                      {activeStage.shortLabel} 안내 이미지
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      이미지를 불러오지 못했습니다. 오른쪽 단계별 설명을 참고해 주세요.
                    </p>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setLightboxOpen(true)}
                    className="group relative block w-full overflow-hidden rounded-lg border border-slate-200 bg-white text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F4C81]"
                    aria-label={`${activeStage.shortLabel} 안내 화면 크게 보기`}
                  >
                    <img
                      src={activeStage.imagePath}
                      alt={activeStage.imageAlt}
                      referrerPolicy="no-referrer"
                      onError={() =>
                        setImgErrorIds((prev) => ({ ...prev, [activeStage.id]: true }))
                      }
                      className="w-full h-auto max-h-[620px] object-contain mx-auto transition-transform duration-200 group-hover:scale-[1.01]"
                    />
                  </button>
                )}
              </div>

              <div className="border-t border-slate-200 bg-white px-4 py-2.5 text-xs text-slate-500">
                이미지를 클릭하면 원본 크기로 확대되어 빨간 번호 위치를 자세히 볼 수 있습니다.
              </div>
            </div>
          </div>

          {/* Right Zone: Field-by-field instructions */}
          <div className="lg:col-span-7 space-y-4">
            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <div className="text-xs font-semibold text-slate-500">
                {activeStage.stepNumber} · {activeStage.markersSummary}
              </div>
              <h3 className="mt-1 text-lg font-bold text-slate-900 sm:text-xl">
                {activeStage.title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
                {activeStage.subtitle}
              </p>

              <div className="mt-5 divide-y divide-slate-200 border-t border-slate-200">
                {activeStage.items.map((item) => {
                  const isHighlighted = highlightedMarker === item.marker;
                  return (
                    <div
                      key={item.marker}
                      id={`guide-item-${item.marker}`}
                      onClick={() => setHighlightedMarker(item.marker)}
                      className={`py-4 first:pt-4 last:pb-1 transition-colors rounded-md ${
                        isHighlighted ? 'bg-sky-50/60 -mx-3 px-3' : ''
                      }`}
                    >
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <div className="flex items-start gap-2.5">
                          <span
                            className={`inline-flex min-w-[28px] h-7 items-center justify-center rounded-full px-2 text-xs font-bold shrink-0 ${
                              isHighlighted
                                ? 'bg-red-600 text-white'
                                : 'bg-red-50 text-red-700 border border-red-200'
                            }`}
                          >
                            {item.marker}
                          </span>
                          <div>
                            <h4 className="text-sm font-bold text-slate-900 sm:text-base">
                              {item.title}
                            </h4>
                            <div className="mt-0.5 text-xs text-slate-500">
                              <span>화면 표기: {item.tdacLabel}</span>
                              <span className="mx-1.5" aria-hidden="true">
                                ·
                              </span>
                              <span>{item.required ? '필수 입력' : '선택 사항'}</span>
                            </div>
                          </div>
                        </div>

                        {item.copyableValue && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCopy(item.copyableValue!, `item-${item.marker}`);
                            }}
                            className="inline-flex items-center gap-1.5 rounded-md border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors whitespace-nowrap shrink-0 min-h-[32px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F4C81]"
                          >
                            {copiedId === `item-${item.marker}` ? (
                              <>
                                <Check className="h-3.5 w-3.5 text-emerald-600" aria-hidden="true" />
                                <span>복사됨</span>
                              </>
                            ) : (
                              <>
                                <Copy className="h-3.5 w-3.5 text-slate-400" aria-hidden="true" />
                                <span className="font-mono-code">{item.copyableValue}</span>
                              </>
                            )}
                          </button>
                        )}
                      </div>

                      <p className="mt-2.5 pl-9 text-sm leading-relaxed text-slate-700">
                        {item.description}
                      </p>

                      {item.exampleValue && !item.copyableValue && (
                        <div className="mt-2 pl-9 text-xs text-slate-600">
                          <span className="font-semibold text-slate-700">입력 예시:</span>{' '}
                          <span className="font-mono-code text-slate-900">
                            {item.exampleValue}
                          </span>
                        </div>
                      )}

                      {item.tip && (
                        <div className="mt-2.5 ml-9 flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50/70 px-3 py-2 text-xs leading-relaxed text-amber-900">
                          <AlertCircle
                            className="mt-0.5 h-3.5 w-3.5 text-amber-700 shrink-0"
                            aria-hidden="true"
                          />
                          <span>{item.tip}</span>
                        </div>
                      )}

                      {/* Inline occupation reference table for item ⑧ */}
                      {item.marker === '⑧' && (
                        <div className="mt-3 ml-9 rounded-lg border border-slate-200 bg-slate-50 p-3.5">
                          <div className="text-xs font-bold text-slate-800">
                            자주 쓰는 직업 영문 표기 (클릭하면 복사됩니다)
                          </div>
                          <div className="mt-2.5 grid grid-cols-2 gap-2 sm:grid-cols-4">
                            {OCCUPATION_EXAMPLES.map((occ) => {
                              const copyKey = `occ-${occ.en}`;
                              return (
                                <button
                                  key={occ.en}
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleCopy(occ.en, copyKey);
                                  }}
                                  className="flex flex-col items-start rounded-md border border-slate-200 bg-white px-2.5 py-2 text-left hover:border-[#0F4C81] hover:bg-sky-50/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F4C81]"
                                >
                                  <span className="text-xs font-medium text-slate-500">
                                    {occ.ko}
                                  </span>
                                  <span className="mt-0.5 font-mono-code text-xs font-bold text-slate-900 flex items-center gap-1">
                                    {occ.en}
                                    {copiedId === copyKey && (
                                      <Check
                                        className="h-3 w-3 text-emerald-600 shrink-0"
                                        aria-hidden="true"
                                      />
                                    )}
                                  </span>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Stage Prev / Next Controls */}
            <div className="flex items-center justify-between gap-4">
              <button
                type="button"
                disabled={activeStageIndex === 0}
                onClick={() => handleStageChange(GUIDE_STAGES[activeStageIndex - 1])}
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors whitespace-nowrap min-h-[42px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F4C81]"
              >
                <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                <span>이전 단계</span>
              </button>

              <div className="text-xs font-medium text-slate-500 tabular-nums">
                {activeStageIndex + 1} / {GUIDE_STAGES.length} 단계
              </div>

              <button
                type="button"
                disabled={activeStageIndex === GUIDE_STAGES.length - 1}
                onClick={() => handleStageChange(GUIDE_STAGES[activeStageIndex + 1])}
                className="inline-flex items-center gap-1.5 rounded-lg bg-[#0F4C81] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#0B3A63] disabled:opacity-40 disabled:cursor-not-allowed transition-colors whitespace-nowrap min-h-[42px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F4C81] focus-visible:ring-offset-2"
              >
                <span>다음 단계</span>
                <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <ImageLightbox
        isOpen={lightboxOpen}
        imagePath={activeStage.imagePath}
        imageAlt={activeStage.imageAlt}
        title={`${activeStage.stepNumber}. ${activeStage.shortLabel} (${activeStage.markersSummary})`}
        subtitle={activeStage.title}
        onClose={() => setLightboxOpen(false)}
      />
    </section>
  );
}
