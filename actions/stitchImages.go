package actions

import (
	"bytes"
	"encoding/base64"
	"image"
	"image/color"
	_ "image/jpeg" //this is to aid the image decoder handle jpeg
	_ "image/png"  //this is to aid the image decoder handle png
	"log"
	"strings"
)

type Pixel struct {
	Point image.Point
	Color color.Color
}

func DecodeBase64toImageObject(imageString string) (image.Image, string, error) {
	img, err := base64.StdEncoding.DecodeString(strings.Split(imageString, "base64,")[1])
	if err != nil {
		log.Println(err)
		return nil, "", err
	}

	reader := bytes.NewReader(img)
	m, format, err := image.Decode(reader)
	if err != nil {
		log.Println(err)
		return m, format, err
	}
	return m, format, nil
}
