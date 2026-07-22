import { adminGuard, json } from '../../../_auth.js';

export async function onRequestGet({ request, env }) {
  const guard = await adminGuard(request, env);
  if (guard.error) return guard.error;
  const report = { ok: false, binding: Boolean(env.DB), tables: [], postColumns: [], postCounts: [], checks: [] };
  if (!env.DB) return json({ ...report, error: 'D1 binding DB is missing.' }, 500);
  try {
    const time = await env.DB.prepare("SELECT datetime('now') AS database_time").first();
    report.databaseTime = time?.database_time || null;
    const { results: tableRows } = await env.DB.prepare("SELECT name FROM sqlite_master WHERE type='table' ORDER BY name").all();
    report.tables = tableRows.map((row) => row.name);
    if (!report.tables.includes('posts')) {
      report.checks.push({ name: 'posts table', ok: false, detail: 'Table posts does not exist. Run database initialization.' });
      return json(report, 200);
    }
    const { results: columns } = await env.DB.prepare('PRAGMA table_info(posts)').all();
    report.postColumns = columns.map((row) => row.name);
    const required = ['locale', 'translation_key', 'cover_image'];
    for (const column of required) report.checks.push({ name: `posts.${column}`, ok: report.postColumns.includes(column), detail: report.postColumns.includes(column) ? 'Available' : 'Missing migration column' });
    if (required.every((column) => report.postColumns.includes(column))) {
      const { results } = await env.DB.prepare('SELECT locale, COUNT(*) AS post_count FROM posts GROUP BY locale ORDER BY locale').all();
      report.postCounts = results;
      const fa = results.find((row) => row.locale === 'fa')?.post_count || 0;
      report.checks.push({ name: 'Persian posts', ok: fa > 0, detail: `${fa} found` });
    }
    report.ok = report.checks.every((check) => check.ok);
    return json(report);
  } catch (error) {
    console.error('D1 diagnostics error:', error);
    return json({ ...report, error: error instanceof Error ? error.message : 'D1 diagnostic failed.' }, 200);
  }
}
