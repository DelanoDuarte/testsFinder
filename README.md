# TestsFinder

# Running

## Running separated environments

### Setup 
```
python install -r requirements.txt
```

#### Execute Django Migrations
```
python manage.py makemigrations

python manage.py migrate
```

#### Run Local Server
```
python manage.py runserver
```

### Web
On the web folder, do the following instructions

#### Project setup
```
npm install
```

#### Compiles and hot-reloads for development
```
npm run dev
```

#### Compiles and minifies for production
```
npm run build
```

## Running with Docker

#### Build Image
```
docker-compose build
```

#### Start Container
```
docker-compose up
```

#### Testing on Browser

http://localhost:3000