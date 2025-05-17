export const mappingTargetAPI = (path: string): string => {
    if (path.startsWith('/api/auth')) {
        return 'http://auth:3001';
    }

    if (path.startsWith('/api/event')) {
        return 'http://event:3002';
    }

    return 'http://default';
};
