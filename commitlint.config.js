module.exports = {
  extends: ['@commitlint/config-conventional'],
  plugins: ['commitlint-plugin-function-rules'],
  rules: {
    'type-empty': [0],
    'subject-empty': [0],
    'type-enum': [0],
    'function-rules/type-enum': [
      2,
      'always',
      (parsed) => {
        const headerRegex =
          /^(DATS-\d+)|(build|chore|ci|docs|feat|fix|perf|refactor|revert|style|test): (.+)$/;
        const isHeaderValid = parsed.header.match(headerRegex);
        if (isHeaderValid) {
          return [true];
        }
        return [false, `header must match this regex: ${headerRegex}`];
      },
    ],
  },
};
