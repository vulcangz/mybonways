package actions

import (
	"log"
	"os"

	"github.com/goamz/goamz/aws"
	"github.com/goamz/goamz/s3"
)

// Bucket
type Bucket struct {
	S3Bucket     *s3.Bucket
	S3BucketName string
}

var (
	bucket Bucket
)

func init() {
	bucket := Bucket{}
	auth, err := aws.EnvAuth()
	if err != nil {
		log.Fatal(err)
	}
	client := s3.New(auth, aws.USWest2)
	bucketname := os.Getenv("S3_BUCKET_NAME")
	if bucketname == "" {
		bucketname = "test-past3"
	}
	buck := client.Bucket(bucketname)
	bucket.S3Bucket = buck
	bucket.S3BucketName = bucketname
}

func GetBucket() *Bucket {
	return &bucket
}
