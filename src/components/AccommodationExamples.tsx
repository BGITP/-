import { useState } from 'react';
import { Check, Copy, MapPin, ZoomIn, Info } from 'lucide-react';
import { ACCOMMODATION_PRESETS, type AccommodationPreset } from '../data/tdacGuideData';
import { ImageLightbox } from './ImageLightbox';

export function AccommodationExamples() {
  const [selectedCity, setSelectedCity] = useState<'pattaya' | 'bangkok'>('pattaya');
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [lightboxPreset, setLightboxPreset] = useState<AccommodationPreset | null>(null);

  const activePreset =
    ACCOMMODATION_PRESETS.find((p) => p.id === selectedCity) || ACCOMMODATION_PRESETS[1];

  const handleCopy = async (value: string, key: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedField(key);
      setTimeout(() => setCopiedField((prev) => (prev === key ? null : prev)), 1800);
    } catch {
      // Ignore clipboard error
    }
  };

  return (
    <section id="accommodation" className="border-b border-slate-200 bg-white py-12 lg:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <div className="text-xs font-semibold text-[#0F4C81]">
              숙소 행정구역 입력 안내 · ㉑ ~ ㉕
            </div>
            <h2 className="mt-1.5 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl text-balance">
              방콕 · 파타야 숙소 입력 예시 & 구글 지도 확인법
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base">
              파타야(<span className="font-mono-code font-medium">Chonburi</span>), 후아힌(<span className="font-mono-code font-medium">Prachuap Khiri Khan</span>)처럼 도시 이름과 상위 도/주(Province)가 다른 경우가 많으므로 구글 지도 영문 주소에서 <strong className="font-semibold text-slate-900">우편번호 바로 앞 첫 번째 지명</strong>을 확인해 입력하세요.
            </p>
          </div>

          {/* City Segmented Switcher */}
          <div className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-slate-100 p-1 self-start sm:self-auto shrink-0">
            <button
              type="button"
              onClick={() => setSelectedCity('pattaya')}
              className={`rounded-md px-3.5 py-2 text-xs font-semibold transition-colors whitespace-nowrap min-h-[36px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F4C81] ${
                selectedCity === 'pattaya'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              파타야 숙소 예시
            </button>
            <button
              type="button"
              onClick={() => setSelectedCity('bangkok')}
              className={`rounded-md px-3.5 py-2 text-xs font-semibold transition-colors whitespace-nowrap min-h-[36px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F4C81] ${
                selectedCity === 'bangkok'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              방콕 숙소 예시
            </button>
          </div>
        </div>

        {/* Google Maps Address Parsing Rule Box */}
        <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-5">
          <div className="flex items-start gap-3">
            <MapPin className="mt-0.5 h-5 w-5 text-[#0F4C81] shrink-0" aria-hidden="true" />
            <div className="min-w-0 flex-1">
              <div className="text-sm font-bold text-slate-900">
                구글 지도 영문 주소로 도/주(㉒) 찾는 요령
              </div>
              <p className="mt-1 text-sm text-slate-600">
                구글 검색 또는 구글 지도에서 내 호텔의 영문 주소를 확인한 뒤, 맨 끝 국가명·우편번호 바로 앞에 위치한 지명을 <strong className="font-semibold text-slate-900">㉒ 도,주</strong>에서 선택하면 됩니다.
              </p>

              <div className="mt-3 rounded-lg border border-slate-200 bg-white p-3.5 font-mono-code text-xs sm:text-sm leading-relaxed text-slate-700 overflow-x-auto">
                <span className="text-slate-500">예시)</span>{' '}
                <span>463/68 Pattaya Sai 1 Road, Nongprue, </span>
                <span className="rounded bg-sky-50 px-1.5 py-0.5 font-semibold text-[#0F4C81] border border-sky-200">
                  Banglamung (㉓ 지구)
                </span>
                <span>, </span>
                <span className="rounded bg-amber-50 px-1.5 py-0.5 font-semibold text-amber-900 border border-amber-200">
                  Chonburi (㉒ 도,주)
                </span>
                <span>, Pattaya, </span>
                <span className="rounded bg-slate-100 px-1.5 py-0.5 font-semibold text-slate-900 border border-slate-300">
                  20150 (우편번호)
                </span>
                <span> Thailand</span>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Example Detail Grid */}
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-stretch">
          {/* Left: Structured Field Breakdown Table */}
          <div className="lg:col-span-6 flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-5">
            <div>
              <div className="flex items-center justify-between gap-2 border-b border-slate-200 pb-3">
                <div>
                  <div className="text-xs font-semibold text-[#0F4C81]">
                    실제 입력값 대조표
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">
                    {activePreset.cityKo} 여행 고객님 입력 예시
                  </h3>
                </div>
              </div>

              <div className="mt-4 divide-y divide-slate-200">
                {[
                  { marker: '㉑', label: '태국의 숙박 유형', value: 'HOTEL' },
                  { marker: '㉒', label: '도,주 (Province)', value: activePreset.province },
                  { marker: '㉓', label: '지구, 특별구 (District)', value: activePreset.district },
                  { marker: '㉔', label: '세부 지역 (Sub-district)', value: activePreset.subDistrict },
                  { marker: '-', label: '우편번호 (Postal Code)', value: activePreset.postalCode },
                  { marker: '㉕', label: '상세 주소 (Address)', value: activePreset.address },
                ].map((row) => {
                  const key = `${activePreset.id}-${row.label}`;
                  return (
                    <div
                      key={key}
                      className="flex items-center justify-between gap-4 py-3 text-sm"
                    >
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="inline-flex w-6 justify-center text-xs font-bold text-red-700">
                          {row.marker}
                        </span>
                        <span className="font-medium text-slate-600">{row.label}</span>
                      </div>
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="truncate font-mono-code font-semibold text-slate-900 text-right">
                          {row.value}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleCopy(row.value, key)}
                          aria-label={`${row.label} 예시 복사`}
                          className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-slate-200 bg-slate-50 text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F4C81]"
                        >
                          {copiedField === key ? (
                            <Check className="h-3.5 w-3.5 text-emerald-600" aria-hidden="true" />
                          ) : (
                            <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-4 flex items-start gap-2 rounded-lg border border-slate-200 bg-slate-50 p-3 text-xs leading-relaxed text-slate-600">
              <Info className="mt-0.5 h-4 w-4 text-[#0F4C81] shrink-0" aria-hidden="true" />
              <span>{activePreset.note}</span>
            </div>
          </div>

          {/* Right: Screenshot Card */}
          <div className="lg:col-span-6 flex flex-col justify-between rounded-xl border border-slate-200 bg-slate-50 p-5">
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <div>
                  <div className="text-xs font-semibold text-slate-500">실제 TDAC 입력 화면 캡처</div>
                  <div className="text-sm font-bold text-slate-900">
                    {activePreset.cityKo} 숙소 입력 예시 화면
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setLightboxPreset(activePreset)}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors whitespace-nowrap shrink-0 min-h-[36px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F4C81]"
                >
                  <ZoomIn className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>크게 보기</span>
                </button>
              </div>

              <button
                type="button"
                onClick={() => setLightboxPreset(activePreset)}
                className="block w-full overflow-hidden rounded-lg border border-slate-200 bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F4C81]"
                aria-label={`${activePreset.cityKo} 숙소 입력 예시 이미지 확대`}
              >
                <img
                  src={activePreset.imagePath}
                  alt={activePreset.imageAlt}
                  referrerPolicy="no-referrer"
                  className="w-full h-auto max-h-[420px] object-contain mx-auto"
                />
              </button>
            </div>

            <div className="mt-4 border-t border-slate-200 pt-3 text-xs text-slate-500">
              주요 휴양지 참고: 푸껫(<span className="font-mono-code">PHUKET</span>), 치앙마이(<span className="font-mono-code">CHIANG MAI</span>), 끄라비(<span className="font-mono-code">KRABI</span>), 파타야(<span className="font-mono-code">CHON BURI</span>), 후아힌(<span className="font-mono-code">PRACHUAP KHIRI KHAN</span>)
            </div>
          </div>
        </div>
      </div>

      <ImageLightbox
        isOpen={Boolean(lightboxPreset)}
        imagePath={lightboxPreset?.imagePath || ''}
        imageAlt={lightboxPreset?.imageAlt || ''}
        title={lightboxPreset ? `${lightboxPreset.cityKo} 숙소 입력 예시` : ''}
        subtitle={lightboxPreset?.fullGoogleMapsSample}
        onClose={() => setLightboxPreset(null)}
      />
    </section>
  );
}
