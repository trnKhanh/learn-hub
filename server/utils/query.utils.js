exports.formatFilters = (filters) => {
  const keys = Object.keys(filters);
  const values = Object.values(filters);

  const filterKeys = keys.map((key) => `${key} = ?`).join(" AND ");
  const filterValues = values;

  return {
    filterKeys: filterKeys,
    filterValues: filterValues,
  };
};
