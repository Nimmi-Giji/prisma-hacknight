import { PrismaClient } from "@prisma/client/extension";

import { withPulse } from "@prisma/extension-pulse/node";

const pulsee = () => {
    return new PrismaClient().$extends(withPulse({ apiKey: process.env.PULSE_API_KEY || ''}));


};

declare const globalThis: {
    prismaGlobal: ReturnType<typeof pulsee>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? pulsee();

export default prisma;

if (process.env.NODE_ENV!== "production") globalThis.prismaGlobal = prisma;



