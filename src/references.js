import uuid from 'uuid';
import isUuid from 'is-uuid';

export function generateIdentifier() {
    return uuid.v4();
}

export function isReference(reference) {
    return typeof reference === 'number' || isUuid.v4(reference)
}
