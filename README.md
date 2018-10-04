# LISSA

LISSA (“Learning dashboard for Insights and Support during Study Advice”) is a learning analytics dashboard designed, developed, and evaluated in collaboration with student advisors. The overall objective of LISSA is to facilitate communication between student advisors and students by visualising grade data that is commonly available in any institution. More specifically, the dashboard attempts to support the dialogue between adviser and student through an overview of study progress, peer comparison, and by triggering insights based on facts as a starting point for discussion and argumentation. LISSA uses data that is available at any higher education institute: the grades of students, the list of courses in the program, the courses booked by a student, and the credits for each course. Beside bachelors programmes, LISSA also supports bridging programmes, which are programmes that allow students to enter an academic masters after completing a professional bachelors programme.

Screenshot: https://github.com/svencharleer/stbd/blob/master/LISSA-demo.png

## Online demo
This is a online demon of the LISSA dashboard deployed at the end of the academic year (after resits)
https://able.cs.kuleuven.be/demo-september/2016/1

## Pointers to publications
### Case study report
http://www.ableproject.eu/project/reports-three-institutional-case-studies/

### Data collection and utilization
http://www.ableproject.eu/project/report-methods-and-tools-to-collect-and-utilise-data/

### Visualization and analysis
http://www.ableproject.eu/project/report-methods-and-tools-to-visualise-and-analyse-learning-analytics-data/

### Scientific publications 
* Charleer, S., Moere, A. V., Klerkx, J., Verbert, K., & De Laet, T. (2017). Learning analytics dashboards to support adviser-student dialogue. IEEE Transactions on Learning Technologies. Volume 11, issue 3, https://ieeexplore.ieee.org/abstract/document/7959628/ 
* Millecamp, M., Gutiérrez, F., Charleer, S., Verbert, K., & De Laet, T. (2018, March). A qualitative evaluation of a learning dashboard to support advisor-student dialogues. In Proceedings of the 8th International Conference on Learning Analytics and Knowledge (pp. 56-60). https://dl.acm.org/citation.cfm?id=3170417 

## How to...
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
``

Test in browser (chrome) with this:

http://localhost:3000/dev/2016/653523
