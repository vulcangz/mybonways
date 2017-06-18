package actions

import (
	"log"
	"os"

	"github.com/goamz/goamz/aws"
	"github.com/goamz/goamz/s3"
)

var (
	s3bucket     *s3.Bucket
	s3bucketname string
)

func init() {
	auth, err := aws.EnvAuth()
	if err != nil {
		log.Fatal(err)
	}
	client := s3.New(auth, aws.USWest2)
	s3bucketname := os.Getenv("S3_BUCKET_NAME")
	if s3bucketname == "" {
		s3bucketname = "test-past3"
	}
	s3bucket = client.Bucket(s3bucketname)
}
