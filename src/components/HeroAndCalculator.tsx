import { useMemo, useState } from 'react';
import {
  Calendar,
  Check,
  CheckCircle2,
  Clock,
  Copy,
  ExternalLink,
  AlertTriangle,
  Info,
} from 'lucide-react';
import { CUSTOMER_SHARE_URL, OFFICIAL_TDAC_URL } from '../data/tdacGuideData';

function formatKoreanDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
  const weekday = weekdays[date.getDay()];
  return `${year}.${month}.${day} (${weekday})`;
}

function getTodayInputString(): string {
  const now = new Date();
  now.setDate(now.getDate() + 2);
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function HeroAndCalculator() {
  const [arrivalDateStr, setArrivalDateStr] = useState<string>(getTodayInputString);
  const [copiedKey, setCopiedKey] = useState<'official' | 'share' | null>(null);

  const handleCopy = async (text: string, key: 'official' | 'share') => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey((prev) => (prev === key ? null : prev)), 2000);
    } catch {
      // Fallback ignored in restricted clipboard contexts
    }
  };

  const windowCalc = useMemo(() => {
    if (!arrivalDateStr) return null;
    const [y, m, d] = arrivalDateStr.split('-').map(Number);
    if (!y || !m || !d) return null;

    const arrival = new Date(y, m - 1, d);
    const openDate = new Date(y, m - 1, d);
    openDate.setDate(openDate.getDate() - 3);

    const today = new Date();
    const todayMidnight = new Date(today.getFullYear(), today.getMonth(), today.getDate());

    const diffMsFromOpen = openDate.getTime() - todayMidnight.getTime();
    const daysUntilOpen = Math.ceil(diffMsFromOpen / (1000 * 60 * 60 * 24));
    const diffMsFromArrival = arrival.getTime() - todayMidnight.getTime();
    const daysUntilArrival = Math.ceil(diffMsFromArrival / (1000 * 60 * 60 * 24));

    let status: 'open' | 'upcoming' | 'past' = 'upcoming';
    if (daysUntilArrival < 0) {
      status = 'past';
    } else if (daysUntilOpen <= 0) {
      status = 'open';
    } else {
      status = 'upcoming';
    }

    return {
      arrivalFormatted: formatKoreanDate(arrival),
      openFormatted: formatKoreanDate(openDate),
      daysUntilOpen,
      daysUntilArrival,
      status,
    };
  }, [arrivalDateStr]);

  return (
    <section id="overview" className="border-b border-slate-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:py-14">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-stretch">
          {/* Left column: Briefing & essential links */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-500">
                <span>2025년 5월 1일 의무 시행</span>
                <span aria-hidden="true">·</span>
                <span>입국 3일(72시간) 전부터 작성</span>
                <span aria-hidden="true">·</span>
                <span>PC·스마트폰 작성 가능</span>
              </div>

              <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl text-balance leading-tight">
                태국 전자입국카드 (TDAC) 작성 방법 완벽 가이드
              </h1>

              <p className="mt-4 text-base leading-relaxed text-slate-600 max-w-2xl">
                2025년 5월 1일부터 태국 입국 전{' '}
                <strong className="font-semibold text-slate-900">
                  태국 디지털 입국카드(Thailand Digital Arrival Card)
                </strong>
                를 반드시 작성해야 합니다. 아래 번호별 화면 안내를 따라 영문으로 입력하고, 발급된 QR코드를 저장해 입국 심사를 빠르게 통과하세요.
              </p>

              {/* Key facts list - clean hairline structure, no pill sandwiches or left-accent bars */}
              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="rounded-lg border border-slate-200 bg-slate-50/70 p-4">
                  <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                    <Clock className="h-4 w-4 text-[#0F4C81] shrink-0" aria-hidden="true" />
                    <span>작성 가능 기간</span>
                  </div>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
                    입국 3일(72시간) 전부터 태국 도착 후 입국 심사 전까지 작성할 수 있으며, 그 이전에는 날짜 선택이 되지 않습니다.
                  </p>
                </div>

                <div className="rounded-lg border border-slate-200 bg-slate-50/70 p-4">
                  <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                    <Info className="h-4 w-4 text-[#0F4C81] shrink-0" aria-hidden="true" />
                    <span>공항 도착 후 작성 시 주의</span>
                  </div>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
                    출발 전 미작성 시 태국 입국장 이미그레이션 앞 키오스크에서도 작성 가능하나, 입국 수속 대기 시간이 길어질 수 있습니다.
                  </p>
                </div>
              </div>
            </div>

            {/* Action & Link Copy Bar */}
            <div className="mt-6 rounded-lg border border-slate-200 bg-slate-50 p-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                  <div className="text-xs font-semibold text-slate-500">
                    TDAC 공식 작성 사이트
                  </div>
                  <div className="mt-0.5 truncate font-mono-code text-sm font-medium text-slate-900">
                    {OFFICIAL_TDAC_URL}
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => handleCopy(OFFICIAL_TDAC_URL, 'official')}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors whitespace-nowrap min-h-[40px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F4C81]"
                  >
                    {copiedKey === 'official' ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-600" aria-hidden="true" />
                        <span>복사됨</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5 text-slate-500" aria-hidden="true" />
                        <span>주소 복사</span>
                      </>
                    )}
                  </button>
                  <a
                    href={OFFICIAL_TDAC_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg bg-[#0F4C81] px-4 py-2 text-xs font-semibold text-white hover:bg-[#0B3A63] transition-colors whitespace-nowrap min-h-[40px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F4C81] focus-visible:ring-offset-2"
                  >
                    <span>작성 시작하기</span>
                    <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                </div>
              </div>

              <div className="mt-3 flex flex-col gap-2 border-t border-slate-200 pt-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0 text-xs text-slate-600">
                  <span className="font-semibold text-slate-700">여행 확정 고객 안내용 링크:</span>{' '}
                  <span className="font-mono-code text-slate-800 break-all">{CUSTOMER_SHARE_URL}</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy(CUSTOMER_SHARE_URL, 'share')}
                  className="inline-flex items-center gap-1.5 self-start sm:self-auto rounded-md border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-100 transition-colors whitespace-nowrap shrink-0 min-h-[34px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F4C81]"
                >
                  {copiedKey === 'share' ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-600" aria-hidden="true" />
                      <span>안내 링크 복사 완료</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5 text-slate-500" aria-hidden="true" />
                      <span>고객 안내 링크 복사</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Right column: 72-Hour Arrival Window Calculator */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="flex h-full flex-col justify-between rounded-xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
              <div>
                <div className="flex items-center justify-between gap-2">
                  <h2 className="text-base font-bold text-slate-900">
                    내 입국일 기준 작성 가능일 계산기
                  </h2>
                  <Calendar className="h-4 w-4 text-[#0F4C81] shrink-0" aria-hidden="true" />
                </div>
                <p className="mt-1.5 text-sm text-slate-600">
                  한국 출발일이 아닌 <strong className="font-semibold text-slate-800">태국 공항 도착 예정일</strong>을 선택하면 TDAC 날짜 선택이 열리는 날을 바로 확인할 수 있습니다.
                </p>

                <div className="mt-5">
                  <label
                    htmlFor="tdac-arrival-date"
                    className="block text-xs font-semibold text-slate-700"
                  >
                    태국 도착 날짜 선택 (단위: 연-월-일)
                  </label>
                  <input
                    id="tdac-arrival-date"
                    type="date"
                    value={arrivalDateStr}
                    onChange={(e) => setArrivalDateStr(e.target.value)}
                    className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 font-mono-code text-sm text-slate-900 focus:border-[#0F4C81] focus:outline-none focus:ring-2 focus:ring-[#0F4C81]/20 min-h-[44px]"
                  />
                </div>

                {windowCalc && (
                  <div className="mt-5 space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="rounded-lg border border-slate-200 bg-white p-3.5">
                        <div className="text-xs text-slate-500">작성 시작 가능일 (D-3)</div>
                        <div className="mt-1 font-mono-code text-sm font-bold text-slate-900 tabular-nums">
                          {windowCalc.openFormatted}
                        </div>
                      </div>
                      <div className="rounded-lg border border-slate-200 bg-white p-3.5">
                        <div className="text-xs text-slate-500">태국 도착 예정일 (D-Day)</div>
                        <div className="mt-1 font-mono-code text-sm font-bold text-slate-900 tabular-nums">
                          {windowCalc.arrivalFormatted}
                        </div>
                      </div>
                    </div>

                    {windowCalc.status === 'open' && (
                      <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-emerald-900">
                        <div className="flex items-center gap-2 text-sm font-bold">
                          <CheckCircle2 className="h-4 w-4 text-emerald-700 shrink-0" aria-hidden="true" />
                          <span>지금 바로 작성 가능합니다 (72시간 이내)</span>
                        </div>
                        <p className="mt-1 text-xs leading-relaxed text-emerald-800">
                          {windowCalc.daysUntilArrival === 0
                            ? '오늘이 태국 도착일입니다. 입국 심사 전까지 지금 즉시 작성해 QR코드를 저장하세요.'
                            : `태국 도착까지 ${windowCalc.daysUntilArrival}일 남았습니다. 공식 사이트에서 날짜 선택이 활성화되어 있으니 지금 작성하실 수 있습니다.`}
                        </p>
                      </div>
                    )}

                    {windowCalc.status === 'upcoming' && (
                      <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-amber-900">
                        <div className="flex items-center gap-2 text-sm font-bold">
                          <Clock className="h-4 w-4 text-amber-700 shrink-0" aria-hidden="true" />
                          <span>작성 오픈까지 {windowCalc.daysUntilOpen}일 남았습니다</span>
                        </div>
                        <p className="mt-1 text-xs leading-relaxed text-amber-800">
                          현재 시점에서는 TDAC 사이트에서 도착 날짜 선택이 되지 않습니다.{' '}
                          <strong className="font-semibold">{windowCalc.openFormatted}</strong>부터 접속해 작성하시고, 그전에는 아래 [사전 작성 도우미]에 영문 정보를 미리 정리해 두세요.
                        </p>
                      </div>
                    )}

                    {windowCalc.status === 'past' && (
                      <div className="rounded-lg border border-slate-300 bg-slate-100 p-4 text-slate-800">
                        <div className="flex items-center gap-2 text-sm font-bold">
                          <AlertTriangle className="h-4 w-4 text-slate-600 shrink-0" aria-hidden="true" />
                          <span>선택한 날짜가 오늘보다 이전입니다</span>
                        </div>
                        <p className="mt-1 text-xs leading-relaxed text-slate-600">
                          예정된 태국 도착 날짜를 다시 선택해 작성 가능 기간을 확인하세요.
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="mt-5 border-t border-slate-200 pt-4 text-xs text-slate-500">
                ※ 입력란은 모두 영문으로 작성하며, 소문자로 입력해도 사이트 내에서 자동 대문자 처리됩니다.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
