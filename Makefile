start: # Start the servers normally. 
	docker-compose up

build: # Restart and force build the servers. 
	docker-compose down -v
	docker-compose up --build

stop: # Shut down the servers normally. 
	docker-compose down

dbsync: # Syncronize the db schema.
	docker-compose exec fwe-api npm run typeorm schema:sync

fixtures: # Add the defined fixtures to the db.
	docker-compose exec fwe-api npm run fixtures

test: # Run all defined tests.
	docker-compose exec fwe-api npm run test
	docker-compose exec fwe-frontend npm run test

btest: # Run all backend tests.
	docker-compose exec fwe-api npm run test

ftest: # Run all frontend tests.
	docker-compose exec fwe-frontend npm run test

cypress: # Run cypress application.
	( cd ./fwe-app/cypress && npm i )
	( cd ./fwe-app/cypress && npm run cypress )
