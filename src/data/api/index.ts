const getURL = (query: string) =>
  `https://api.github.com/repos/graphql-compose/graphql-compose-examples/contents/examples/northwind/data/csv/${query}.csv`;

const getCsvDataByTableName = async (query: string) => {
  try {
    const response = await fetch(getURL(query), {
      headers: {
        Accept: "application/vnd.github.v4+raw",
      },
    });
    const jsonVal = await response.json();
    return {error: false, response: jsonVal};
  } catch (error) {
    return {error: true, response: error}
  }
};

export { getCsvDataByTableName };
