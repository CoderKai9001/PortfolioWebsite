import React, { useEffect } from 'react';

/**
 * Modernist pointer: a trailing 26px accent square plus a precise 4px dot.
 * Grows and fills over anything interactive. Precise pointers only.
 */
const ModernistCursor: React.FC = () => {
  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;

    const mk = (css: string) => {
      const el = document.createElement('div');
      el.style.cssText = css;
      document.body.appendChild(el);
      return el;
    };
    const base = 'position:fixed;left:0;top:0;pointer-events:none;z-index:9999;opacity:0;will-change:transform';
    const box = mk(base + ';width:26px;height:26px;border:2px solid var(--accent);transition:opacity .2s linear,width .18s ease,height .18s ease,background-color .18s ease');
    const dot = mk(base + ';width:4px;height:4px;background:var(--accent);z-index:10000');
    document.documentElement.classList.add('has-custom-cursor');

    let mx = -100, my = -100, bx = -100, by = -100, seen = false, hover = false, raf = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY;
      if (!seen) { seen = true; bx = mx; by = my; box.style.opacity = '1'; dot.style.opacity = '1'; }
    };
    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      const h = !!(t && t.closest && t.closest('a, button, input, [role=button]'));
      if (h === hover) return;
      hover = h;
      box.style.width = h ? '46px' : '26px';
      box.style.height = h ? '46px' : '26px';
      box.style.backgroundColor = h ? 'color-mix(in srgb, var(--accent) 18%, transparent)' : 'transparent';
    };
    const tick = () => {
      bx += (mx - bx) * 0.18; by += (my - by) * 0.18;
      box.style.transform = `translate(${bx - box.offsetWidth / 2}px,${by - box.offsetHeight / 2}px)`;
      dot.style.transform = `translate(${mx - 2}px,${my - 2}px)`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', onOver);
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      cancelAnimationFrame(raf);
      box.remove(); dot.remove();
      document.documentElement.classList.remove('has-custom-cursor');
    };
  }, []);

  return null;
};

export default ModernistCursor;
