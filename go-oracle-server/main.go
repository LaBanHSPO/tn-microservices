package main

import (
	"context"
	"database/sql"
	"fmt"
	"github.com/99designs/gqlgen/graphql"
	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"log"
	"net/http"
	"os"
	"sec.com/init/db"
	"sec.com/init/generated"
	"sec.com/init/resolvers"
	"time"
)

func setupRouter(db *sql.DB) *gin.Engine {
	r := gin.Default()
	r.Static("/public", "./public")

	client := r.Group("/api")
	{
		client.GET("/health-check", func(c *gin.Context) {
			var (
				today time.Time
				err error
			)
			qry := "SELECT TRUNC(SYSDATE) FROM DUAL"
			if db.QueryRow(qry).Scan(&today); err != nil {
				c.JSON(500, gin.H{
					"messages" : "Connect Oracle failed",
				});
			}
			fmt.Printf("OracleDate: %s\n", today)
			c.JSON(200, gin.H{
				"messages" : "Server all okay",
				"ora_date": today,
			});
		})
	}

	return r
}

func main() {

	if os.Getenv("APP_ENV") != "production" {
		godotenv.Load()
	}

	var db = db.GetConnection()
	srv := handler.NewDefaultServer(generated.NewExecutableSchema(resolvers.NewResolver(db)))

	srv.AroundFields(func(ctx context.Context, next graphql.Resolver) (res interface{}, err error) {
		//rc := graphql.GetFieldContext(ctx)
		//fmt.Println("Entered", rc.Object, rc.Field.Name)
		res, err = next(ctx)
		//fmt.Println("Left", rc.Object, rc.Field.Name, "=>", res, err)
		return res, err
	})

	http.Handle("/", playground.Handler("Sec", "/query"))
	http.Handle("/query", srv)

	r := setupRouter(db)
	go r.Run(":4001") //
	fmt.Println("Restful Server started at port 4001...")

	fmt.Println("Server started at port 4000...")
	log.Fatal(http.ListenAndServe(":4000", nil))

}
