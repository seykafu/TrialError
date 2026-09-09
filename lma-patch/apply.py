#!/usr/bin/env python3
"""Insert the highlight trigger into a copy of Stay22's letmeallez.js.

Three anchors, each asserted unique so a CDN rebuild that renames
identifiers fails loudly instead of producing a half-patched file.
"""
import sys, pathlib

root = pathlib.Path(__file__).resolve().parent.parent
src = (root / "letmeallez.js").read_text(encoding="utf-8")
method = (root / "lma-patch" / "highlight-trigger.js").read_text(encoding="utf-8")

anchors = {
    "controller": 'var Ve={unbindHandlers(){k(document).off($t("whitespace")),k(document).off($t("ahref")),Wt()},bindWhitespace:rs,bindInternalLink:Na,',
    "runner": "Ve.readOutsideCheck()||(Ve.bindWhitespace(),Ve.bindInternalLink())",
}
for name, a in anchors.items():
    n = src.count(a)
    if n != 1:
        sys.exit(f"anchor {name!r} matched {n} times; the script changed, patch needs re-anchoring")

out = src.replace(
    anchors["controller"],
    "\n" + method.strip() + "\n"
    'var Ve={unbindHandlers(){k(document).off($t("whitespace")),k(document).off($t("ahref")),k(document).off($t("highlight")),Wt()},bindWhitespace:rs,bindInternalLink:Na,bindHighlight:hlBind,',
)
out = out.replace(
    anchors["runner"],
    "Ve.readOutsideCheck()||(Ve.bindWhitespace(),Ve.bindInternalLink(),Ve.bindHighlight())",
)
dest = root / "lma-patch" / "letmeallez.highlight.js"
dest.write_text(out, encoding="utf-8")
print(f"wrote {dest.relative_to(root)}: {len(src)} -> {len(out)} bytes")
