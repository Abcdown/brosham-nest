export async function saveListing(listing: any) {
  const key = localStorage.getItem("BP_API_KEY");
  if (!key) throw new Error("Missing BP_API_KEY");

  const res = await fetch(`/api/listing-save.php?key=${encodeURIComponent(key)}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(listing),
  });

  const text = await res.text();
  if (!res.ok) throw new Error(`Save failed (${res.status}): ${text.slice(0, 200)}`);

  try { return JSON.parse(text); }
  catch { throw new Error("Invalid JSON from listing-save.php"); }
}
