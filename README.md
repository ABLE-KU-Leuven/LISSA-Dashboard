# LISSA

## How to run.

Import data from JSON files into meteor database.

```
mongoimport --host localhost:3001 --db meteor generic_courses.json
mongoimport --host localhost:3001 --db meteor generic_cse.json
mongoimport --host localhost:3001 --db meteor generic_grades.json
mongoimport --host localhost:3001 --db meteor generic_history_sept.json
mongoimport --host localhost:3001 --db meteor generic_students.json
mongoimport --host localhost:3001 --db meteor generic_examsuccess.json
mongoimport --host localhost:3001 --db meteor ijkingstoets.json
```

Start meteor with the flag.

``
meteor --settings settings.json
http://localhost:3000/dev/2016/653523
``
