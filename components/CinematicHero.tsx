"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import type { CountryPill } from "@/data/destinations";
import "./cinematic.css";

/* Cinematic scene layers (mix of local photography + motion graphics). */
const ASSETS = {
  /* Not the Taj monkeys shot: it reads as a subject, not a backdrop. */
  sky: "https://raft-blast-61784561.figma.site/_assets/v11/16b5007d9c93971e26ffe4e0e3e37946f6bd538c.png",
  /* Sky clipped to transparency so the scene's dusk sky reads through,
     instead of the photo's own hazy morning sky fighting it. */
  backFour: "/photos/hero/taj-cutout.webp",
  bazaar: "/photos/hero/taj-cutout.webp",
  splitLeft:
    "https://raft-blast-61784561.figma.site/_assets/v11/7536d7b60a1fce482cf6edf3f0bffd3bad5d0f8a.png",
  splitRight:
    "https://raft-blast-61784561.figma.site/_assets/v11/392db6a6a6b98e868bd7f8d3f55bb719d51e5028.png",
  bridge:
    "https://raft-blast-61784561.figma.site/_assets/v11/c6a6d8ef49bca43f708aa852692942c45ec950d4.png",
  frameTwo:
    "https://raft-blast-61784561.figma.site/_assets/v11/ba75252bab2b1c510987b74837770f7bc8a6b2d4.png",
};

const clamp = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v));

const smoothstep = (e0: number, e1: number, v: number) => {
  const x = clamp((v - e0) / (e1 - e0));
  return x * x * (3 - 2 * x);
};

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

function segmentInOut(s: number, a: number, b: number, c: number, d: number) {
  const enter = smoothstep(a, b, s);
  const exit = smoothstep(c, d, s);
  return { enter, exit, active: enter * (1 - exit) };
}

type CinematicHeroProps = {
  countryPills: CountryPill[];
  cityCount: number;
  countryCount: number;
};

