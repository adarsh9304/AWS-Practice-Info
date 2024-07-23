/*


-Feature flag (keeping in config service, based on geography),

-Charles testing tool,

-Exponential backoff for API retries,

-Request flow ( client -> Multi CDN -> LB -> Origin server -> DB),
 
-DB autoscaling is not recommended (takes lot of time 45 mins from her example for scaling 5 instances) (prescale is recommended after some calculations),

 -Increasing TTL of caches when there's a hockey spike (can or cannot help),

-API personalization (serving static response when having this hockey spikes),

-Always Prepare for plan B,C,D,

-Multi CDN Optimizer (decides where to send the traffic, used for live streamings),

-Cache Offload < 90%,

-Designing cache policy in CDN is important (offloading cache monitoring),

-Kafka,

-DNS issue mitigation at backend,

*/