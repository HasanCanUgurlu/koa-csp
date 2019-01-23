import validatePolicy from './validate-policy'
import formatPolicy from './format-policy'


// default config
const defaultParams = {
  // 是否显示警告信息
  enableWarn: true,
  policy: {
    'default-src': ['self'],
  },
};

/**
 * @desc Set Content-Security-Policy
 * @param {Object} param
 * @param {bool} param.enableWarn enable warn log
 * @param {Object} param.policy csp policy
 */
export default function ({ enableWarn = true, policy = {} } = defaultParams) {
  return async (ctx, next) => {
    if (enableWarn) validatePolicy(policy);

    const policyStr = formatPolicy(policy)
      .map(directive => directive.join(' '))
      .join(';')

    ctx.set('Content-Security-Policy', policyStr);
    await next();
  };
}
