import uuid from 'uuid';
import isUuid from 'is-uuid';

export function generateIdentifier() {
    return uuid.v4();
}

export function isIdentifier(identifier) {
    return typeof identifier === 'number' || isUuid.v4(identifier)
}
