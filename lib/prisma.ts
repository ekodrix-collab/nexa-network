import { PrismaClient } from '@prisma/client'

const createMockPrismaClient = () => {
  return new Proxy({}, {
    get(target, prop) {
      if (typeof prop === 'symbol' || ['then', 'catch', 'finally', 'toJSON', 'toString', 'valueOf'].includes(prop as string)) {
        return undefined;
      }
      if (prop === '$connect' || prop === '$disconnect') {
        return () => Promise.resolve();
      }
      if (prop === '$transaction') {
        return (args: any) => Promise.resolve(Array.isArray(args) ? args.map(() => ({})) : {});
      }
      // Mock models
      return new Proxy({}, {
        get(modelTarget, modelProp) {
          if (typeof modelProp === 'symbol' || ['then', 'catch', 'finally', 'toJSON', 'toString', 'valueOf'].includes(modelProp as string)) {
            return undefined;
          }
          return () => {
            if (modelProp === 'findMany') return Promise.resolve([]);
            if (modelProp === 'findUnique' || modelProp === 'findFirst') return Promise.resolve(null);
            if (modelProp === 'count') return Promise.resolve(0);
            if (modelProp === 'create' || modelProp === 'update' || modelProp === 'delete') return Promise.resolve({});
            return Promise.resolve(null);
          };
        }
      });
    }
  }) as unknown as PrismaClient;
};

const prismaClientSingleton = () => {
  if (!process.env.DATABASE_URL) {
    console.warn("DATABASE_URL is not set. Using mock Prisma client.");
    return createMockPrismaClient();
  }
  return new PrismaClient()
}

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>
}

const prisma = globalThis.prisma ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma
