// Unix 타임스탬프 문자열을 YYYY-MM-DD 형식으로 변환하는 함수
export function formatDate(unixTimestampString: string): string {
  // 문자열을 숫자로 변환하고, 밀리초 단위로 맞추기 위해 1000을 곱합니다.
  const date = new Date(parseInt(unixTimestampString, 10) * 1000);
  if (isNaN(date.getTime())) {
    return "Invalid Date"; // 유효하지 않은 타임스탬프 처리
  }
  const year = date.getFullYear();
  // getMonth()는 0부터 시작하므로 1을 더하고, 2자리로 맞추기 위해 '0'을 추가합니다.
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);
  return `${year}-${month}-${day}`;
}

// Unix 타임스탬프 문자열을 YYYY-MM-DD HH:mm:ss 형식으로 변환하는 함수
export function formatDateTime(unixTimestampString: string): string {
  const date = new Date(parseInt(unixTimestampString, 10) * 1000);
  if (isNaN(date.getTime())) {
    return "Invalid Date";
  }
  const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);
  const hours = ('0' + date.getHours()).slice(-2);
  const minutes = ('0' + date.getMinutes()).slice(-2);
  const seconds = ('0' + date.getSeconds()).slice(-2);
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
