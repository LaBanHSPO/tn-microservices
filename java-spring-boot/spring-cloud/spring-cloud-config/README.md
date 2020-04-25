### Build base image:
```sh
docker build -t 
```

### Build config server
```sh
cd server && mvn package spring-boot:repackage
cp server/target/server-1.0-SNAPSHOT.jar ./files/config-server.jar
docker build -f server/Dockerfile -t registry.s2.wedesign.vn/config_server:latest --rm=true .
```

### Build config client
```sh
cd client && mvn package spring-boot:repackage
cp client/target/client-1.0-SNAPSHOT.jar ./files/config-client.jar
docker build -f client/Dockerfile -t registry.s2.wedesign.vn/config_client:latest --rm=true .
```

### Push images
```sh
 docker push registry.s2.wedesign.vn/config_server:latest
 docker push registry.s2.wedesign.vn/config_client:latest
 ```

 ### Deploy
 ```sh
 docker stack deploy -c compose.yml java_spring_boot
 ```