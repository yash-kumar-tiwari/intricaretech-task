export function getHealthScoreColor(score) {
  if (score > 70) return "#28C76F";
  if (score > 40) return "#FF9F43";
  return "#EA5455";
}

export function getHealthScoreConfig(score) {
  const r = 18;
  const circumference = 2 * Math.PI * r;
  const offset = circumference * (1 - score / 100);
  const color = getHealthScoreColor(score);
  return { r, circumference, offset, color };
}

export function paginateList(list, page, itemsPerPage) {
  const start = (page - 1) * itemsPerPage;
  return list.slice(start, start + itemsPerPage);
}
