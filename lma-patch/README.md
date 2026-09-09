# Highlight trigger for Stay22 LetMeAllez

Adds a third Nova trigger method, `highlight`, next to the script's existing
`whitespace` (click on content) and `ahref` (internal link click). A finished
text selection of 12 to 600 characters on a page with a destination opens the
pop-under through the same pipeline the other two use. When the selected text
names a destination the classifier already found on the page, that name
overrides the nearest-pin guess for the landing destination.

Files:

- `highlight-trigger.js`: the method, readable, with comments.
- `apply.py`: inserts it into a copy of `../letmeallez.js` at three anchors
  (the controller object, its unbind list, and the runner). Every anchor is
  asserted unique; a CDN rebuild that renames identifiers fails the patch
  instead of half-applying it.
- `letmeallez.highlight.js`: the generated output. Regenerate with
  `python3 lma-patch/apply.py`, then `node --check` it.

The site keeps loading Stay22's CDN copy. To try the patched build locally,
serve `letmeallez.highlight.js` from `public/` and point the loader in
`app/layout.tsx` at it. On a city page, `window.Stay22.highlightTrigger`
reports `{armed, minChars, maxChars, seen, last}`; `seen` counts selection
events the handler examined and `last` is the most recent selection it read.
To exercise the handler without opening a pop-under, set the script's own
"recently shown" flag first (`localStorage` key `localnova`) so the handler
reaches the selection step and then skips at the last gate.

Partner controls, all under `window.Stay22.params.nova`: `disabledMethods:
["highlight"]`, `highlightMinChars`, `highlightMaxChars`. Desktop only.
