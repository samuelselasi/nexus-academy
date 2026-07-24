export function formatToUserTimezone(
  utcIsoString: string,
  timezone: string = 'Africa/Accra'
): string {
  try {
    const date = new Date(utcIsoString);
    return new Intl.DateTimeFormat('en-GB', {
      timeZone: timezone,
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
      timeZoneName: 'short',
    }).format(date);
  } catch (err) {
    return utcIsoString;
  }
}

export function formatTimeOnly(
  utcIsoString: string,
  timezone: string = 'Africa/Accra'
): string {
  try {
    const date = new Date(utcIsoString);
    return new Intl.DateTimeFormat('en-GB', {
      timeZone: timezone,
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    }).format(date);
  } catch (err) {
    return utcIsoString;
  }
}

export function getMinutesUntilSession(utcIsoString: string): number {
  const now = new Date().getTime();
  const sessionTime = new Date(utcIsoString).getTime();
  return Math.floor((sessionTime - now) / (1000 * 60));
}

export function isJoinable(startTimeUtc: string, endTimeUtc: string): boolean {
  const minutesUntil = getMinutesUntilSession(startTimeUtc);
  const now = new Date().getTime();
  const endTime = new Date(endTimeUtc).getTime();
  
  // Active if session is within 15 mins of start OR currently ongoing
  return (minutesUntil <= 15) && (now <= endTime);
}
