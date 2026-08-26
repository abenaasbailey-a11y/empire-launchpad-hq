/** Minimal CSV helpers for admin exports. */

function escapeCell(value: unknown): string {
  if (value === null || value === undefined) return "";
  const text = String(value).replace(/\r?\n/g, " ").trim();
  return /[",;]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

export function toCsv(
  columns: { key: string; label: string }[],
  rows: Record<string, unknown>[],
): string {
  const head = columns.map((c) => escapeCell(c.label)).join(",");
  const body = rows.map((row) => columns.map((c) => escapeCell(row[c.key])).join(","));
  return [head, ...body].join("\r\n");
}

export function downloadCsv(filename: string, csv: string): void {
  // BOM keeps accents readable when the file is opened in Excel.
  const blob = new Blob([`\uFEFF${csv}`], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}
