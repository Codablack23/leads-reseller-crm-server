type KeyPath = string; // e.g., "user.password", "meta.info.secret"

class Sanitizer {
    /**
     * Deeply removes specified keys from the object.
     * @param obj The object to sanitize
     * @param paths An array of key paths (supports nested keys via dot notation)
     */
    sanitizeObject<T extends object>(obj: T, paths: KeyPath[]): Partial<T> {
        const result = structuredClone(obj); // deep clone

        for (const path of paths) {
            this.deleteKeyPath(result, path);
        }

        return result;
    }

    private deleteKeyPath(obj: any, path: string) {
        const keys = path.split(".");
        let current = obj;

        for (let i = 0; i < keys.length - 1; i++) {
            if (typeof current[keys[i]] !== "object" || current[keys[i]] === null) {
                return; // invalid path
            }
            current = current[keys[i]];
        }

        delete current[keys[keys.length - 1]];
    }

    sanitizeEmptyObjectProp<T extends object>(obj: T): Partial<T> {
        const result = {} as Partial<T>;

        for (const key in obj) {
            if (!Object.prototype.hasOwnProperty.call(obj, key)) continue;

            const value = obj[key];

            const isEmptyObject =
                typeof value === "object" &&
                value !== null &&
                !Array.isArray(value) &&
                Object.keys(value).length === 0;

            if (
                value !== undefined &&
                value !== null &&
                value !== "" &&
                !isEmptyObject
            ) {
                result[key] = value;
            }
        }

        return result;
    }
    /**
     * Sanitize a specific property in an object using a provided serializer function.
     * @param obj The object to sanitize.
     * @param key The key of the property to sanitize.
     * @param serializer A function that transforms the value of the given key.
     * @returns A new object with the sanitized property.
     */
    async sanitizeProperty<T extends object, K extends keyof T>(
        obj: T,
        key: K,
        serializer: (value: T[K]) => Promise<T[K]>
    ): Promise<Partial<T>> {
        const result = { ...obj };
        if (key in result && typeof serializer === 'function') {
            result[key] = await serializer(result[key]);
        }
        return result;
    }

}


export const SanitizerProvider = new Sanitizer()




