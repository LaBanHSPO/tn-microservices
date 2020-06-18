package db

import (
	"context"
	"database/sql"
	"encoding/json"
	"fmt"
	"github.com/godror/godror"
	"github.com/pkg/errors"
	"os"
	"reflect"
	"time"
)

func oraContext(name string) context.Context {
	return godror.ContextWithTraceTag(context.Background(), godror.TraceTag{Module: "ORA" + name})
}

type jsonNullInt64 struct {
	sql.NullInt64
}

func (v jsonNullInt64) MarshalJSON() ([]byte, error) {
	if !v.Valid {
		return json.Marshal(nil)
	}
	return json.Marshal(v.Int64)
}

type jsonNullFloat64 struct {
	sql.NullFloat64
}


func (v jsonNullFloat64) MarshalJSON() ([]byte, error) {
	if !v.Valid {
		return json.Marshal(nil)
	}
	return json.Marshal(v.Float64)
}

type jsonNullTime struct {
	sql.NullTime
}

var jsonNullInt64Type = reflect.TypeOf(jsonNullInt64{})
var jsonNullFloat64Type = reflect.TypeOf(jsonNullFloat64{})
var jsonNullTimeType = reflect.TypeOf(jsonNullTime{})
var nullInt64Type = reflect.TypeOf(sql.NullInt64{})
var nullFloat64Type = reflect.TypeOf(sql.NullFloat64{})
var nullTimeType = reflect.TypeOf(sql.NullTime{})

func SQLToJSON(rows *sql.Rows) ([]byte, error) {
	columns, err := rows.Columns()
	if err != nil {
		return nil, fmt.Errorf("Column error: %v", err)
	}

	tt, err := rows.ColumnTypes()
	if err != nil {
		return nil, fmt.Errorf("Column type error: %v", err)
	}

	types := make([]reflect.Type, len(tt))
	for i, tp := range tt {
		st := tp.ScanType()
		if st == nil {
			return nil, fmt.Errorf("Scantype is null for column: %v", err)
		}
		switch st {
		case nullInt64Type:
			types[i] = jsonNullInt64Type
		case nullFloat64Type:
			types[i] = jsonNullFloat64Type
		case nullTimeType:
			types[i] = jsonNullTimeType
		default:
			types[i] = st
		}
	}

	values := make([]interface{}, len(tt))
	data := make(map[string][]interface{})

	for rows.Next() {
		for i := range values {
			values[i] = reflect.New(types[i]).Interface()
		}
		err = rows.Scan(values...)
		if err != nil {
			return nil, fmt.Errorf("Failed to scan values: %v", err)
		}
		for i, v := range values {
			data[columns[i]] = append(data[columns[i]], v)
		}
	}

	return json.Marshal(data)
}

const maxSessions = 16

func GetConnection() *sql.DB {
	ctx, cancel := context.WithTimeout(oraContext("SEC_DB"), 30*time.Second)
	defer cancel()
	P := godror.ConnectionParams{
		CommonParams: godror.CommonParams{
			Username: os.Getenv("ORACLE_USER"),
			Password: os.Getenv("ORACLE_PASSWORD"),
			DSN:      os.Getenv("ORACLE_DSN"),

			EnableEvents: true,
		},
		ConnParams: godror.ConnParams{
			ConnClass: "POOLED",
		},
		PoolParams: godror.PoolParams{
			MinSessions: 2, MaxSessions: maxSessions, SessionIncrement: 2,
			WaitTimeout:    5 * time.Minute,
			MaxLifeTime:    5 * time.Minute,
			SessionTimeout: 5 * time.Minute,
		},
		StandaloneConnection: godror.DefaultStandaloneConnection,
	}

	var (
		db                           *sql.DB
		connectString                string
		clientVersion, serverVersion godror.VersionInfo
	)

	connectString = P.StringWithPassword()
	var err error
	if db, err = sql.Open("godror", connectString); err != nil {
		panic(errors.Errorf("Connect Oracle Error: %s: %+v", connectString, err))
	}

	if err = godror.Raw(ctx, db, func(cx godror.Conn) error {
		if clientVersion, err = cx.ClientVersion(); err != nil {
			return err
		}
		fmt.Println("Client:", clientVersion, "Timezone:", time.Local.String())
		if serverVersion, err = cx.ServerVersion(); err != nil {
			return err
		}
		dbTZ := cx.Timezone()
		fmt.Println("Server:", serverVersion, "Timezone:", dbTZ.String())
		return nil
	}); err != nil {
		panic(err)
	}

	fmt.Printf("Connected to Oracle\n")
	//
	//insert, err := db.Query("INSERT INTO test (COL) VALUES ( :col )", 1002)
	//// if there is an error inserting, handle it
	//if err != nil {
	//	panic(err.Error())
	//}
	//// be careful deferring Queries if you are using transactions
	//defer insert.Close()
	//
	//query := `begin  SEC.X_RESULT.PRIZE_XS_LS(:fdate, :ptdate, :Dest); end;`
	//var refCursor driver.Rows
	//_, err = db.ExecContext( ctx,query, "01-01-2020", "01-01-2020", sql.Out{Dest: &refCursor})
	//
	//if err != nil {
	//	panic(err);
	//}
	//
	//type rowType struct {
	//	ID       		sql.NullInt64
	//	PRIZE_NAME      sql.NullString
	//	PRIZE_TYPE      sql.NullString
	//	RESULT        	sql.NullString
	//	DATE_OPEN		sql.NullTime
	//}
	//
	//resultSet := refCursor.(driver.Rows)
	//for index,element := range resultSet.Columns(){
	//	fmt.Print(index,"=>",element, ";")
	//}
	//rowI  := make([]driver.Value, len(resultSet.Columns()))
	//i := 0
	//var records []rowType
	//for {
	//	//var row rowType
	//	err = resultSet.Next(rowI );
	//	i++
	//	if i > 10 {
	//		resultSet.Close()
	//		break
	//	}
	//	if err == io.EOF {
	//		resultSet.Close()
	//		break
	//	} else if err != nil {
	//		log.Fatal(err)
	//	} else {
	//		var record = new(rowType)
	//		record.ID.Scan(rowI[0])
	//		record.PRIZE_NAME.Scan(rowI[1])
	//		record.PRIZE_TYPE.Scan(rowI[2])
	//		record.RESULT.Scan(rowI[3])
	//		record.DATE_OPEN.Scan(rowI[4])
	//		records = append(records, *record)
	//	}
	//}
	//fmt.Printf("\nRecords %v\n", records)
	return db
}
