# Everything I learned so far

## Proxies 
Reverse and forward proxies. Clients may sometimes use something thats called a forward proxy. A forward proxy bounces a clients request from another 
machine to the server. The server sees a incoming request from the source of the forward proxies IP address. A reverse client is used for the opposite
of that affect. The client may send a request to a server domain. The request goes through a reverse proxy. Then the reverse proxy bounces the request 
to the server. The server may then respond to the request where the reverse proxy is located. Then the final message will be routed to the client. This
is very useful for using load balancers. Load balancers can have many different schemes. To sum up their use, is they are used to do asynchronous work
from the back end api. Load balancers may have server selection strategies. Server selection strategies aim to decrease the load on a given server. Instead
of using one server to service many requests. You may set up many servers to handle n number of requests. A load balancer (reverse proxy) can then bounce 
a request to a server. Depending on the request and service your server provides will alter your server selection strategy. 

Server Selection Strategies: 
    1. Round Robin (optional weight)
    2. Random Selection (As the name implies)
    3. Performance Based (Server may have better performance thus able to handle more data)
    4. IP-Routing (Servicing regions of users can bounce to certain servers)
    5. Path Based (URL path)

## Sharding and Replication


## Availability

The health of your companies financial wealth is directly correlated to your availability of your asset. If a server goes down, that 
can mean certain features are inaccessible. This can lose profit from your buisness. It is important to strategize how to keep your
server availability high. This can be acheived through monitoring tools like loggers. Loggers keep key metrics about your system 
performance. This performance can be visualized using applications like Grafana. Maintenence is required for servers. This is called
planned downtime. Planned downtime is the time you plan on having servers down on a daily, weekly or yearly basis. Then there is 
unplanned downtime. Unplanned downtime occurs when a server crashes. Or unexpected events occur simultaneously and the server needs to 
be shut down. Those events can be associated with alert levels. Segment different parts of your system depending on how crucial they are
to client transactions. Identifying these segments enables placeholders to trigger based on their severity. Some may require a server 
restart, others may just require some attention for future debugging. SLI, SLO, SLA, are key terms when managing and selling availablity of 
a server. [3]

## Logging
[1] Use winston and morgan to log. Winston uses things called transports. A trasnport carries the log data to file, console, or http.
Summary of settings for transport: 
    1. Level - level of messages to log
    2. filename - the file to be used to write log data
    3. handleExceptions - catch and log unhandled exceptions
    4. json - records log data in json format
    5. maxsize - Max size of log file, in bytes, before a new file will be created
    6. maxFiles - Limit the number of files created when the size of the logfile is exceeded
    7. colorize - Colorize output. 

Logging levels:
    0: error
    1: warn
    2: info 
    3: verbose
    4: debug
    5: silly

[2] Prometheus is a logging db that can monitor your nodejs application. When you're monitoring you need to solve the following challenges
    1. Instrumentation: Safely instrumenting our code with minimal performance overhead
    2. Metrics exposition: Exposing our metrics for Prometheus with an HTTP endpoint
    3. Hosting Prometheus: Having a well configured Prometheus running
    4. Extracting value: Writing queires that are statistically correct
    5. Visualizing: Building dashboards and visualizing our queries
    6. AlertingGET : Setting up efficient alerts
    7. Paging: Get notified about alerts with applying escalation policies for paging

[4] Docker Host Monitoring with Prometheus and Grafana
    Warning(Using this in a production setting: Set up security settings. Launching this exposes the active ports. Look into documentation [5])

Using Grafana 
### References
[1] https://www.digitalocean.com/community/tutorials/how-to-use-winston-to-log-node-js-applications
[2] https://blog.risingstack.com/node-js-performance-monitoring-with-prometheus/
[3] https://www.fiixsoftware.com/how-do-maintainability-and-reliability-affect-availability/#:~:text=System%20availability%20(also%20known%20as,Functioning%20equipment
[4] https://github.com/vegasbrianc/prometheus/