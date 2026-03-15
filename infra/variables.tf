// Variables must be all uppcase, to allow for support with doppler
// as doppler requires secrets to be all uppcase

variable "CLOUDFLARE_API_TOKEN" {
	type = string
	sensitive = true
}

variable "ACCOUNT_ID" {
	type = string
	sensitive = true
}

variable "ZONE_ID"    {
	type = string
	sensitive = true
}

variable "ALLOWED_ORIGINS" {
	type = string
}

variable "DATABASE_URL" {
	type = string
	sensitive = true
}
