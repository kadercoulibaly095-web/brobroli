// Colle ici les infos de ton projet Supabase (Settings > API).
// Tant que c'est vide, le site fonctionne en mode test (données gardées sur cet appareil seulement).
var CONFIG = { SUPABASE_URL: "//cnggjqttckhcopxwgeao.supabase.co", SUPABASE_KEY: "sb_publishable_s0hEOVXnltK4xCsq9_w_LQ_PtT8_x5y" };
var DEMO = !CONFIG.SUPABASE_URL;

function esc(s) {
  return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
    return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
  });
}
function fmt(n) {
  return Number(n).toLocaleString("fr-FR").replace(/[\u202f\u00a0]/g, " ") + " F";
}
function slugify(t) {
  return String(t).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 30);
}
function headers() {
  return { apikey: CONFIG.SUPABASE_KEY, Authorization: "Bearer " + CONFIG.SUPABASE_KEY, "Content-Type": "application/json" };
}
function saveShop(shop) {
  if (DEMO) {
    if (localStorage.getItem("shop:" + shop.slug)) return Promise.reject(new Error("taken"));
    localStorage.setItem("shop:" + shop.slug, JSON.stringify(shop));
    return Promise.resolve();
  }
  var h = headers(); h.Prefer = "return=minimal";
  return fetch(CONFIG.SUPABASE_URL + "/rest/v1/shops", { method: "POST", headers: h, body: JSON.stringify(shop) })
    .then(function (r) {
      if (r.status === 409) throw new Error("taken");
      if (!r.ok) throw new Error("fail");
    });
}
function loadShop(slug) {
  if (DEMO) {
    var s = localStorage.getItem("shop:" + slug);
    return Promise.resolve(s ? JSON.parse(s) : null);
  }
  return fetch(CONFIG.SUPABASE_URL + "/rest/v1/shops?select=*&slug=eq." + encodeURIComponent(slug), { headers: headers() })
    .then(function (r) { if (!r.ok) throw new Error("fail"); return r.json(); })
    .then(function (a) { return a[0] || null; });
}
// Réduit la photo (max 640 px) pour garder la base de données légère
function shrink(file, max) {
  return new Promise(function (res, rej) {
    var fr = new FileReader(), img = new Image();
    fr.onerror = rej; img.onerror = rej;
    fr.onload = function () {
      img.onload = function () {
        var k = Math.min(1, max / Math.max(img.width, img.height)), c = document.createElement("canvas");
        c.width = Math.round(img.width * k); c.height = Math.round(img.height * k);
        c.getContext("2d").drawImage(img, 0, 0, c.width, c.height);
        res(c.toDataURL("image/jpeg", 0.7));
      };
      img.src = fr.result;
    };
    fr.readAsDataURL(file);
  });
}
