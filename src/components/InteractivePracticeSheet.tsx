import { useEffect, useState } from 'react';
import {
  AlertTriangle,
  Check,
  CheckSquare,
  Copy,
  Plus,
  RotateCcw,
  Square,
  Trash2,
  UserCheck,
  Users,
} from 'lucide-react';
import {
  ACCOMMODATION_PRESETS,
  OCCUPATION_EXAMPLES,
  OFFICIAL_TDAC_URL,
} from '../data/tdacGuideData';

interface TravelerDraft {
  id: string;
  lastName: string;
  firstName: string;
  passportNo: string;
  nationality: string;
  birthYear: string;
  birthMonth: string;
  birthDay: string;
  occupation: string;
  gender: 'MALE' | 'FEMALE';
  residenceCountry: string;
  residenceCity: string;
  phoneCountryCode: string;
  phoneNumber: string;
  arrivalDate: string;
  boardingCountry: string;
  purpose: string;
  travelMode: 'AIR' | 'LAND' | 'SEA';
  transportType: string;
  flightNo: string;
  departureDate: string;
  accommodationType: string;
  province: string;
  district: string;
  subDistrict: string;
  postalCode: string;
  address: string;
  recentCountries: string;
  email: string;
}

const STORAGE_KEY = 'tdac_helper_travelers_v1';

function createEmptyTraveler(index: number): TravelerDraft {
  return {
    id: `traveler-${Date.now()}-${index}`,
    lastName: '',
    firstName: '',
    passportNo: '',
    nationality: 'KOR : SOUTH KOREAN',
    birthYear: '',
    birthMonth: '',
    birthDay: '',
    occupation: 'OFFICE WORKER',
    gender: 'MALE',
    residenceCountry: 'REPUBLIC OF KOREA',
    residenceCity: 'SEOUL',
    phoneCountryCode: '82',
    phoneNumber: '',
    arrivalDate: '',
    boardingCountry: 'REPUBLIC OF KOREA',
    purpose: 'HOLIDAY',
    travelMode: 'AIR',
    transportType: 'COMMERCIAL FLIGHT',
    flightNo: '',
    departureDate: '',
    accommodationType: 'HOTEL',
    province: '',
    district: '',
    subDistrict: '',
    postalCode: '',
    address: '',
    recentCountries: 'REPUBLIC OF KOREA',
    email: '',
  };
}

function hasHangul(value: string): boolean {
  return /[ㄱ-ㅎㅏ-ㅣ가-힣]/.test(value);
}

const CHECKLIST_ITEMS = [
  {
    id: 'window',
    label: '태국 도착일 기준 3일(72시간) 이내에 접속했나요?',
    detail: '입국 72시간 이전에는 도착 날짜 선택이 되지 않습니다.',
  },
  {
    id: 'passport',
    label: '성(Last Name)·이름(First Name)·여권번호가 여권과 100% 일치하나요?',
    detail: '미들네임과 비자 번호(무비자 관광 시)는 공란으로 두세요.',
  },
  {
    id: 'province',
    label: '파타야(CHON BURI), 후아힌(PRACHUAP KHIRI KHAN) 등 숙소 도/주를 정확히 골랐나요?',
    detail: '구글 지도 영문 주소에서 우편번호 바로 앞 첫 번째 지명이 도/주입니다.',
  },
  {
    id: 'qr',
    label: '제출 완료 후 발급된 QR코드를 스마트폰에 저장하거나 출력했나요?',
    detail: '이메일로도 발송되지만 공항 와이파이 불안정에 대비해 화면 캡처 저장을 권장합니다.',
  },
];

