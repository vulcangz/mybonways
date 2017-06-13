# Welcome to Buffalo!

Thank you for choosing Buffalo for your web development needs.


## Database Setup

It looks like you chose to set up your application using a postgres database! Fantastic!

The first thing you need to do is open up the "database.yml" file and edit it to use the correct usernames, passwords, hosts, etc... that are appropriate for your environment.

You will also need to make sure that **you** start/install the database of your choice. Buffalo **won't** install and start postgres for you.

### Create Your Databases

Ok, so you've edited the "database.yml" file and started postgres, now Buffalo can create the databases in that file for you:

	$ buffalo db create -a


## Starting the Application

Buffalo ships with a command that will watch your application and automatically rebuild the Go binary and any assets for you. To do that run the "buffalo dev" command:

	$ buffalo dev

If you point your browser to [http://127.0.0.1:3000](http://127.0.0.1:3000) you should see a "Welcome to Buffalo!" page.

**Congratulations!** You now have your Buffalo application up and running.

## What Next?

We recommend you heading over to [http://gobuffalo.io](http://gobuffalo.io) and reviewing all of the great documentation there.

Good luck!

[Powered by Buffalo](http://gobuffalo.io)

# Mybonways

## Setup process for mybonways

Before cloning this repository, make you sure you have the following installed:

- [Golang](http://golang.org)  `1.7.x` or higher
- GCC for your operating system (prefarably linux or MACos) very Important.
- [Postgresql](https://www.postgresql.org)
- [Nodejs and npm](https://nodejs.org/)

After installing all of the above:

1. clone the repository to $GOPATH/src/github.com/tonyalaribe/mybonways like this: (Assuming you have your $GOPATH setup correctly)
```
	$ go get github.com/tonyalaribe/mybonways
```
2. Next install buffalo:
```
	$ go get -u -v github.com/gobuffalo/buffalo/buffalo
```
3. change directory to the repo ($GOPATH/src/github.com/tonyalaribe/mybonways) and Install javascript modules:
```
	$ npm install
```
4. Set up your database correctly according to the database.yml OR run:
```
	$ buffalo db create -a
```
buffalo will automatically setup the database.

NOTICE: If for any reason buffalo throws any errors of packages not found, change to its directory:

	$ cd $GOPATH/src/github.com/gobuffalo/buffalo/
	
and install it's dependencies (```go get ./...```)

	$ go get ./...

