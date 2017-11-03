import uuid from 'uuid';

export function generateIdentifier(): string {
    return uuid.v4() as string;
}
