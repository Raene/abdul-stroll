# My Strategy

Following the application specs which say:

- Lets assume you have N questions stored in a database, and each question needs to be assigned to a specific cycle
- The duration of each cycle is configurable and can vary (e.g., 1 day, 7 days, 14 days, 30 days).

I decided it will be best to have cycle rules in the database and the smallest unit of a cycle should be 1 second'

Why 1 second: well, by using seconds we can easily program any number of days or time for our cycle.

E.g we could say a cycle is 60s, so every hour depending on a region a new set of questions can be generated and we can still say 86400s per cycle, this will fit the every day for a cycle logic too. By doing that our cycle and question logic can offer more dynamism.

I also added a Start date, so cycles can be created in advance and start running once the start date arrives.

Questions are related to the Cycles by the cycle id and cycle number.

The cycle number is fetched dynamically by calculating how much time has passed since the start date of the cycle.

So if i create a daily cycle, when a user accesses the cycle for their region, the program looks at the start date and calculates the time elapsed from the start date and converts it to seconds to get the current cycle number/iteration.

E.g daily cycle is 86400 seconds, if it was starting today we get the difference for the number of seconds for the current time and the number of seconds for the start time. The difference is our time elapsed in seconds, now to get the cycle number, we divide the timeElapsed by our specified cycle which is 86400 in this case. That will give us the number of days that has passed since our start date. If the start date is the current date then it returns 0, so this is cycle 0. Now we can fetch A question that has cycle 0 and the cycle id

PROS

* No need to create multiple enums for each cycle e.g DAILY enum, MONTHLY enum, etc, as we measure everything by seconds
* Easier to maintain and add new cycles since we won;t have to also update the code everytime, an admin endpoint can take care of creating new Cycles and assigning the appropriate number of seconds for a cycle period

CONS

* The logic might be a bit tricky to understand on the first time
