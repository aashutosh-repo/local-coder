import { CompletionContext } from "../../../context/models/CompletionContext";

export class CacheKeyBuilder {

    static build(context: CompletionContext): string {

        return [

            context.language,

            context.fileName,

            context.prefix,

            context.suffix

        ].join("::");

    }

}