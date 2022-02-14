function recursivelyStripNullValues(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map(recursivelyStripNullValues);
  }
  if (value !== null && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value).map(([key, value]) => [
        key,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        recursivelyStripNullValues(value),
      ]),
    );
  }
  if (value !== null) {
    return value;
  }
}

export default recursivelyStripNullValues;
