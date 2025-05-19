const routeMap = [
    { prefix: '/api/auth', target: 'http://auth:3001' },
    { prefix: '/api/users', target: 'http://auth:3001' },
    { prefix: '/api/events', target: 'http://event:3002' },
];

export const mappingTargetAPI = (path: string): string => {
    const route = routeMap.find((r) => path.startsWith(r.prefix));
    return route?.target || 'http://default';
};
