import uuid = require('uuid');

export function generateIdentifier(): string {
    return uuid.v4() as string;
}