export default function CinematicHero({
  countryPills,
  cityCount,
  countryCount,
}: CinematicHeroProps) {
  const sectionRef = useRef<HTMLElement>(null);

  /* --- scroll + pointer engine --- */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    let targetMouseX = 0;
    let targetMouseY = 0;
    let mouseX = 0;
    let mouseY = 0;
    let targetScroll = 0;
    let smoothScroll = 0;
    let initialized = false;
    let rafPending = false;
    let disposed = false;

    const setVar = (name: string, value: string | number) => {
      section.style.setProperty(name, String(value));
    };

    const getScrollDistance = () =>
      clamp(
        -section.getBoundingClientRect().top,
        0,
        section.offsetHeight - window.innerHeight
      );

    const update = () => {
      rafPending = false;
      if (disposed) return;

      targetScroll = getScrollDistance();
      if (!initialized || reduceMotion.matches) {
        smoothScroll = targetScroll;
        initialized = true;
      } else {
        smoothScroll = lerp(smoothScroll, targetScroll, 0.14);
      }
      if (Math.abs(smoothScroll - targetScroll) < 0.08) {
        smoothScroll = targetScroll;
      }

      mouseX = lerp(mouseX, targetMouseX, 0.12);
      mouseY = lerp(mouseY, targetMouseY, 0.12);

      /* Timing note: every window below spans 700-900px of scroll. Shorter
         windows read as elements blinking in and out instead of easing, and
         the whole runway (5400px, set in cinematic.css) is sized so a normal
         scroll pace feels near-linear rather than choreographed. */
      const frame2 = segmentInOut(smoothScroll, 800, 1600, 2300, 3000);
      const frame3 = segmentInOut(smoothScroll, 3050, 3850, 4300, 5000);
      const progress = clamp(smoothScroll / 5000);
      const introExit = smoothstep(100, 1000, smoothScroll);
      /* The country rail is the landing: it arrives as the final frame
         settles, and its pills stagger in via the is-landed class below. */
      const railEnter = smoothstep(4900, 5350, smoothScroll);
      const blurActive = clamp(frame2.active + frame3.active);
      const frame2Opacity = frame2.active * (1 - frame3.enter);
      /* Linear in the eased enter: the pow() acceleration made the side
         walls lurch on fast scrolls. */
      const splitDrift = frame2.enter;
      const panel2Opacity = frame2.active * (1 - frame2.exit);
      const panel3Opacity = frame3.active * (1 - frame3.exit);
      const backScale =
        0.76 + progress * 0.2 + frame2.enter * 0.18 + frame3.enter * 0.16;
      const sharedHeroY = progress * -74;
      const sharedHeroScale = progress * 0.23;

      setVar("--mx", (reduceMotion.matches ? 0 : mouseX).toFixed(4));
      setVar("--my", (reduceMotion.matches ? 0 : mouseY).toFixed(4));

      setVar("--back-opacity", 1 - frame2.active * 0.06);
      setVar("--back-x", `${mouseX * -12}px`);
      setVar("--back-y", `${mouseY * -4}px`);
      setVar("--back-scale", backScale);
      setVar("--four-y", `${10 + progress * 10}vh`);
      setVar("--four-scale", 0.78 + progress * 0.16);
      setVar("--bazaar-y", `${20 - progress * 8}vh`);
      setVar("--blur-px", `${blurActive * 14}px`);
      setVar("--back-brightness", 1 - blurActive * 0.255);
      setVar("--bazaar-blur-px", `${frame2.active * 14}px`);
      setVar(
        "--bazaar-brightness",
        1 - frame2.active * 0.255 - frame3.active * 0.06
      );
      setVar("--bazaar-saturation", 1 + frame3.active * 0.18);
      setVar("--shade-opacity", "1");
      setVar("--shade-z", frame2.active > 0.02 ? "2" : "0");
      setVar("--shade-top-alpha", blurActive * 0.465);
      setVar("--shade-mid-alpha", blurActive * 0.42);
      setVar("--shade-bottom-alpha", blurActive * 0.51);

      setVar("--title-y", `${introExit * -210}px`);
      setVar("--title-scale", 1 - introExit * 0.08);
      setVar("--title-opacity", 1 - introExit);

      setVar("--bridge-x", `calc(-50% + ${mouseX * 18}px)`);
      setVar(
        "--bridge-y",
        `${mouseY * 8 + sharedHeroY - frame2.exit * 760}px`
      );
      setVar("--bridge-bottom", `${5 - frame2.enter * 13}vh`);
      setVar("--bridge-width", `${67.2 + frame2.enter * 37.8}vw`);
      setVar("--bridge-scale", 1.02 + sharedHeroScale + frame2.exit * 0.46);

      setVar(
        "--split-left-x",
        `calc(-50% + ${-splitDrift * 46}vw + ${mouseX * 22}px)`
      );
      setVar(
        "--split-left-y",
        `${mouseY * 10 + sharedHeroY - splitDrift * 180}px`
      );
      setVar(
        "--split-left-scale",
        1 + sharedHeroScale + frame2.enter * 0.74
      );
      setVar(
        "--split-right-x",
        `calc(-50% + ${splitDrift * 46}vw + ${mouseX * 22}px)`
      );
      setVar(
        "--split-right-y",
        `${mouseY * 10 + sharedHeroY - splitDrift * 180}px`
      );
      setVar(
        "--split-right-scale",
        1 + sharedHeroScale + frame2.enter * 0.74
      );

      setVar("--frame2-opacity", frame2Opacity);
      setVar("--frame2-x", `calc(-50% + ${mouseX * 10}px)`);
      setVar(
        "--frame2-y",
        `calc(-50% + ${mouseY * 8 - frame2.exit * 150}px)`
      );
      setVar(
        "--frame2-scale",
        1.06 + frame2.enter * 0.08 + frame2.exit * 0.08
      );

      setVar("--intro-copy-y", `${introExit * 90}px`);
      setVar("--intro-copy-opacity", 1 - introExit);
      setVar("--panel2-opacity", panel2Opacity);
      setVar(
        "--panel2-y",
        `calc(-50% + ${-frame2.exit * 86 + (1 - frame2.enter) * 58}px)`
      );
      setVar("--panel3-opacity", panel3Opacity);
      setVar(
        "--panel3-y",
        `calc(-50% + ${-frame3.exit * 86 + (1 - frame3.enter) * 58}px)`
      );

      setVar("--rail-enter", railEnter);
      section
        .querySelector(".country-rail")
        ?.classList.toggle("is-landed", railEnter > 0.6);

      if (
        Math.abs(smoothScroll - targetScroll) > 0.08 ||
        Math.abs(mouseX - targetMouseX) > 0.001 ||
        Math.abs(mouseY - targetMouseY) > 0.001
      ) {
        requestTick();
      }
    };

    const requestTick = () => {
      if (rafPending) return;
      rafPending = true;
      /* rAF never fires in a hidden document (background-tab or prerendered
         loads), which would deadlock the tick guard; fall back to a timer. */
      if (document.hidden) {
        setTimeout(update, 32);
      } else {
        requestAnimationFrame(update);
      }
    };

    const onScroll = () => requestTick();
    const onResize = () => requestTick();
    const onPointerMove = (e: PointerEvent) => {
      targetMouseX = e.clientX / window.innerWidth - 0.5;
      targetMouseY = e.clientY / window.innerHeight - 0.5;
      requestTick();
    };

    document.addEventListener("visibilitychange", requestTick);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    requestTick();

    return () => {
      disposed = true;
      document.removeEventListener("visibilitychange", requestTick);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="cinema-scroll"
      id="cinema"
      aria-label="Trial and Error cinematic intro"
    >
      <div className="stage">
        <div className="world">
          <img className="scene-img sky-img" src={ASSETS.sky} alt="" />

          <header className="site-header" aria-label="Primary navigation">
            <a className="site-logo" href="#cinema">
              <img
                className="site-logo-chibi"
                src="/logo-chibi.png"
                alt=""
                width={38}
                height={38}
              />
              Trial &amp; Error
            </a>
            <nav className="site-nav" aria-label="Main menu">
              <a href="#cinema">Intro</a>
              <Link href="/destinations">Destinations</Link>
              <a href="#browse">Countries</a>
              <a href="#about">About</a>
            </nav>
            <button className="language-switcher" aria-label="Change language">
              <span>EN</span>
              <span aria-hidden="true">⌄</span>
            </button>
          </header>

          <div className="back-stack">
            <img
              className="scene-img back-img back-four"
              src={ASSETS.backFour}
              alt=""
            />
            <img
              className="scene-img back-img back-bazaar"
              src={ASSETS.bazaar}
              alt=""
            />
          </div>

          <h1 className="hero-title">
            TRIAL <span className="amp">&amp;</span> ERROR
          </h1>

          <img
            className="scene-img splitframe-img splitframe-left"
            src={ASSETS.splitLeft}
            alt=""
          />
          <img
            className="scene-img splitframe-img splitframe-right"
            src={ASSETS.splitRight}
            alt=""
          />
          <img className="scene-img bridge-img" src={ASSETS.bridge} alt="" />
          <img
            className="scene-img frame-two-img"
            src={ASSETS.frameTwo}
            alt=""
          />
          <div className="shade" />
        </div>

        <section className="intro-copy" aria-label="Trial and Error overview">
          <p>
            Half of every trip disappears into research. Consider it done: eat
            well, see where people actually live, get the shot before the
            light goes.
          </p>
          <div className="hero-tags" aria-label="What every city guide includes">
            <span>Top 5 Eats</span>
            <span>Top 5 Experiences</span>
            <span>Top 5 Photo Spots</span>
          </div>
        </section>

        <section
          className="story-panel story-panel-bridge"
          aria-label="About the journal"
        >
          <h2>Skip what was built for tourists.</h2>
          <p>
            Tourist downtowns are built for people who never come back. We eat
            and wander where locals do, and keep only what earns its place.
          </p>
          <dl className="facts">
            <div>
              <dt>{cityCount}</dt>
              <dd>Cities walked so far</dd>
            </div>
            <div>
              <dt>{countryCount}</dt>
              <dd>Countries on the board</dd>
            </div>
          </dl>
        </section>

        <section
          className="story-panel story-panel-bazaar"
          aria-label="How the guides work"
        >
          <h2>Three lists and a map.</h2>
          <p>
            Five eats, five experiences, five photo spots in every city. Every
            photo spot has an Open in Maps link: tap it and go.
          </p>
          <Link className="note-button" href="/destinations">
            <span aria-hidden="true">↗</span>
            <span>Browse the destinations</span>
          </Link>
        </section>

        {/*
          * The landing pad. Once the final frame has settled, a rail of flag
          * pills floats up so the scroll ends on a choice rather than a dead
          * stop; each pill jumps to that country's card in the index below.
          */}
        <nav className="country-rail" aria-label="Pick a destination">
          <p className="country-rail-kicker">
            {cityCount} city guides across {countryCount} countries
          </p>
          <p className="country-rail-title">Pick a destination</p>
          <ul className="country-rail-list">
            {countryPills.map((country) => (
              <li key={country.slug}>
                <Link
                  className="country-pill"
                  href={`/destinations/${country.slug}`}
                >
                  <span aria-hidden="true">{country.flag}</span>
                  <span>{country.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}
