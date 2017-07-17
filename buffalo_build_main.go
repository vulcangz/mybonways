package main

import (
	"fmt"
	"log"
	"os"

	"github.com/markbates/grift/grift"
	_ "github.com/tonyalaribe/mybonways/a"
	
	"github.com/gobuffalo/packr"
	"github.com/markbates/pop"
	"github.com/tonyalaribe/mybonways/models"
	
	
	_ "github.com/tonyalaribe/mybonways/grifts"
	
)

var version = "unknown"
var buildTime = "unknown"

func main() {
	args := os.Args
	if len(args) == 1 {
		originalMain()
	}
	c := args[1]
	switch c {
	
	case "migrate":
		migrate()
	
	case "start", "run", "serve":
		printVersion()
		originalMain()
	case "version":
		printVersion()
	case "task", "t", "tasks":
		err := grift.Run(args[2], grift.NewContext(args[2]))
		if err != nil {
			log.Fatal(err)
		}
	default:
		log.Fatalf("Could not find a command named: %s", c)
	}
}

func printVersion() {
	fmt.Printf("mybonways version %s (%s)\n\n", version, buildTime)
}


func migrate() {
	box, err := pop.NewMigrationBox(packr.NewBox("./migrations"), models.DB)
	if err != nil {
		log.Fatalf("Failed to unpack migrations: %s", err)
	}
	err = box.Up()
	if err != nil {
		log.Fatalf("Failed to run migrations: %s", err)
	}
}

