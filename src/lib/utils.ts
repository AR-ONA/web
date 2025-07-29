// Unix 타임스탬프 문자열을 YYYY-MM-DD 형식으로 변환하는 함수
export function formatDate(unixTimestampString: string, timeZone?: string): string {
  const date = new Date(parseInt(unixTimestampString, 10) * 1000);
  if (isNaN(date.getTime())) {
    return "Invalid Date"; // 유효하지 않은 타임스탬프 처리
  }

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    timeZone: timeZone,
  };
  
  // 'en-CA' 로케일은 YYYY-MM-DD 형식을 반환합니다.
  return new Intl.DateTimeFormat('en-CA', options).format(date);
}

// Unix 타임스탬프 문자열을 YYYY-MM-DD HH:mm:ss 형식으로 변환하는 함수
export function formatDateTime(unixTimestampString: string, timeZone?: string): string {
  const date = new Date(parseInt(unixTimestampString, 10) * 1000);
  if (isNaN(date.getTime())) {
    return "Invalid Date";
  }

  const dateOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    timeZone: timeZone,
  };
  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
    timeZone: timeZone,
  };

  // 날짜는 'en-CA' 로케일 (YYYY-MM-DD), 시간은 'en-GB' 로케일 (24시간 형식)을 사용합니다.
  const formattedDate = new Intl.DateTimeFormat('en-CA', dateOptions).format(date);
  const formattedTime = new Intl.DateTimeFormat('en-GB', timeOptions).format(date);

  return `${formattedDate} ${formattedTime}`;
}