export function InteractivePracticeSheet() {
  const [travelers, setTravelers] = useState<TravelerDraft[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // Ignore storage errors
    }
    return [createEmptyTraveler(1)];
  });

  const [activeIndex, setActiveIndex] = useState(0);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [checkedIds, setCheckedIds] = useState<Record<string, boolean>>({});
  const [syncNotice, setSyncNotice] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(travelers));
    } catch {
      // Ignore storage quota errors
    }
  }, [travelers]);

  const current = travelers[activeIndex] || travelers[0];

  const updateField = <K extends keyof TravelerDraft>(
    field: K,
    value: TravelerDraft[K],
    forceUppercase = true
  ) => {
    const nextValue =
      forceUppercase && typeof value === 'string' ? (value.toUpperCase() as TravelerDraft[K]) : value;
    setTravelers((prev) =>
      prev.map((t, idx) => (idx === activeIndex ? { ...t, [field]: nextValue } : t))
    );
  };

  const applyPresetCity = (cityId: 'bangkok' | 'pattaya') => {
    const preset = ACCOMMODATION_PRESETS.find((p) => p.id === cityId);
    if (!preset) return;
    setTravelers((prev) =>
      prev.map((t, idx) =>
        idx === activeIndex
          ? {
              ...t,
              accommodationType: 'HOTEL',
              province: preset.province,
              district: preset.district,
              subDistrict: preset.subDistrict,
              postalCode: preset.postalCode,
              address: preset.address.toUpperCase(),
            }
          : t
      )
    );
  };

  const handleAddTraveler = () => {
    const nextList = [...travelers, createEmptyTraveler(travelers.length + 1)];
    setTravelers(nextList);
    setActiveIndex(nextList.length - 1);
  };

  const handleRemoveTraveler = (idxToRemove: number) => {
    if (travelers.length <= 1) return;
    const nextList = travelers.filter((_, idx) => idx !== idxToRemove);
    setTravelers(nextList);
    setActiveIndex((prev) => Math.max(0, Math.min(prev, nextList.length - 1)));
  };

  const handleCopyFromFirstTraveler = () => {
    if (activeIndex === 0 || travelers.length < 2) return;
    const first = travelers[0];
    setTravelers((prev) =>
      prev.map((t, idx) =>
        idx === activeIndex
          ? {
              ...t,
              arrivalDate: first.arrivalDate,
              boardingCountry: first.boardingCountry,
              purpose: first.purpose,
              travelMode: first.travelMode,
              transportType: first.transportType,
              flightNo: first.flightNo,
              departureDate: first.departureDate,
              accommodationType: first.accommodationType,
              province: first.province,
              district: first.district,
              subDistrict: first.subDistrict,
              postalCode: first.postalCode,
              address: first.address,
              recentCountries: first.recentCountries,
            }
          : t
      )
    );
    setSyncNotice('⑭-1 여행자 1의 여행·숙박·체류국 정보가 일괄 적용되었습니다.');
    setTimeout(() => setSyncNotice(null), 3000);
  };

  const handleReset = () => {
    const fresh = [createEmptyTraveler(1)];
    setTravelers(fresh);
    setActiveIndex(0);
    setCheckedIds({});
  };

  const handleCopyText = async (text: string, key: string) => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey((prev) => (prev === key ? null : prev)), 1800);
    } catch {
      // Ignore clipboard failure
    }
  };

  const handleCopyAllSummary = () => {
    const birth = [current.birthYear, current.birthMonth, current.birthDay]
      .filter(Boolean)
      .join('/');
    const lines = [
      `[태국 TDAC 사전 작성 시트 - 여행자 ${activeIndex + 1}]`,
      `③ 성(Last Name): ${current.lastName || '-'}`,
      `④ 이름(First Name): ${current.firstName || '-'}`,
      `⑤ 여권번호: ${current.passportNo || '-'}`,
      `⑥ 국적: ${current.nationality}`,
      `⑦ 생년월일: ${birth || '-'}`,
      `⑧ 직업: ${current.occupation || '-'}`,
      `⑨ 성별: ${current.gender}`,
      `⑪ 거주국: ${current.residenceCountry}`,
      `⑫ 거주 도시: ${current.residenceCity || '-'}`,
      `⑬ 휴대폰: +${current.phoneCountryCode} ${current.phoneNumber || '-'}`,
      `⑭ 도착일: ${current.arrivalDate || '-'}`,
      `⑮ 탑승국: ${current.boardingCountry}`,
      `⑯ 목적: ${current.purpose}`,
      `⑰~⑲ 항공편: ${current.travelMode} / ${current.transportType} / ${current.flightNo || '-'}`,
      `㉑~㉕ 숙소: ${current.accommodationType} | ${current.province || '-'} / ${current.district || '-'} / ${current.subDistrict || '-'} (${current.postalCode || '-'}) | ${current.address || '-'}`,
      `㉖ 2주 체류국: ${current.recentCountries}`,
      `㉙ 이메일: ${current.email || '-'}`,
    ];
    handleCopyText(lines.join('\n'), 'copy-all');
  };

  const anyHangulWarning =
    hasHangul(current.lastName) ||
    hasHangul(current.firstName) ||
    hasHangul(current.occupation) ||
    hasHangul(current.residenceCity) ||
    hasHangul(current.flightNo) ||
    hasHangul(current.address);

  const completedChecks = CHECKLIST_ITEMS.filter((item) => checkedIds[item.id]).length;

  return (
    <section id="practice-sheet" className="bg-[#F8FAFC] py-12 lg:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <div className="text-xs font-semibold text-[#0F4C81]">
              사전 작성 & 대문자 자동 변환 · 개인 정보는 내 기기에만 저장됩니다
            </div>
            <h2 className="mt-1.5 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl text-balance">
              TDAC 사전 작성 & 복사용 입력 도우미
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base">
              실제 사이트에 접속하기 전에 영문 이름·여권번호·숙소 정보를 미리 정리해 두세요. 소문자로 입력해도 TDAC와 동일하게 <strong className="font-semibold text-slate-900">자동으로 대문자</strong>로 변환됩니다.
            </p>
          </div>

          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 self-start sm:self-auto rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors whitespace-nowrap shrink-0 min-h-[40px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F4C81]"
          >
            <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
            <span>입력 초기화</span>
          </button>
        </div>

        {/* Traveler Switcher (Simulates ㉗ Add Traveler & ⑭-1 Same as Previous) */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white p-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2 text-xs font-semibold text-slate-500">
              <Users className="h-4 w-4 text-[#0F4C81]" aria-hidden="true" />
              <span>여행자 목록 (㉗):</span>
            </span>
            {travelers.map((t, idx) => {
              const isSelected = idx === activeIndex;
              const displayName =
                t.lastName || t.firstName
                  ? `${t.lastName} ${t.firstName}`.trim()
                  : `여행자 ${idx + 1}`;
              return (
                <div key={t.id} className="inline-flex items-center">
                  <button
                    type="button"
                    onClick={() => setActiveIndex(idx)}
                    className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap min-h-[36px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F4C81] ${
                      isSelected
                        ? 'bg-[#0F4C81] text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {displayName}
                  </button>
                  {travelers.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveTraveler(idx)}
                      aria-label={`${displayName} 삭제`}
                      className="ml-1 inline-flex h-8 w-8 items-center justify-center rounded-md text-slate-400 hover:bg-red-50 hover:text-red-600 transition-colors"
                    >
                      <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                    </button>
                  )}
                </div>
              );
            })}
          </div>

          <button
            type="button"
            onClick={handleAddTraveler}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-slate-50 px-3.5 py-2 text-xs font-semibold text-slate-800 hover:bg-slate-100 transition-colors whitespace-nowrap shrink-0 min-h-[36px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F4C81]"
          >
            <Plus className="h-3.5 w-3.5" aria-hidden="true" />
            <span>㉗ 다른 여행자 추가하기</span>
          </button>
        </div>

        {anyHangulWarning && (
          <div className="mt-4 flex items-center gap-2.5 rounded-lg border border-amber-300 bg-amber-50 px-4 py-3 text-xs sm:text-sm text-amber-900">
            <AlertTriangle className="h-4 w-4 text-amber-700 shrink-0" aria-hidden="true" />
            <span>
              한글이 포함되어 있습니다. 실제 TDAC 사이트에서는 모든 항목을 <strong>영문(A-Z)</strong>으로만 입력해야 합니다.
            </span>
          </div>
        )}

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-start">
          {/* Left Form Column */}
          <div className="lg:col-span-7 space-y-5">
            {/* Step 1 Card */}
            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <h3 className="text-base font-bold text-slate-900 border-b border-slate-200 pb-3">
                1단계. 개인 정보 (③ ~ ⑬)
              </h3>

              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="draft-lastName" className="block text-xs font-semibold text-slate-700">
                    ③ 성 (영문 Last Name)
                  </label>
                  <input
                    id="draft-lastName"
                    type="text"
                    placeholder="예: TAE 또는 HONG"
                    value={current.lastName}
                    onChange={(e) => updateField('lastName', e.target.value)}
                    className="mt-1.5 w-full rounded-lg border border-slate-300 px-3 py-2 font-mono-code text-sm text-slate-900 focus:border-[#0F4C81] focus:outline-none focus:ring-2 focus:ring-[#0F4C81]/20 min-h-[42px]"
                  />
                </div>

                <div>
                  <label htmlFor="draft-firstName" className="block text-xs font-semibold text-slate-700">
                    ④ 이름 (영문 First Name)
                  </label>
                  <input
                    id="draft-firstName"
                    type="text"
                    placeholder="예: SARANG 또는 GILDONG"
                    value={current.firstName}
                    onChange={(e) => updateField('firstName', e.target.value)}
                    className="mt-1.5 w-full rounded-lg border border-slate-300 px-3 py-2 font-mono-code text-sm text-slate-900 focus:border-[#0F4C81] focus:outline-none focus:ring-2 focus:ring-[#0F4C81]/20 min-h-[42px]"
                  />
                </div>

                <div>
                  <label htmlFor="draft-passportNo" className="block text-xs font-semibold text-slate-700">
                    ⑤ 여권번호 (화면 표기: 여행 번호)
                  </label>
                  <input
                    id="draft-passportNo"
                    type="text"
                    placeholder="예: M123A5678"
                    value={current.passportNo}
                    onChange={(e) => updateField('passportNo', e.target.value)}
                    className="mt-1.5 w-full rounded-lg border border-slate-300 px-3 py-2 font-mono-code text-sm text-slate-900 focus:border-[#0F4C81] focus:outline-none focus:ring-2 focus:ring-[#0F4C81]/20 min-h-[42px]"
                  />
                </div>

                <div>
                  <label htmlFor="draft-gender" className="block text-xs font-semibold text-slate-700">
                    ⑨ 성별
                  </label>
                  <select
                    id="draft-gender"
                    value={current.gender}
                    onChange={(e) => updateField('gender', e.target.value as 'MALE' | 'FEMALE', false)}
                    className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 font-mono-code text-sm text-slate-900 focus:border-[#0F4C81] focus:outline-none focus:ring-2 focus:ring-[#0F4C81]/20 min-h-[42px]"
                  >
                    <option value="MALE">MALE (남성)</option>
                    <option value="FEMALE">FEMALE (여성)</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <span className="block text-xs font-semibold text-slate-700">
                    ⑦ 생년월일 (년 / 월 / 일 순)
                  </span>
                  <div className="mt-1.5 grid grid-cols-3 gap-2">
                    <input
                      type="text"
                      inputMode="numeric"
                      maxLength={4}
                      placeholder="년 (1999)"
                      aria-label="생년월일 년"
                      value={current.birthYear}
                      onChange={(e) => updateField('birthYear', e.target.value.replace(/\D/g, ''), false)}
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 font-mono-code text-sm text-slate-900 focus:border-[#0F4C81] focus:outline-none focus:ring-2 focus:ring-[#0F4C81]/20 min-h-[42px]"
                    />
                    <input
                      type="text"
                      inputMode="numeric"
                      maxLength={2}
                      placeholder="월 (06)"
                      aria-label="생년월일 월"
                      value={current.birthMonth}
                      onChange={(e) => updateField('birthMonth', e.target.value.replace(/\D/g, ''), false)}
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 font-mono-code text-sm text-slate-900 focus:border-[#0F4C81] focus:outline-none focus:ring-2 focus:ring-[#0F4C81]/20 min-h-[42px]"
                    />
                    <input
                      type="text"
                      inputMode="numeric"
                      maxLength={2}
                      placeholder="일 (09)"
                      aria-label="생년월일 일"
                      value={current.birthDay}
                      onChange={(e) => updateField('birthDay', e.target.value.replace(/\D/g, ''), false)}
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 font-mono-code text-sm text-slate-900 focus:border-[#0F4C81] focus:outline-none focus:ring-2 focus:ring-[#0F4C81]/20 min-h-[42px]"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="draft-occupation" className="block text-xs font-semibold text-slate-700">
                    ⑧ 직업 (영문)
                  </label>
                  <input
                    id="draft-occupation"
                    type="text"
                    placeholder="예: OFFICE WORKER"
                    value={current.occupation}
                    onChange={(e) => updateField('occupation', e.target.value)}
                    className="mt-1.5 w-full rounded-lg border border-slate-300 px-3 py-2 font-mono-code text-sm text-slate-900 focus:border-[#0F4C81] focus:outline-none focus:ring-2 focus:ring-[#0F4C81]/20 min-h-[42px]"
                  />
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {OCCUPATION_EXAMPLES.map((occ) => (
                      <button
                        key={occ.en}
                        type="button"
                        onClick={() => updateField('occupation', occ.en)}
                        className={`rounded-md border px-2 py-1 text-xs font-medium transition-colors ${
                          current.occupation === occ.en
                            ? 'border-[#0F4C81] bg-sky-50 text-[#0F4C81] font-semibold'
                            : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        {occ.ko} ({occ.en})
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label htmlFor="draft-city" className="block text-xs font-semibold text-slate-700">
                    ⑫ 거주국 시·도 (SEOUL, BUSAN 등)
                  </label>
                  <input
                    id="draft-city"
                    type="text"
                    placeholder="예: SEOUL"
                    value={current.residenceCity}
                    onChange={(e) => updateField('residenceCity', e.target.value)}
                    className="mt-1.5 w-full rounded-lg border border-slate-300 px-3 py-2 font-mono-code text-sm text-slate-900 focus:border-[#0F4C81] focus:outline-none focus:ring-2 focus:ring-[#0F4C81]/20 min-h-[42px]"
                  />
                </div>

                <div>
                  <label htmlFor="draft-phone" className="block text-xs font-semibold text-slate-700">
                    ⑬ 휴대폰번호 (+82 뒤 번호)
                  </label>
                  <div className="mt-1.5 flex items-center gap-2">
                    <span className="inline-flex h-[42px] items-center rounded-lg border border-slate-200 bg-slate-50 px-3 font-mono-code text-sm text-slate-600">
                      +82
                    </span>
                    <input
                      id="draft-phone"
                      type="tel"
                      placeholder="1012345678"
                      value={current.phoneNumber}
                      onChange={(e) => updateField('phoneNumber', e.target.value.replace(/[^\d]/g, ''), false)}
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 font-mono-code text-sm text-slate-900 focus:border-[#0F4C81] focus:outline-none focus:ring-2 focus:ring-[#0F4C81]/20 min-h-[42px]"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2 Card */}
            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-3">
                <h3 className="text-base font-bold text-slate-900">
                  2단계. 여행 및 숙박 정보 (⑭-1, ⑭ ~ ㉕)
                </h3>

                {activeIndex > 0 && (
                  <button
                    type="button"
                    onClick={handleCopyFromFirstTraveler}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-sky-50 border border-sky-200 px-3 py-1.5 text-xs font-semibold text-[#0F4C81] hover:bg-sky-100 transition-colors"
                  >
                    <UserCheck className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>⑭-1 이전 여행자(여행자 1) 정보 불러오기</span>
                  </button>
                )}
              </div>

              {syncNotice && (
                <div className="mt-3 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-800">
                  {syncNotice}
                </div>
              )}

              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="draft-arrivalDate" className="block text-xs font-semibold text-slate-700">
                    ⑭ 태국 도착 날짜 (탑승일 아님)
                  </label>
                  <input
                    id="draft-arrivalDate"
                    type="date"
                    value={current.arrivalDate}
                    onChange={(e) => updateField('arrivalDate', e.target.value, false)}
                    className="mt-1.5 w-full rounded-lg border border-slate-300 px-3 py-2 font-mono-code text-sm text-slate-900 focus:border-[#0F4C81] focus:outline-none focus:ring-2 focus:ring-[#0F4C81]/20 min-h-[42px]"
                  />
                </div>

                <div>
                  <label htmlFor="draft-flightNo" className="block text-xs font-semibold text-slate-700">
                    ⑲ 태국 도착 항공편명
                  </label>
                  <input
                    id="draft-flightNo"
                    type="text"
                    placeholder="예: KE651, TG657"
                    value={current.flightNo}
                    onChange={(e) => updateField('flightNo', e.target.value)}
                    className="mt-1.5 w-full rounded-lg border border-slate-300 px-3 py-2 font-mono-code text-sm text-slate-900 focus:border-[#0F4C81] focus:outline-none focus:ring-2 focus:ring-[#0F4C81]/20 min-h-[42px]"
                  />
                </div>

                <div className="sm:col-span-2 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-3">
                  <span className="text-xs font-bold text-slate-800">
                    ㉑ ~ ㉕ 숙소 정보 예시 채우기
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => applyPresetCity('bangkok')}
                      className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
                    >
                      방콕 예시 적용
                    </button>
                    <button
                      type="button"
                      onClick={() => applyPresetCity('pattaya')}
                      className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
                    >
                      파타야 예시 적용
                    </button>
                  </div>
                </div>

                <div>
                  <label htmlFor="draft-province" className="block text-xs font-semibold text-slate-700">
                    ㉒ 도,주 (Province)
                  </label>
                  <input
                    id="draft-province"
                    type="text"
                    placeholder="예: BANGKOK 또는 CHON BURI"
                    value={current.province}
                    onChange={(e) => updateField('province', e.target.value)}
                    className="mt-1.5 w-full rounded-lg border border-slate-300 px-3 py-2 font-mono-code text-sm text-slate-900 focus:border-[#0F4C81] focus:outline-none focus:ring-2 focus:ring-[#0F4C81]/20 min-h-[42px]"
                  />
                </div>

                <div>
                  <label htmlFor="draft-district" className="block text-xs font-semibold text-slate-700">
                    ㉓ 지구, 특별구 (District)
                  </label>
                  <input
                    id="draft-district"
                    type="text"
                    placeholder="예: PHRA NAKHON 또는 BANG LAMUNG"
                    value={current.district}
                    onChange={(e) => updateField('district', e.target.value)}
                    className="mt-1.5 w-full rounded-lg border border-slate-300 px-3 py-2 font-mono-code text-sm text-slate-900 focus:border-[#0F4C81] focus:outline-none focus:ring-2 focus:ring-[#0F4C81]/20 min-h-[42px]"
                  />
                </div>

                <div>
                  <label htmlFor="draft-subDistrict" className="block text-xs font-semibold text-slate-700">
                    ㉔ 세부 지역 (Sub-district)
                  </label>
                  <input
                    id="draft-subDistrict"
                    type="text"
                    placeholder="예: CHANA SONGKHRAM"
                    value={current.subDistrict}
                    onChange={(e) => updateField('subDistrict', e.target.value)}
                    className="mt-1.5 w-full rounded-lg border border-slate-300 px-3 py-2 font-mono-code text-sm text-slate-900 focus:border-[#0F4C81] focus:outline-none focus:ring-2 focus:ring-[#0F4C81]/20 min-h-[42px]"
                  />
                </div>

                <div>
                  <label htmlFor="draft-postalCode" className="block text-xs font-semibold text-slate-700">
                    우편번호 (5자리)
                  </label>
                  <input
                    id="draft-postalCode"
                    type="text"
                    inputMode="numeric"
                    maxLength={5}
                    placeholder="예: 10200 또는 20150"
                    value={current.postalCode}
                    onChange={(e) => updateField('postalCode', e.target.value.replace(/\D/g, ''), false)}
                    className="mt-1.5 w-full rounded-lg border border-slate-300 px-3 py-2 font-mono-code text-sm text-slate-900 focus:border-[#0F4C81] focus:outline-none focus:ring-2 focus:ring-[#0F4C81]/20 min-h-[42px]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="draft-address" className="block text-xs font-semibold text-slate-700">
                    ㉕ 숙소 상세 주소 (호텔명 + 영문 도로명)
                  </label>
                  <input
                    id="draft-address"
                    type="text"
                    placeholder="예: NEW SIAM II, 50 PHRA ATHIT RD"
                    value={current.address}
                    onChange={(e) => updateField('address', e.target.value)}
                    className="mt-1.5 w-full rounded-lg border border-slate-300 px-3 py-2 font-mono-code text-sm text-slate-900 focus:border-[#0F4C81] focus:outline-none focus:ring-2 focus:ring-[#0F4C81]/20 min-h-[42px]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="draft-email" className="block text-xs font-semibold text-slate-700">
                    ㉙ QR코드 수령 이메일
                  </label>
                  <input
                    id="draft-email"
                    type="email"
                    placeholder="예: TRAVELER@EXAMPLE.COM"
                    value={current.email}
                    onChange={(e) => updateField('email', e.target.value)}
                    className="mt-1.5 w-full rounded-lg border border-slate-300 px-3 py-2 font-mono-code text-sm text-slate-900 focus:border-[#0F4C81] focus:outline-none focus:ring-2 focus:ring-[#0F4C81]/20 min-h-[42px]"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Summary & Checklist Column */}
          <div className="lg:col-span-5 space-y-5">
            {/* Copy-Ready Sheet */}
            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <div className="flex items-center justify-between gap-2 border-b border-slate-200 pb-3">
                <div>
                  <div className="text-xs font-semibold text-[#0F4C81]">
                    실제 TDAC 붙여넣기용 요약
                  </div>
                  <h3 className="text-base font-bold text-slate-900">
                    여행자 {activeIndex + 1} 복사용 시트
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={handleCopyAllSummary}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-[#0F4C81] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#0B3A63] transition-colors whitespace-nowrap shrink-0 min-h-[34px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F4C81]"
                >
                  {copiedKey === 'copy-all' ? (
                    <>
                      <Check className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>전체 복사됨</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>전체 복사</span>
                    </>
                  )}
                </button>
              </div>

              <div className="mt-3 divide-y divide-slate-100 text-xs sm:text-sm">
                {[
                  { label: '③ 성', value: current.lastName },
                  { label: '④ 이름', value: current.firstName },
                  { label: '⑤ 여권번호', value: current.passportNo },
                  { label: '⑥ 국적', value: current.nationality },
                  { label: '⑧ 직업', value: current.occupation },
                  { label: '⑫ 거주 도시', value: current.residenceCity },
                  {
                    label: '⑬ 휴대폰',
                    value: current.phoneNumber ? `${current.phoneNumber}` : '',
                  },
                  { label: '⑲ 항공편명', value: current.flightNo },
                  { label: '㉒ 도,주', value: current.province },
                  { label: '㉕ 상세 주소', value: current.address },
                  { label: '㉙ 이메일', value: current.email },
                ].map((row) => (
                  <div
                    key={row.label}
                    className="flex items-center justify-between gap-3 py-2.5"
                  >
                    <span className="text-slate-500 font-medium shrink-0">{row.label}</span>
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="truncate font-mono-code font-semibold text-slate-900">
                        {row.value || '미입력'}
                      </span>
                      {row.value && (
                        <button
                          type="button"
                          onClick={() => handleCopyText(row.value, `sum-${row.label}`)}
                          aria-label={`${row.label} 복사`}
                          className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded border border-slate-200 bg-slate-50 text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                        >
                          {copiedKey === `sum-${row.label}` ? (
                            <Check className="h-3.5 w-3.5 text-emerald-600" aria-hidden="true" />
                          ) : (
                            <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200">
                <a
                  href={OFFICIAL_TDAC_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center rounded-lg border border-[#0F4C81] bg-sky-50/50 px-4 py-2.5 text-xs font-bold text-[#0F4C81] hover:bg-sky-100/70 transition-colors min-h-[42px]"
                >
                  준비된 정보로 TDAC 공식 사이트 바로 작성하기 ↗
                </a>
              </div>
            </div>

            {/* Pre-departure Checklist */}
            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <div className="flex items-center justify-between gap-2 border-b border-slate-200 pb-3">
                <h3 className="text-base font-bold text-slate-900">
                  제출 · 출국 전 필수 확인사항
                </h3>
                <span className="font-mono-code text-xs font-semibold text-[#0F4C81] tabular-nums">
                  {completedChecks} / {CHECKLIST_ITEMS.length}
                </span>
              </div>

              <div className="mt-3 space-y-2.5">
                {CHECKLIST_ITEMS.map((item) => {
                  const checked = Boolean(checkedIds[item.id]);
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() =>
                        setCheckedIds((prev) => ({ ...prev, [item.id]: !prev[item.id] }))
                      }
                      className={`flex w-full items-start gap-2.5 rounded-lg border p-3 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F4C81] ${
                        checked
                          ? 'border-emerald-200 bg-emerald-50/60'
                          : 'border-slate-200 bg-slate-50/60 hover:bg-slate-100/70'
                      }`}
                    >
                      {checked ? (
                        <CheckSquare
                          className="mt-0.5 h-4 w-4 text-emerald-700 shrink-0"
                          aria-hidden="true"
                        />
                      ) : (
                        <Square
                          className="mt-0.5 h-4 w-4 text-slate-400 shrink-0"
                          aria-hidden="true"
                        />
                      )}
                      <div>
                        <div
                          className={`text-xs font-bold sm:text-sm ${
                            checked ? 'text-emerald-950 line-through' : 'text-slate-900'
                          }`}
                        >
                          {item.label}
                        </div>
                        <div className="mt-0.5 text-xs leading-relaxed text-slate-600">
                          {item.detail}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
