import { RedisClientType, createClient } from 'redis';
import { Cache } from '../../use-cases/ports/cache';

export default class RedisCache implements Cache {
    private cache: RedisClientType;
    private ttl: number;

    constructor(host: string, port: number, ttl: number) {
        this.ttl = ttl;
        this.cache = createClient({ url: `redis://${host}:${port}` });
    }

    async connect() {
        try {
            await this.cache.ping();
        } catch (err) {
            try {
                await this.cache.connect();
                this.cache.on('connect', () => {
                    console.log(`Redis connection established`);
                });

                this.cache.on('error', (error) => {
                    console.log(`Redis error, service degraded: ${error}`);
                });
            } catch (error) {
                console.log(`Fail to connect to redis with error: ${error}`);
                throw error;
            }
        }
    }

    async get(key: string): Promise<string> {
        const keyValue = await this.cache.get(key);
        if (keyValue) return keyValue;

        throw { notFound: true };
    }

    async set(key: string): Promise<boolean> {
        const resultSet = await this.cache.set(key, key, { PX: this.ttl });
        return !resultSet ? false : !!resultSet
    }

    async flush() {
        await this.cache.flushAll();
    }

    async delete(key: string) {
        this.cache.del(key);
    }
}