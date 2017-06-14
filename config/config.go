package config

import (
	"io/ioutil"
	"log"
)

type Config struct {
	Encryption struct {
		Private []byte
		Public  []byte
	}
}

var (
	config Config
)

func init() {
	config := Config{}

	var err error

	config.Encryption.Public, err = ioutil.ReadFile("./config/encryption/public.pub")
	if err != nil {
		log.Println("Error reading public key")
		log.Println(err)
		return
	}

	config.Encryption.Private, err = ioutil.ReadFile("./config/encryption/private.pem")
	if err != nil {
		log.Println("Error reading private key")
		log.Println(err)
		return
	}
}

// Get a poiter to the config
func Get() *Config {
	return &config
}
