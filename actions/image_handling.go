package actions

import (
	"bytes"
	"encoding/base64"
	"fmt"
	"image"
	"image/jpeg"
	"log"
	"strings"

	"github.com/disintegration/imaging"
	"github.com/goamz/goamz/s3"
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
func CompressAndBlurImageAndReturnBase64(img string) (string, error) {
	byt, err := base64.StdEncoding.DecodeString(strings.Split(img, "base64,")[1])

	srcImage, _, _ := image.Decode(bytes.NewReader(byt))
	dstImage25 := imaging.Resize(srcImage, 25, 0, imaging.CatmullRom)
	dstImageBlured := imaging.Blur(dstImage25, 3)
	buf := new(bytes.Buffer)
	err = jpeg.Encode(buf, dstImageBlured, nil)
	if err != nil {
		log.Println(err)
		return "", err
	}

	//bimg.Write("smaller.jpg", newImage)
	return fmt.Sprintf("data:%s;base64,%s",
		"image/jpeg", base64.StdEncoding.EncodeToString(buf.Bytes())), nil
}

//ResizeToThumbnailSize resizes image to a 300px width
func ResizeToThumbnailSize(byt []byte) ([]byte, error) {

	srcImage, _, _ := image.Decode(bytes.NewReader(byt))
	dstImage25 := imaging.Resize(srcImage, 300, 0, imaging.CatmullRom)
	buf := new(bytes.Buffer)
	err := jpeg.Encode(buf, dstImage25, nil)
	if err != nil {
		log.Println(err)
		return byt, err
	}

	//bimg.Write("smaller.jpg", newImage)
	return buf.Bytes(), nil
}
