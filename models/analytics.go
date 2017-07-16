package models

type Analytics struct {
	UnapprovedListingsCount int `json:"UnapprovedListingsCount" db:"unapproved_listings_count"`
	ListingsCount           int `json:"ListingsCount" db:"listings_count"`
	UsersCount              int `json:"UsersCount" db:"users_count"`
}
