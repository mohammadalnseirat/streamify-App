// Language to country code mapping for flags
export const LANGUAGE_TO_FLAG = {
  english: 'gb',
  spanish: 'es',
  french: 'fr',
  german: 'de',
  italian: 'it',
  portuguese: 'pt',
  russian: 'ru',
  chinese: 'cn',
  japanese: 'jp',
  korean: 'kr',
  arabic: 'sa',
  hindi: 'in',
  turkish: 'tr',
  persian: 'ir',
  polish: 'pl',
  dutch: 'nl',
  vietnamese: 'vn',
  thai: 'th',
  indonesian: 'id',
  greek: 'gr'
};

export function getLanguageFlag(language) {
  if (!language) return null;

  const langLower = language.toLowerCase();
  const countryCode = LANGUAGE_TO_FLAG[langLower];

  if (countryCode) {
    return (
      <img
        src={`https://flagcdn.com/24x18/${countryCode}.png`}
        alt={`${language} flag`}
        className="h-3 mr-1 inline-block"
      />
    );
  }
  return null;
} 