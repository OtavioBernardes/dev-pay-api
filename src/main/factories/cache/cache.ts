import RedisCache from "../../../external/cache/redis";
import { Cache } from "../../../use-cases/ports/cache";
import * as dotenv from "dotenv";
dotenv.config();

export default class CacheFactory {
    private static cache: Cache;
    
    static make() {
        if (!this.cache) {
            this.cache = new RedisCache(
                process.env.REDIS_HOST || "localhost",
                parseInt(process.env.REDIS_PORT || "6379"),
                1000);
            this.cache.connect();
        }

        return this.cache;
    }
}