import { CompletionContext } from "../../../context/models/CompletionContext";
import { CacheKeyBuilder } from "./CacheKeyBuilder";

export class CompletionCache {

    private cache = new Map<string, string>();

    get(context: CompletionContext): string | undefined {

        const key = CacheKeyBuilder.build(context);

        return this.cache.get(key);

    }

    put(
        context: CompletionContext,
        completion: string
    ) {

        const key = CacheKeyBuilder.build(context);

        this.cache.set(
            key,
            completion
        );

    }

}