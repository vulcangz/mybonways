package models

type MerchantLogin struct {
	Merchant Merchant
	Message  string
	Token    string
}
