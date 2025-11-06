"use strict";
/**
 * Copyright 2025-present Coinbase Global, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.toCamelCase = toCamelCase;
function toCamelCase(obj, seen = new WeakSet()) {
    if (obj === null || typeof obj !== 'object')
        return obj; // Handle non-object values
    // Prevent circular references
    if (seen.has(obj)) {
        throw new Error('Circular reference detected');
    }
    seen.add(obj);
    if (Array.isArray(obj)) {
        // Recursively handle arrays
        return obj.map((item) => toCamelCase(item, seen));
    }
    return Object.entries(obj).reduce((acc, [key, value]) => {
        // Convert snake_case key to camelCase
        const camelCaseKey = key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
        // Recursively process values if they are objects or arrays
        acc[camelCaseKey] = toCamelCase(value, seen);
        return acc;
    }, {});
}
