const { Plugin } = require('obsidian');

// ---- New explicit notation ----
// Block start:  ??"        or   ??[title]"     (must be the WHOLE line)
// Block end:    "??                            (must be the WHOLE line)
const BLOCK_START_REGEX = /^\?\?(?:\[([^\]]*)\])?"$/;
const BLOCK_END_REGEX = /^"\?\?$/;

// Inline:  ?"...text..."?   or   ?[title]"...text..."?
const INLINE_REGEX = /(?<!\?)\?(?:\[([^\]]*)\])?"([\s\S]*?)"\?(?!\?)/g;

function escapeAttr(str) {
  return String(str).replace(/"/g, '&quot;');
}

// A raw "Solution:" line, possibly wrapped in a link and/or bold markers,
// e.g. "Solution:", "**Solution**:", "[**Solution**:](https://...)"
function isLegacyTriggerLine(line) {
  let t = line.replace(/\[([^\]]*)\]\([^)]*\)/g, '$1');
  t = t.replace(/\*+/g, '').trim();
  return /^solution\s*:?$/i.test(t);
}

module.exports = class AnswerTogglePlugin extends Plugin {
  onload() {
    console.log('Answer Toggle plugin loaded');
    this.registerMarkdownPostProcessor((el, ctx) => {
      try {
        this.processInline(el);
        this.processBlockRoles(el, ctx);
      } catch (err) {
        console.error('Answer Toggle: post-process error', err);
      }
    });
  }

  // ---------------------------------------------------------------------
  // INLINE:  ?"..."?   /   ?[title]"..."?
  // ---------------------------------------------------------------------
  processInline(root) {
    const leaves = root.querySelectorAll('p, li, td, th, blockquote');
    leaves.forEach((leaf) => {
      if (leaf.closest('.answer-toggle-inline')) return;
      if (!leaf.innerHTML.includes('"')) return;
      if (!INLINE_REGEX.test(leaf.innerHTML)) return;
      INLINE_REGEX.lastIndex = 0;

      const newHtml = leaf.innerHTML.replace(INLINE_REGEX, (match, title, content) => {
        const label = title ? escapeAttr(title) : 'answer';
        return (
          `<span class="answer-toggle-inline">` +
          `<button type="button" class="answer-toggle-btn-inline" data-label="${label}">Show ${label}</button>` +
          `<span class="answer-toggle-content-inline" style="display:none">${content}</span>` +
          `</span>`
        );
      });

      leaf.innerHTML = newHtml;

      leaf.querySelectorAll('.answer-toggle-btn-inline').forEach((btn) => {
        const content = btn.nextElementSibling;
        const label = btn.dataset.label || 'answer';
        btn.addEventListener('click', () => {
          const hidden = content.style.display === 'none';
          content.style.display = hidden ? 'inline' : 'none';
          btn.textContent = hidden ? `Close ${label}` : `Show ${label}`;
          btn.classList.toggle('is-open', hidden);
        });
      });
    });
  }

  // ---------------------------------------------------------------------
  // BLOCK:  ??" ... "??   /   ??[title]" ... "??   (+ legacy "Solution:")
  //
  // Instead of guessing which DOM elements are siblings of each other
  // (fragile once Obsidian splits a long/embed-heavy note into many
  // separate render "sections"), we read the raw markdown source via
  // ctx.getSectionInfo() and work out, purely from line numbers, whether
  // THIS element is a start marker, an end marker, or answer content.
  // ---------------------------------------------------------------------
  findRegions(text) {
    const lines = text.split('\n');
    const regions = [];
    let i = 0;
    while (i < lines.length) {
      const trimmed = lines[i].trim();

      const startMatch = BLOCK_START_REGEX.exec(trimmed);
      BLOCK_START_REGEX.lastIndex = 0;
      if (startMatch) {
        let j = i + 1;
        while (j < lines.length && !BLOCK_END_REGEX.test(lines[j].trim())) j++;
        BLOCK_END_REGEX.lastIndex = 0;
        const hasEnd = j < lines.length;
        regions.push({
          startLine: i,
          endLine: hasEnd ? j : i,
          title: startMatch[1] || 'answer',
          legacy: false,
          hasEnd,
        });
        i = hasEnd ? j + 1 : lines.length;
        continue;
      }

      if (isLegacyTriggerLine(trimmed)) {
        let j = i + 1;
        while (j < lines.length) {
          const t = lines[j].trim();
          if (t === '') { j++; continue; }
          if (t.startsWith('#') || t.startsWith('![[') || isLegacyTriggerLine(t) || BLOCK_START_REGEX.test(t)) break;
          j++;
        }
        regions.push({
          startLine: i,
          endLine: j - 1,
          title: 'answer',
          legacy: true,
          hasEnd: true,
        });
        i = j;
        continue;
      }

      i++;
    }
    return regions;
  }

  processBlockRoles(el, ctx) {
    const info = ctx.getSectionInfo(el);
    if (!info) return;
    const { text, lineStart, lineEnd } = info;
    const regions = this.findRegions(text);
    const sourcePath = ctx.sourcePath || '';

    for (const region of regions) {
      const id = `${sourcePath}::${region.startLine}`;

      if (!region.legacy) {
        if (!region.hasEnd) continue;

        if (lineStart === region.startLine && lineEnd === region.startLine) {
          this.renderStart(el, region, id);
          return;
        }
        if (lineStart === region.endLine && lineEnd === region.endLine) {
          el.style.display = 'none';
          return;
        }
        if (lineStart > region.startLine && lineEnd < region.endLine) {
          this.markContent(el, region, id);
          return;
        }
      } else {
        if (lineStart === region.startLine) {
          this.renderLegacyStart(el, region, id);
          return;
        }
        if (lineStart > region.startLine && lineEnd <= region.endLine) {
          this.markContent(el, region, id);
          return;
        }
      }
    }
  }

  toggleRegion(btn, id, title) {
    const items = document.querySelectorAll(`[data-answer-toggle-block="${id}"]`);
    const hidden = items.length > 0 && items[0].style.display === 'none';
    items.forEach((it) => { it.style.display = hidden ? '' : 'none'; });
    btn.textContent = hidden ? `Close ${title}` : `Show ${title}`;
    btn.classList.toggle('is-open', hidden);
  }

  makeButton(region, id) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.classList.add('answer-toggle-btn');
    btn.textContent = `Show ${region.title}`;
    btn.addEventListener('click', () => this.toggleRegion(btn, id, region.title));
    return btn;
  }

  // The "??" ... "??" start-marker line: replace its text with the button.
  renderStart(el, region, id) {
    if (el.dataset.answerToggleDone) return;
    el.dataset.answerToggleDone = '1';
    el.innerHTML = '';
    el.classList.add('answer-toggle-wrapper');
    el.appendChild(this.makeButton(region, id));
  }

  // The legacy "Solution:" line: acts as both trigger AND first piece of
  // hidden content, so we prepend a button before it and hide it too.
  renderLegacyStart(el, region, id) {
    if (el.dataset.answerToggleDone) return;
    el.dataset.answerToggleDone = '1';
    const btn = this.makeButton(region, id);
    el.parentNode.insertBefore(btn, el);
    el.classList.add('answer-toggle-content-line');
    el.dataset.answerToggleBlock = id;
    el.style.display = 'none';
  }

  // Any element strictly inside a block's line range: hide it and tag it
  // so the button can find and toggle it later.
  markContent(el, region, id) {
    if (el.dataset.answerToggleDone) return;
    el.dataset.answerToggleDone = '1';
    el.classList.add('answer-toggle-content-line');
    el.dataset.answerToggleBlock = id;
    el.style.display = 'none';
  }
};