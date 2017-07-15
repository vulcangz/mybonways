package actions

import (
	"bufio"
	"bytes"
	"encoding/json"
	"log"
	"net/http"
	"os"
)

const (
	EMAIL_VERIFICATION = "email_verification"
)

func sendMailWithSendinblue(subject, body, to string) error {
	from := "contact@entrenet.org.ng"
	fromName := "MyBonways"
	apiKey := "qNw9MHBmVkzfPxGU"

	msg := make(map[string]interface{})
	toMap := make(map[string]string)
	toMap[to] = to
	msg["to"] = toMap
	msg["from"] = []string{from, fromName}
	msg["subject"] = subject
	msg["html"] = body

	msgByte, err := json.Marshal(msg)
	if err != nil {
		log.Println(err)
	}

	var b bytes.Buffer
	_, err = b.Write(msgByte)
	if err != nil {
		log.Println(err)
	}

	reader := bufio.NewReader(&b)
	client := &http.Client{}
	req, err := http.NewRequest("POST", "https://api.sendinblue.com/v2.0/email", reader)
	if err != nil {
		log.Println(err)
	}

	req.Header.Set("api-key", apiKey)
	res, err := client.Do(req)
	if err != nil {
		log.Println(err)
	}

	res.Write(os.Stdout)

	return nil
}

func SendMail(emailType string, context map[string]interface{}, to string) {
	var b bytes.Buffer
	writer := bufio.NewWriter(&b)
	var err error
	switch emailType {
	case EMAIL_VERIFICATION:
		renderer := EmailTemplates.HTML(EMAIL_VERIFICATION + ".tmpl")
		err = renderer.Render(writer, context)
		if err != nil {
			log.Println(err)
		}
		err = writer.Flush()
		if err != nil {
			log.Println(err)
		}
		err = sendMailWithSendinblue("Verify your email address", b.String(), to)
		if err != nil {
			log.Println(err)
		}
		break
	default:
		break
	}
}
