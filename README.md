# MedInfo

Hell ya bruther!
version: '3.7'
services: 
    mysql-medinfo:
        image: mysql:latest
        restart: always
        container_name: mysql-medinfo-server
        env_file: .env
        ports:
            - 3306:3306
        volumes:
            - mysql-medinfo:/var/lib/mysql
            - ./server/db-init/:/docker-entrypoint-initdb.d
        environment: 
            MYSQL_RANDOM_ROOT_PASSWORD: 'yes'
            MYSQL_DATABASE: ${MYSQL_DATABASE}
            MYSQL_USER: ${MYSQL_USER}
            MYSQL_PASSWORD: ${MYSQL_PASSWORD}
        networks: 
            - mysql-net

    redis:
        hostname: redis
        image: redis:latest
        restart: always
        networks: 
            - redis-net
        
    server-api:
        build: 
            context: .
            dockerfile: Dockerfile
        image: nodejs
        container_name: fast-medinfo
        restart: unless-stopped
        env_file:
            - .env
        ports: 
            - 6000:6000
        environment:
            MYSQL_DATABASE: ${MYSQL_DATABASE}
            MYSQL_USER: ${MYSQL_USER}
            MYSQL_PASSWORD: ${MYSQL_PASSWORD}
            MYSQL_HOST: mysql-medinfo-server
            REDIS_HOST: ${REDIS_HOST}
            REDIS_PORT: ${REDIS_PORT}
            SECRET_KEY: ${SECRET_KEY}
            GMAIL_PASS: ${GMAIL_PASS}
            GMAIL_USER: ${GMAIL_USER}
        volumes:
            - .:/home/node/app
            - node_modules:/home/node/app/node_modules
        networks: 
            - redis-net 
            - mysql-net

networks:
    redis-net:
        driver: bridge
    mysql-net:
        driver: bridge

volumes: 
    mysql-medinfo:
        name: mysql-medinfo-data 
    node_modules:
   