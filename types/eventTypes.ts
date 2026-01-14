export type SportsEvent = {
  dateEvent: string;              // "2014-12-29"
  dateEventLocal: string;         // "2014-12-29"

  idAPIfootball: string | null;
  idAwayTeam: string;
  idEvent: string;
  idHomeTeam: string;
  idLeague: string;
  idVenue: string;

  intAwayScore: string | null;
  intHomeScore: string | null;
  intRound: string | null;
  intScore: string | null;
  intScoreVotes: string | null;
  intSpectators: string | null;

  strAwayTeam: string;
  strAwayTeamBadge: string | null;

  strBanner: string | null;
  strCity: string | null;
  strCountry: string;

  strDescriptionEN: string;
  strEvent: string;
  strEventAlternate: string | null;

  strFanart: string | null;
  strFilename: string | null;
  strGroup: string | null;

  strHomeTeam: string;
  strHomeTeamBadge: string | null;

  strLeague: string;
  strLeagueBadge: string | null;

  strLocked: "locked" | "unlocked";
  strMap: string | null;
  strOfficial: string | null;

  strPoster: string | null;
  strPostponed: "yes" | "no";
  strResult: string;

  strSeason: string;
  strSport: string;

  strSquare: string | null;
  strStatus: string | null;
  strThumb: string | null;

  strTime: string;                // "20:00:00"
  strTimeLocal: string;           // "20:00:00"
  strTimestamp: string;           // ISO-ish datetime

  strTweet1: string;
  strVenue: string;
  strVideo: string;
};
