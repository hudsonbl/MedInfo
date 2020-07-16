# Everything I learned so far

## Proxies 
Reverse and forward proxies. Clients may sometimes use something thats called a forward proxy. A forward proxy bounces a clients request from another 
machine to the server. The server sees a incoming request from the source of the forward proxies IP address. A reverse client is used for the opposite
of that affect. The client may send a request to a server domain. The request goes through a reverse proxy. Then the reverse proxy bounces the request 
to the server. The server may then respond to the request where the reverse proxy is located. Then the final message will be routed to the client. This
is very useful for using load balancers. Load balancers can have many different schemes. To sum up their use, is they are used to do asynchronous work
from the back end api. Load balancers may have server selection strategies. Server selection strategies aim to decrease the load on a given server. Instead
of using one server to service many requests. You may set up many servers to handle n number of requests. A load balancer (reverse proxy) can then bounce 
a request to a server. Depending on the request and service your server provides will alter your server selection strategy. <br />
<br />
**Server Selection Strategies:** <br />
    1. Round Robin (optional weight)<br />
    2. Random Selection (As the name implies)<br />
    3. Performance Based (Server may have better performance thus able to handle more data)<br />
    4. IP-Routing (Servicing regions of users can bounce to certain servers)<br />
    5. Path Based (URL path)<br />

Traefik only uses a Round Robin Server Selection Strategy for its load balancer.

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
[1] Use winston and morgan to log. Winston uses things called transports. A trasnport carries the log data to file, console, or http.<br />
**Summary of settings for transport: **<br />
    1. Level - level of messages to log<br />
    2. filename - the file to be used to write log data<br />
    3. handleExceptions - catch and log unhandled exceptions<br />
    4. json - records log data in json format<br />
    5. maxsize - Max size of log file, in bytes, before a new file will be created<br />
    6. maxFiles - Limit the number of files created when the size of the logfile is exceeded<br />
    7. colorize - Colorize output. <br />
<br />
**Logging levels:**<br />
    0: error<br />
    1: warn<br />
    2: info <br />
    3: verbose<br />
    4: debug<br />
    5: silly<br />

[2] Prometheus is a logging db that can monitor your nodejs application. When you're monitoring you need to solve the following challenges<br />
    1. Instrumentation: Safely instrumenting our code with minimal performance overhead<br />
    2. Metrics exposition: Exposing our metrics for Prometheus with an HTTP endpoint<br />
    3. Hosting Prometheus: Having a well configured Prometheus running<br />
    4. Extracting value: Writing queires that are statistically correct<br />
    5. Visualizing: Building dashboards and visualizing our queries<br />
    6. AlertingGET : Setting up efficient alerts<br />
    7. Paging: Get notified about alerts with applying escalation policies for paging<br />

[4] Docker Host Monitoring with Prometheus and Grafana<br />
    Warning(Using this in a production setting: Set up security settings. Launching this exposes the active ports. Look into documentation [5])<br />

<br />
[5] "Promethues is a all purpose metric scraper. It is a monitoring/alerting solution responsible for sending events/metrics to be ingested.
It is configured to visit exporters to collect the metric for aggregation. Exporter is a program that will prodcue the metrics plaintext page when asked." (all this is straight from website)

Sort of the logging ecosystem works like this. Prometheues logs incoming requests to another server. Grafana takes the data every predestinated time. It will graphically monitor the data fed from Prometheus. Sends alerts based off of key metrics you explicitly declare for both Prometheus and Grafana to handle.

Using Grafana 
### References
[1] https://www.digitalocean.com/community/tutorials/how-to-use-winston-to-log-node-js-applications<br />
[2] https://blog.risingstack.com/node-js-performance-monitoring-with-prometheus/<br />
[3] https://www.fiixsoftware.com/how-do-maintainability-and-reliability-affect-availability/#:~:text=System%20availability%20(also%20known%20as,Functioning%20equipment<br />
[4] https://github.com/vegasbrianc/prometheus/<br />
[5] https://medium.com/teamzerolabs/node-js-monitoring-with-prometheus-grafana-3056362ccb80</br>


### Useful commands
docker service ls
docker rm service {Service Name}