export interface GuideFieldItem {
  marker: string;
  title: string;
  tdacLabel: string;
  required?: boolean;
  description: string;
  exampleValue?: string;
  tip?: string;
  copyableValue?: string;
}

export interface GuideStage {
  id: string;
  stepNumber: string;
  shortLabel: string;
  title: string;
  subtitle: string;
  imagePath: string;
  imageAlt: string;
  markersSummary: string;
  items: GuideFieldItem[];
}

export interface OccupationOption {
  ko: string;
  en: string;
}

export interface AccommodationPreset {
  id: 'bangkok' | 'pattaya';
  cityKo: string;
  cityEn: string;
  province: string;
  district: string;
  subDistrict: string;
  postalCode: string;
  address: string;
  fullGoogleMapsSample: string;
  imagePath: string;
  imageAlt: string;
  note: string;
}

export const OFFICIAL_TDAC_URL = 'https://tdac.immigration.go.th/';
export const CUSTOMER_SHARE_URL = 'https://sites.google.com/view/bgittdac';

export const OCCUPATION_EXAMPLES: OccupationOption[] = [
  { ko: '자영업자', en: 'SELF-EMPLOYED' },
  { ko: '사업가', en: 'BUSINESSMAN' },
  { ko: '회사원', en: 'OFFICE WORKER' },
  { ko: '공무원', en: 'CIVIL SERVANT' },
  { ko: '교사', en: 'TEACHER' },
  { ko: '학생', en: 'STUDENT' },
  { ko: '주부', en: 'HOUSE WIFE' },
  { ko: '연금생활자', en: 'PENSIONER' },
];

export const ACCOMMODATION_PRESETS: AccommodationPreset[] = [
  {
    id: 'bangkok',
    cityKo: '방콕 (Bangkok)',
    cityEn: 'BANGKOK',
    province: 'BANGKOK',
    district: 'PHRA NAKHON',
    subDistrict: 'CHANA SONGKHRAM',
    postalCode: '10200',
    address: 'NEW SIAM II, 50 PHRA ATHIT RD',
    fullGoogleMapsSample: 'New Siam II, 50 Phra Athit Rd, Chana Songkhram, Phra Nakhon, Bangkok 10200',
    imagePath: '/assets/aistudio/3_095fd0fd.png',
    imageAlt: '방콕 숙소 입력 예시 화면 (도/주 BANGKOK, 지구 PHRA NAKHON, 세부 지역 CHANA SONGKHRAM, 우편번호 10200)',
    note: '방콕 시내 숙소의 경우 도/주(Province)에서 BANGKOK을 선택한 뒤 지구(District)와 세부 지역(Sub-district)을 구글지도 영문 주소와 대조하여 선택합니다.',
  },
  {
    id: 'pattaya',
    cityKo: '파타야 (Pattaya)',
    cityEn: 'CHON BURI',
    province: 'CHON BURI',
    district: 'BANG LAMUNG',
    subDistrict: 'BANG LAMUNG',
    postalCode: '20150',
    address: '463/68 Pattaya Sai 1 Road, Nongprue, Banglamung, Chonburi, Pattaya, 20150 Thailand',
    fullGoogleMapsSample: '463/68 Pattaya Sai 1 Road, Nongprue, Banglamung, Chonburi, Pattaya, 20150 Thailand',
    imagePath: '/assets/aistudio/4_5c424227.png',
    imageAlt: '파타야 숙소 입력 예시 화면 (도/주 CHON BURI, 지구 BANG LAMUNG, 세부 지역 BANG LAMUNG, 우편번호 20150)',
    note: '파타야는 도시 이름이지만 상위 행정구역(도/주)은 CHON BURI(촌부리)입니다. 구글지도 주소에서 우편번호(20150) 바로 앞의 지방명(Chonburi)을 확인해 선택하세요.',
  },
];

