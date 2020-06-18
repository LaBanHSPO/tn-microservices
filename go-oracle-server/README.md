### sec server

This server with a few advanced features of graphql:
 - connections
 - unions
 - interfaces
 - enums
Server also support Gin framework for RESTful API

to run this server
```bash
go run main.go
```

generate go file when change schema.graphql
```
go run github.com/99designs/gqlgen generate
```

and open http://localhost:4000/graphql in your browser
and open http://localhost:4001/api/health-check in your browser (gin)
