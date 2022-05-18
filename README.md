# lightfeather_challenge
Full Stack Engineer Challenge

An api service for consolidating supervisors and allowing employees to subscribe to any supervisor's notifications

## Quick Start
`docker-compose up --build`
## Local Start
### Django Backend (api)
`pip install requirements`

`python manage.py migrate`

`python manage.py getsupervisordata`

`python manage.py runserver`

you should be access endpoints ex. http://localhost:8000/api/supervisors

### React Frontend
`npm install -g yarn`

`cd notify-frontend`

`yarn install`

`yarn start`

you should be able to access the form at http://localhost:3000
