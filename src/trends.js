const XGlobalTrendsData = (() => {
  const countryCodes = {
    Algeria: "DZ", Argentina: "AR", Australia: "AU", Austria: "AT", Bahrain: "BH", Belarus: "BY", Belgium: "BE", Brazil: "BR", Canada: "CA", Chile: "CL", Colombia: "CO", Denmark: "DK", "Dominican Republic": "DO", Ecuador: "EC", Egypt: "EG", France: "FR", Germany: "DE", Ghana: "GH", Greece: "GR", Guatemala: "GT", India: "IN", Indonesia: "ID", Ireland: "IE", Israel: "IL", Italy: "IT", Japan: "JP", Jordan: "JO", Kenya: "KE", Korea: "KR", Kuwait: "KW", Latvia: "LV", Lebanon: "LB", Malaysia: "MY", Mexico: "MX", Netherlands: "NL", "New Zealand": "NZ", Nigeria: "NG", Norway: "NO", Oman: "OM", Pakistan: "PK", Panama: "PA", Peru: "PE", Philippines: "PH", Poland: "PL", Portugal: "PT", "Puerto Rico": "PR", Qatar: "QA", Russia: "RU", "Saudi Arabia": "SA", Singapore: "SG", "South Africa": "ZA", Spain: "ES", Sweden: "SE", Switzerland: "CH", Thailand: "TH", Turkey: "TR", Ukraine: "UA", "United Arab Emirates": "AE", "United Kingdom": "GB", "United States": "US", Venezuela: "VE", Vietnam: "VN"
  };
  const displayNames = new Intl.DisplayNames(["es"], { type: "region" });
  function localizeLocations(locations) {
    return locations.map((location) => ({ ...location, displayName: location.id === "global" ? "🌎 Global" : (countryCodes[location.name] ? displayNames.of(countryCodes[location.name]) : location.name) }))
      .sort((a, b) => a.id === "global" ? -1 : b.id === "global" ? 1 : a.displayName.localeCompare(b.displayName, "es"));
  }
  return { categories: [{ id: "all", label: "Todas" }], localizeLocations };
})();