export const GUIDE_STAGES: GuideStage[] = [
  {
    id: 'start',
    stepNumber: '준비',
    shortLabel: '시작 및 언어 설정',
    title: 'TDAC 접속 및 언어 변경 · 카드 선택',
    subtitle: '공식 사이트에 접속해 한국어로 언어를 변경한 뒤 입국 카드를 시작합니다.',
    imagePath: '/assets/aistudio/1_3613a3af.png',
    imageAlt: 'TDAC 공식 사이트 메인 화면 - ① 언어변경(한국어) 및 ② 입국 카드 / 입국 카드 업데이트 선택 안내',
    markersSummary: '① ~ ②',
    items: [
      {
        marker: '①',
        title: '언어 변경 (한국어 선택)',
        tdacLabel: '우측 상단 언어 선택 메뉴',
        required: true,
        description:
          '사이트 우측 상단 국기 아이콘을 눌러 언어에서 한국어를 선택할 수 있습니다. 안내 문구와 입력 항목 라벨이 한국어로 표시되어 편리하게 작성할 수 있습니다.',
        tip: '언어를 한국어로 바꾸더라도 모든 입력란의 내용은 반드시 영문으로 작성해야 합니다.',
      },
      {
        marker: '②',
        title: '입국 카드 시작 / 업데이트 구분',
        tdacLabel: '입국 카드 / 입국 카드 업데이트',
        required: true,
        description:
          '처음 작성하는 경우 [입국 카드]를 누릅니다. 이미 이 사이트에서 작성을 완료한 이력이 있고, 항공편 변경 등으로 입국 정보가 바뀌어 수정해야 한다면 [입국 카드 업데이트]로 들어갑니다.',
        tip: '화면 중앙의 Cloudflare 보안 확인에 "성공!" 체크가 표시된 후 버튼을 눌러 진행하세요.',
      },
    ],
  },
  {
    id: 'step1',
    stepNumber: '1단계',
    shortLabel: '개인 정보',
    title: '여권의 개인 정보 및 기본 개인 정보 입력',
    subtitle: '이하 모든 내용은 영문으로 작성합니다. 소문자로 입력해도 자동으로 대문자로 변환됩니다.',
    imagePath: '/assets/aistudio/2_4bdb9c65.png',
    imageAlt: 'TDAC 1단계 개인 정보 화면 - ③ 성부터 ⑬ 휴대폰번호까지 번호별 입력 가이드',
    markersSummary: '③ ~ ⑬',
    items: [
      {
        marker: '③',
        title: '성 (Family Name / Surname)',
        tdacLabel: '* 성',
        required: true,
        description: '여권 하단 영문 이름 중 성(Last Name)을 여권 스펠링과 정확히 일치하게 영문으로 입력합니다.',
        exampleValue: 'TAE',
        copyableValue: 'TAE',
      },
      {
        marker: '④',
        title: '이름 (First Name)',
        tdacLabel: '* 이름 (미들네임은 공란)',
        required: true,
        description: '여권에 표기된 이름(First Name)을 영문으로 입력합니다. 미들네임/중간이름이 없다면 비워두시면 됩니다.',
        exampleValue: 'SARANG',
        copyableValue: 'SARANG',
      },
      {
        marker: '⑤',
        title: '여권번호 (Passport No.)',
        tdacLabel: '* 여행 번호',
        required: true,
        description: '한국어 화면에서는 "여행 번호"로 번역되어 표시됩니다. 여권 우측 상단의 여권번호(영문+숫자)를 정확히 입력합니다.',
        exampleValue: 'M123A5678',
      },
      {
        marker: '⑥',
        title: '국적 (Nationality)',
        tdacLabel: '* 국적',
        required: true,
        description: '대한민국 국적은 목록 중간쯤에 있는 "KOR : SOUTH KOREAN"을 선택합니다.',
        exampleValue: 'KOR : SOUTH KOREAN',
        copyableValue: 'KOR : SOUTH KOREAN',
        tip: 'K로 시작하는 목록이나 SOUTH KOREA/SOUTH KOREAN으로 검색하면 빠르게 찾을 수 있습니다.',
      },
      {
        marker: '⑦',
        title: '생년월일 (Date of Birth)',
        tdacLabel: '* 생년월일',
        required: true,
        description: '위에서부터 년(YYYY), 월(MM), 일(DD) 순서로 드롭다운을 열어 각각 선택합니다.',
        exampleValue: '1999 / 06 / 09',
      },
      {
        marker: '⑧',
        title: '직업 (Occupation)',
        tdacLabel: '* 직업',
        required: true,
        description:
          '영문으로 대략적인 직업을 적으면 됩니다. 회사원은 OFFICE WORKER, 자영업자는 SELF-EMPLOYED 등 아래 자주 쓰는 영문 예시를 참고해 입력하세요.',
        exampleValue: 'OFFICE WORKER / SELF-EMPLOYED',
        copyableValue: 'OFFICE WORKER',
      },
      {
        marker: '⑨',
        title: '성별 (Gender)',
        tdacLabel: '* 성별',
        required: true,
        description: '여권과 동일하게 여성(FEMALE), 남성(MALE) 중 해당 항목을 선택합니다.',
        exampleValue: 'MALE / FEMALE',
      },
      {
        marker: '⑩',
        title: '비자 번호 (Visa No.)',
        tdacLabel: '비자 번호 (선택 사항)',
        required: false,
        description: '비자가 있다면 비자번호를 기입합니다. 일반 무비자 단기 관광·여행객은 공란으로 비워 두시면 됩니다.',
        tip: '대한민국 여권 소지자의 일반 관광 입국은 무비자이므로 입력하지 않습니다.',
      },
      {
        marker: '⑪',
        title: '거주 국가/지역 (Country of Residence)',
        tdacLabel: '* 거주 국가/지역',
        required: true,
        description: '대한민국에 거주한다면 목록 중간 약간 아랫부분에 있는 "REPUBLIC OF KOREA"를 선택합니다.',
        exampleValue: 'REPUBLIC OF KOREA',
        copyableValue: 'REPUBLIC OF KOREA',
      },
      {
        marker: '⑫',
        title: '거주국 시·도 (City / State of Residence)',
        tdacLabel: '* 도시/거주',
        required: true,
        description: '거주 중인 대한민국의 시·도를 영문으로 입력 또는 선택합니다 (예: SEOUL, BUSAN 등).',
        exampleValue: 'SEOUL',
        copyableValue: 'SEOUL',
      },
      {
        marker: '⑬',
        title: '거주국 휴대폰번호 (Phone Number)',
        tdacLabel: '* 휴대폰번호',
        required: true,
        description: '국가번호(+82) 입력 후 뒤 칸에 휴대폰 번호를 입력합니다. 예시처럼 010에서 앞의 0을 뺀 1012345678 형태로 입력할 수 있습니다.',
        exampleValue: '+82  1012345678',
      },
    ],
  },
  {
    id: 'step2',
    stepNumber: '2단계',
    shortLabel: '여행 및 숙박 정보',
    title: '도착·출발 항공편 및 태국 내 숙박 정보',
    subtitle: '동반자 일괄 불러오기(⑭-1), 도착 날짜(탑승일 아님), 그리고 구글 지도를 활용한 숙소 행정구역 입력 단계입니다.',
    imagePath: '/assets/aistudio/3_095fd0fd.png',
    imageAlt: 'TDAC 2단계 여행 및 숙박 정보 화면 - ⑭-1 이전 여행자와 동일, ⑭~⑳ 도착/출발 정보, ㉑~㉕ 숙박 정보 안내',
    markersSummary: '⑭-1, ⑭ ~ ㉕',
    items: [
      {
        marker: '⑭-1',
        title: '이전 여행자와 동일 (동반자 일괄 입력)',
        tdacLabel: '이전 여행자와 동일',
        required: false,
        description:
          '첫 번째 여행자 작성 시에는 비활성화되어 있습니다. 3단계의 ㉗번 [다른 여행자 추가하기]로 동반자를 추가하면 이 메뉴가 활성화되며, 먼저 입력한 기존 여행자를 선택할 경우 ⑭~㉕번 여행·숙박 정보가 동일하게 일괄 자동 입력됩니다.',
        tip: '가족이나 일행과 같은 비행기·같은 숙소를 이용한다면 ⑭-1 기능을 쓰면 훨씬 빠르게 작성할 수 있습니다.',
      },
      {
        marker: '⑭',
        title: '태국 도착 날짜 (Arrival Date)',
        tdacLabel: '* 도착 날짜',
        required: true,
        description: '한국에서 출발하는 탑승 날짜가 아니라 태국 공항에 실제로 도착하는 날짜를 선택합니다. (예: 밤 비행기 탑승 후 익일 새벽 도착 시 다음 날 선택)',
        exampleValue: '2025/04/26',
        tip: '입국 3일(72시간) 전부터만 날짜 선택이 활성화됩니다.',
      },
      {
        marker: '⑮',
        title: '탑승한 국가/지역 (Country Where You Boarded)',
        tdacLabel: '* 탑승한 국가/지역',
        required: true,
        description: '항공편을 출발한 국가를 선택합니다. 입국하여 체류하지 않는 중간 경유지가 있더라도 최초 출발한 국가(REPUBLIC OF KOREA)를 선택합니다.',
        exampleValue: 'REPUBLIC OF KOREA',
        copyableValue: 'REPUBLIC OF KOREA',
      },
      {
        marker: '⑯',
        title: '여행 목적 (Purpose of Travel)',
        tdacLabel: '* 여행 목적',
        required: true,
        description: '일반적인 관광, 휴가의 경우 선택지에서 HOLIDAY(휴가)를 선택합니다.',
        exampleValue: 'HOLIDAY',
        copyableValue: 'HOLIDAY',
      },
      {
        marker: '⑰',
        title: '입국 시 교통수단 (Mode of Travel)',
        tdacLabel: '* 여행 방법',
        required: true,
        description: '항공편 입국은 AIR, 육로는 LAND, 선박(크루즈·페리)은 SEA를 선택합니다.',
        exampleValue: 'AIR',
      },
      {
        marker: '⑱',
        title: '교통수단 종류 (Mode of Transport)',
        tdacLabel: '* 교통수단',
        required: true,
        description: '일반적인 여객 항공편을 이용하는 경우 COMMERCIAL FLIGHT를 선택하면 됩니다.',
        exampleValue: 'COMMERCIAL FLIGHT',
        copyableValue: 'COMMERCIAL FLIGHT',
      },
      {
        marker: '⑲',
        title: '항공기 편명 (Flight No. / Vehicle No.)',
        tdacLabel: '* 항공편 번호 / 차량 번호.',
        required: true,
        description: '탑승하는 항공편 편명을 영문+숫자로 입력합니다. 중간에 비행기를 갈아탔다면 최종적으로 태국에 도착하는 항공편 편명을 입력합니다.',
        exampleValue: 'AB1234 (예: KE651, TG657)',
      },
      {
        marker: '⑳',
        title: '출발 정보 (태국에서 출국하는 편명 - 선택)',
        tdacLabel: '출발 정보 (필수 아님)',
        required: false,
        description:
          '한국에서 떠나는 날이 아니라 태국에서 한국(또는 다른 나라)으로 출국하는 날짜와 교통편 정보입니다. 단, 태국 출발 교통편은 필수 입력 사항이 아니므로 입력하지 않고 비워두어도 무방합니다.',
        tip: '왕복 항공권 일정이 확정되어 있다면 입력해도 되며, 공란으로 두어도 제출 가능합니다.',
      },
      {
        marker: '㉑',
        title: '숙박시설 종류 (Type of Accommodation)',
        tdacLabel: '* 태국의 숙박 유형',
        required: true,
        description: '여러 유형의 숙소에서 묵는다면 가장 대표적인 것으로 선택하면 됩니다. 일반 호텔 숙박 시 HOTEL(호텔)을 선택하세요.',
        exampleValue: 'HOTEL',
        copyableValue: 'HOTEL',
      },
      {
        marker: '㉒',
        title: '숙소가 있는 도/주 (Province)',
        tdacLabel: '* 도,주',
        required: true,
        description:
          '파타야(CHON BURI), 후아힌(PRACHUAP KHIRI KHAN)처럼 도시 이름과 상위 지방 이름이 다른 경우가 많으므로 구글 지도 등에서 영문 주소를 확인하세요. 구글 지도에서 확인한 주소에서 우편번호 바로 앞 첫 번째 지명이 도/주에 해당합니다.',
        exampleValue: '방콕: BANGKOK / 파타야: CHON BURI',
      },
      {
        marker: '㉓',
        title: '지구, 특별구 (District / Amphoe)',
        tdacLabel: '* 지구, 특별구',
        required: true,
        description: '구글 검색 또는 구글 지도에서 확인한 숙소 영문 주소의 구(District) 이름을 선택합니다.',
        exampleValue: '방콕: PHRA NAKHON / 파타야: BANG LAMUNG',
      },
      {
        marker: '㉔',
        title: '세부 지역 및 우편번호 (Sub-district & Postal Code)',
        tdacLabel: '* 세부 지역 / 우편번호',
        required: true,
        description: '구글 지도의 영문 주소를 참고해 세부 지역(Sub-district/Tambon)과 5자리 우편번호를 선택·입력합니다.',
        exampleValue: '방콕: CHANA SONGKHRAM (10200) / 파타야: BANG LAMUNG (20150)',
      },
      {
        marker: '㉕',
        title: '상세 주소 (Address)',
        tdacLabel: '* 주소',
        required: true,
        description: '호텔명과 도로명 주소를 영문으로 기입합니다 (최대 250자). 구글 지도의 숙소 영문 주소를 그대로 참고해 입력하면 편리합니다.',
        exampleValue: 'NEW SIAM II, 50 PHRA ATHIT RD',
      },
    ],
  },
  {
    id: 'step3',
    stepNumber: '3단계',
    shortLabel: '건강상태확인서',
    title: '최근 2주 체류 국가 선택 및 동반자 추가',
    subtitle: '입국 전 14일간 머물렀던 국가를 선택하고, 동반자가 있다면 추가하거나 미리보기로 넘어갑니다.',
    imagePath: '/assets/aistudio/5_15ecf04b.png',
    imageAlt: 'TDAC 3단계 건강상태확인서 화면 - ㉖ 입국 전 2주 동안 체류한 국가/지역, ㉗ 다른 여행자 추가하기 및 미리 보기',
    markersSummary: '㉖ ~ ㉗',
    items: [
      {
        marker: '㉖',
        title: '입국 전 2주 동안 체류한 국가/지역',
        tdacLabel: '입국 전 2주 동안 체류한 국가/지역의 이름을 작성해 주세요.',
        required: true,
        description:
          '대한민국은 목록 중간 약간 아래쪽에 있는 "REPUBLIC OF KOREA"를 선택합니다. 태국 입국 전 2주 이내에 다른 나라에도 체류했다면 같은 방법으로 국가를 선택해 여러 개 추가할 수 있습니다.',
        exampleValue: 'REPUBLIC OF KOREA',
        copyableValue: 'REPUBLIC OF KOREA',
      },
      {
        marker: '㉗',
        title: '다른 여행자 추가하기 / 미리 보기',
        tdacLabel: '다른 여행자 추가하기 · 미리 보기',
        required: false,
        description:
          '동반자가 있으면 [다른 여행자 추가하기]를 눌러 1단계부터 과정을 반복합니다. 이때 추가된 여행자의 2단계 화면에서 ⑭-1 메뉴를 누르면 첫 번째 여행자의 여행·숙박 정보를 한 번에 불러올 수 있습니다. 물론 동반자더라도 개별적으로 따로 신청해도 됩니다. 모두 마쳤으면 [미리 보기]를 눌러 입력 사항을 확인합니다.',
        tip: '동반자를 추가해 한 번에 신청하면 대표 이메일로 QR코드를 편리하게 함께 관리할 수 있습니다.',
      },
    ],
  },
  {
    id: 'submit',
    stepNumber: '최종',
    shortLabel: '미리보기 및 제출',
    title: '입력 내용 최종 점검 · 이메일 입력 및 제출',
    subtitle: '작성한 모든 항목을 대조한 뒤 이메일을 입력하고 약관에 동의해 제출합니다.',
    imagePath: '/assets/aistudio/6_022a7568.png',
    imageAlt: 'TDAC 미리보기 및 최종 제출 화면 - ㉘ 수정, ㉙ 이메일 주소 입력, ㉚ 이용 약관 동의 및 제출',
    markersSummary: '㉘ ~ ㉚',
    items: [
      {
        marker: '㉘',
        title: '수정하기 (잘못 입력한 부분만 부분 수정)',
        tdacLabel: '수정 / 삭제',
        required: false,
        description:
          '미리보기 화면에서 잘못된 부분이 발견되면 [수정]을 눌러 단계별로 수정하면 됩니다. 처음부터 다시 작성할 필요 없이 잘못된 부분만 바로 고칠 수 있습니다.',
        tip: '여권 영문 성명, 여권번호, 생년월일, 도착 날짜가 여권 및 항공권과 일치하는지 꼭 한 번 더 확인하세요.',
      },
      {
        marker: '㉙',
        title: '입국카드 수령 이메일 주소 입력',
        tdacLabel: '* 태국 디지털 입국 카드를 보낼 이메일을 지정해 주세요',
        required: true,
        description: '모든 사항을 확인해 틀림이 없으면 전자입국카드(QR코드)를 받을 본인의 이메일 주소를 정확히 입력합니다.',
        exampleValue: 'TAESARANG@THAILOVE.NET',
      },
      {
        marker: '㉚',
        title: '이용 약관 동의 및 제출 · QR코드 저장',
        tdacLabel: '* 저는 다음을 읽고 동의합니다. 이용 약관. → 제출',
        required: true,
        description:
          '이용 약관 동의 체크박스에 체크한 뒤 [제출] 버튼을 누르면 신청이 완료됩니다. 완료 즉시 화면에서 QR코드를 다운로드할 수 있으며, 입력한 이메일로도 발송됩니다.',
        tip: '입국심사 시 여권만 제시하면 전산 조회가 되지만, 간혹 전자입국카드(QR코드) 제시를 요청받는 경우가 있으므로 스마트폰에 캡처·저장하거나 출력해 두시는 것을 권장합니다.',
      },
    ],
  },
];

export const ALL_GUIDE_MARKERS = GUIDE_STAGES.flatMap((stage) =>
  stage.items.map((item) => ({
    ...item,
    stageId: stage.id,
    stageStep: stage.stepNumber,
  }))
);
