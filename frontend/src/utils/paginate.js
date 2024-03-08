import _ from "lodash";

export function paginate(items, pageNumber, pageSize) {  // 10 , 1, 5   10, 2, 5
  const startIndex = (pageNumber - 1) * pageSize;  // 0   1*5=5
  return _(items)
    .slice(startIndex) // 0-4, 5-9
    .take(pageSize)
    .value();
}
