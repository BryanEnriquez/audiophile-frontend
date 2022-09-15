import { useContext, Context } from 'react';

type Generator = <T>(ctx: Context<T | undefined>, err: string) => () => T;

const contextHookGenerator: Generator = (ctx, err) => () => {
  const context = useContext(ctx);
  if (context === undefined) throw new Error(err);
  return context;
};

export default contextHookGenerator;
