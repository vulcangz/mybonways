package actions

import (
	"encoding/base64"
	"fmt"
	"log"
	"strings"

	"github.com/goamz/goamz/s3"
	bimg "gopkg.in/h2non/bimg.v1"
)

//UploadBase64Image resizes image and puts it into s3 bucket
func UploadBase64Image(bucket *s3.Bucket, image string, imagename string) (string, error) {
	byt, err := base64.StdEncoding.DecodeString(strings.Split(image, "base64,")[1])
	if err != nil {
		log.Println(err)
		return "", err
	}

	meta := strings.Split(image, "base64,")[0]
	newmeta := strings.Replace(strings.Replace(meta, "data:", "", -1), ";", "", -1)

	err = bucket.Put(imagename, byt, newmeta, s3.PublicReadWrite, s3.Options{})
	if err != nil {
		log.Println(err)
		return "", err
	}

	return bucket.URL(imagename), nil
}

//UploadImageObjectToS3 uploads the igin image to a specified bucket
func UploadImageObjectToS3(bucket *s3.Bucket, b []byte, imagename string) (string, error) {

	err := bucket.Put(imagename, b, "image/jpeg", s3.PublicReadWrite, s3.Options{})
	if err != nil {
		log.Println(err)
		return "", err
	}

	return bucket.URL(imagename), nil
}

//CompressAndBlurImageAndReturnBase64 Helper turns compresses and blurs image, then turns it to base64 string of less than 1kb
func CompressAndBlurImageAndReturnBase64(byt []byte) (string, error) {
	opt := bimg.Options{
		Width: 25,
		GaussianBlur: bimg.GaussianBlur{
			MinAmpl: 0.2,
			Sigma:   3,
		},
	}

	newImage, err := bimg.Resize(byt, opt)
	if err != nil {
		log.Println(err)
		return "", err
	}
	//bimg.Write("smaller.jpg", newImage)
	return fmt.Sprintf("data:%s;base64,%s",
		"image/jpeg", base64.StdEncoding.EncodeToString(newImage)), nil
}

//ResizeToThumbnailSize resizes image to a 300px width
func ResizeToThumbnailSize(byt []byte) ([]byte, error) {
	opt := bimg.Options{
		Width: 300,
	}

	newImage, err := bimg.Resize(byt, opt)
	if err != nil {
		log.Println(err)
		return []byte{}, err
	}
	//bimg.Write("smaller.jpg", newImage)
	return newImage, nil
}
