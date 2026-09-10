/*
 * Nova trigger method: "highlight".
 *
 * Third trigger alongside the script's existing two, "whitespace" (a click on
 * content) and "ahref" (an internal link click). A reader who selects a run of
 * text is showing at least as much intent as one who clicks whitespace, so a
 * finished selection opens the same pop-under through the same pipeline:
 * server pre-check (pit), recent-show guard, medium selection, allez URL.
 *
 * "A tiny bit more" than whitespace: when the selected text names one of the
 * destinations the classifier already found on the page, that name overrides
 * the nearest-pin guess for the landing destination. A click only tells us
 * where the cursor was; a highlight tells us which words the reader cared
 * about.
 *
 * Partner controls (window.Stay22.params.nova):
 *   disabledMethods: ["highlight"]   turns it off, same as the other methods
 *   highlightMinChars (default 12)   shorter selections are treated as accidental
 *   highlightMaxChars (default 600)  longer selections are treated as select-all
 *
 * Desktop only in this version. Mobile selection runs on long-press handles
 * with no pointer event at the end of it, so it needs its own gesture model.
 *
 * Relies on the same module-scope helpers rs() uses: O (async wrapper),
 * k (jQuery), E (utils), We/$t (namespaced events), Ln (tag name), Nn (allez
 * path), Xa (trap detector).
 */
function hlBind() {
  return O(this, null, function* () {
    let e = "highlight",
      t = window.Stay22.context.novaSegment,
      r = window.Stay22.params.nova || {},
      // Record every exit so window.Stay22.highlightTrigger always explains
      // itself instead of staying undefined when a gate closes.
      x = (R) => ((window.Stay22.highlightTrigger = { armed: !1, reason: R }), !1);
    if (!window.Stay22.userData.isDesktop) return x("not desktop");
    if (this.isMethodDisabled("highlight")) return x("method disabled by partner settings");
    if (!this.canOverPop() && !this.canUnderPop() && !this.canUnderTab()) return x("every medium disabled");
    if (yield this.pit(!1, { trigmeth: e, segment: t })) return x("server pre-check (checknova) suppressed Nova for this visitor");
    let o = typeof r.highlightMinChars == "number" ? r.highlightMinChars : 12,
      s = typeof r.highlightMaxChars == "number" ? r.highlightMaxChars : 600,
      a = We(e, "mouseup", "keyup"),
      c = () => {
        k(document).off($t(e));
      },
      // Same skip rules as the whitespace method: recently shown, homepage,
      // nothing to sell on this page, or the selection sits inside a trap.
      p = (A) => {
        if (this.readRecentCheck() || E.isHomepage()) return !0;
        if (!this.hasAnyDestination(window.Stay22) && !this.hasRetailKeywords(window.Stay22)) return !0;
        for (let D = A; D; D = D.parentElement) if (Xa(D).isTrap) return !0;
        return !1;
      },
      // Read the live selection and decide whether it looks deliberate.
      f = () => {
        let A = window.getSelection();
        if (!A || A.isCollapsed || A.rangeCount === 0) return null;
        let D = A.toString().replace(/\s+/g, " ").trim();
        if (D.length < o || D.length > s) return null;
        if (!/[A-Za-zÀ-ɏЀ-ӿ぀-ヿ一-鿿]/.test(D)) return null;
        let N = A.getRangeAt(0),
          W = N.commonAncestorContainer,
          U = W.nodeType === 1 ? W : W.parentElement;
        if (!U) return null;
        // Form fields and editable regions are the reader's, not ours; links
        // and buttons already belong to the ahref method; code is copy-paste.
        if (U.closest('input, textarea, select, [contenteditable], a, button, [role="link"], pre, code')) return null;
        let z = N.getBoundingClientRect();
        return { text: D, el: U, x: z.left + z.width / 2, y: z.top + z.height / 2 };
      },
      // Longest known destination name contained in the selection, if any.
      m = (A) => {
        let D = window.Stay22.context.locations || [],
          N = A.toLowerCase(),
          W = null;
        D.forEach((U) => {
          let z = U && U.destination;
          typeof z == "string" && z.length > 2 && N.includes(z.toLowerCase()) && (!W || z.length > W.length) && (W = z);
        });
        return W;
      },
      // Open. Mirrors the whitespace method's open step exactly, plus the
      // destination override.
      g = (D) => {
        c();
        this.writeRecentCheck();
        this.pit(!0, { trigmeth: e, segment: t });
        let N = this.pickWhitespaceMedium(),
          W = Ln(D.el),
          U = this.getAllezParams({
            destinationEvent: { clientX: D.x, clientY: D.y, target: D.el },
            medium: N,
            ptag: W,
            segment: t,
            trigmeth: e,
          });
        if (t === "travel") {
          let q = m(D.text);
          q && (U.address = q);
        }
        let z = E.getAllezURL(Nn(t), U);
        N === "overpop"
          ? this.overPop(z, { ptag: W, medium: N, trigmeth: e, segment: t })
          : N === "underpop"
            ? this.underPop(z, { ptag: W, medium: N, trigmeth: e, segment: t })
            : this.overPop(window.location.href, { ptag: W, medium: "undertab", trigmeth: e, segment: t }) && this.underTab(z);
      };
    E.devLog("[STAY22](Nova) highlight trigger armed");
    window.Stay22.highlightTrigger = { armed: !0, minChars: o, maxChars: s };
    // mouseup ends a drag-select; keyup catches shift+arrow selection. Both
    // sit inside the browser's user-activation window, so the pop-under is
    // allowed to open.
    k(document).on(a, (A) => {
      if (A.type === "keyup" && !(A.key === "Shift" || A.shiftKey)) return !0;
      let D = f(),
        H = window.Stay22.highlightTrigger;
      H.seen = (H.seen || 0) + 1;
      H.last = D ? { text: D.text, tag: Ln(D.el) } : null;
      return !D || p(D.el) ? !0 : (g(D), !0);
    });
  });
}
