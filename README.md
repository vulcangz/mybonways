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

### Download and install POSTGIS extension for postgresql before porceeding to the next step


Create the tables by running the migrations:

	$ buffalo db migrate up


Add data to the database for development:

	$ buffalo task db:seed


Finally, start the application (in the repository directory $GOPATH/src/github.com/tonyalaribe/mybonways):

	$ buffalo dev

This buffalo command will watch the application and automatically rebuild the Go binary and all it's assets.
Open your browser to localhost:3000. The page should appear.

Go over to [http://gobuffalo.io](http://gobuffalo.io) to explore the buffalo documentation.