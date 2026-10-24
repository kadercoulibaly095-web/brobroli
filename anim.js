(function () {
  if (!("IntersectionObserver" in window)) return;
  if (window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  var els = document.querySelectorAll(".claim,section h2,section .lead,.why div,.steps li,.tarif,.faq details,.final,.cart,.items");
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  els.forEach(function (el) {
    var i = Array.prototype.indexOf.call(el.parentNode.children, el);
    el.style.setProperty("--d", ((i % 4) * 0.08) + "s");
    el.classList.add("rv");
    io.observe(el);
  });
})();
