#### Run
```shell script
make shell
pipenv run start
```

#### Migrations
- Check db status
```shell script
cd migrations
make check #
```
- Generate migration version files
```shell script
make gen
```

- Migration up
```shell script
make commit
```

- Migration revert
```shell script
make down
```

#### Lint
Just run the command
```bash
make lint
```

#### Unit Tests
Just run the command
```bash
make test
```

#### Unit Tests
Just run the command
```bash
make run/docker-compose-structure
make test/integration
```
