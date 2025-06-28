import { Redis } from '@upstash/redis'
import { Ratelimit } from '@upstash/ratelimit'


const Limiter = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(3, '1 m'),
    analytics: true,
})


export { Limiter };