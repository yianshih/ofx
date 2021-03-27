enum ENV {
  prod = "prod",
  staging = "staging",
  dev = "dev"
}

/**
 * Change env for staging or production environment
 */
export const env: ENV = ENV.dev

const IndividualURLs = {
  prod: "",
  staging: "",
  dev: "https://api.ofx.com/PublicSite.ApiService/OFX/spotrate/Individual"
}

export const INDIVIDUAL_RATE_API_URL = IndividualURLs[env]
