export 
interface TeamData {
  idTeam: string
  strTeam: string
  strTeamAlternate?: string
  strTeamShort?: string
  intFormedYear?: string
  strSport?: string
  strLeague?: string
  idLeague?: string
  strDivision?: string | null

  strStadium?: string
  intStadiumCapacity?: string
  strLocation?: string

  strWebsite?: string
  strFacebook?: string
  strTwitter?: string
  strInstagram?: string
  strYoutube?: string
  strRSS?: string

  strDescriptionEN?: string
  strCountry?:string
  strColour1?: string
  strColour2?: string
  strColour3?: string

  strBadge?: string
  strLogo?: string
  strFanart1?: string
  strFanart2?: string
  strFanart3?: string
  strFanart4?: string
  strBanner?: string
  strEquipment?: string
}