const TABLE_NAMES = [
    "categories",
    "customers",
    "employee_territories",
    "employees",
    "order_details",
    "orders",
    "products",
    "regions",
    "shippers",
    "suppliers",
    "territories",
  ];

const TABLE_COLUMN_WIDTH = 150;
  
const QUERIES_HISTORY = TABLE_NAMES.map((tableName) => {
  return {
    query: `select * from ${tableName}`,
    timestamp: new Date(),
    tableName: tableName,
  };
});

export { TABLE_NAMES, TABLE_COLUMN_WIDTH, QUERIES_HISTORY}