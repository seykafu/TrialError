"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { FeaturedCityCard } from "@/data/destinations";
import "./cinematic.css";

/* Cinematic scene layers (mix of local photography + motion graphics). */
const ASSETS = {
  /* Not the Taj monkeys shot: it reads as a subject, not a backdrop. */
  sky: "https://raft-blast-61784561.figma.site/_assets/v11/16b5007d9c93971e26ffe4e0e3e37946f6bd538c.png",
  backFour: "/photos/amsterdam/tajandme-heic.jpg",
  bazaar: "/photos/amsterdam/tajandme-heic.jpg",
  splitLeft:
    "https://raft-blast-61784561.figma.site/_assets/v11/7536d7b60a1fce482cf6edf3f0bffd3bad5d0f8a.png",
  splitRight:
    "https://raft-blast-61784561.figma.site/_assets/v11/392db6a6a6b98e868bd7f8d3f55bb719d51e5028.png",
  bridge:
    "https://raft-blast-61784561.figma.site/_assets/v11/c6a6d8ef49bca43f708aa852692942c45ec950d4.png",
  frameTwo:
    "https://raft-blast-61784561.figma.site/_assets/v11/ba75252bab2b1c510987b74837770f7bc8a6b2d4.png",
};

const PINS = [
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260730_230438_d526b8b6-8a2e-4e3b-9993-3908acae03a7.png",
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260730_230442_140bc25b-b165-4249-904a-f708bff6970e.png",
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260730_230448_825949c9-ccdb-4857-b4a6-e349eccc9010.png",
];

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

const SET_COUNT = 3;

type CinematicHeroProps = {
  featuredCities: FeaturedCityCard[];
  cityCount: number;
  countryCount: number;
};

export default function CinematicHero({
  featuredCities,
  cityCount,
  countryCount,
}: CinematicHeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<HTMLDivElement>(null);

  const originalCount = featuredCities.length;
  const [activeSight, setActiveSight] = useState(originalCount);
  const [isJumping, setIsJumping] = useState(false);

  /* --- slider geometry: writes --sights-shift from the active index --- */
  const updateSlider = useCallback(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;
    const firstCard = track.querySelector<HTMLElement>(".sight-card");
    if (!firstCard) return;
    const cardWidth = firstCard.offsetWidth;
    const gap = parseFloat(getComputedStyle(track).columnGap || "0");
    section.style.setProperty(
      "--sights-shift",
      `${-(cardWidth + gap) * activeSight}px`
    );
  }, [activeSight]);

  useEffect(() => {
    updateSlider();
  }, [updateSlider]);

  const jumpTo = useCallback((index: number) => {
    setIsJumping(true);
    setActiveSight(index);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setIsJumping(false));
    });
  }, []);

  const normalize = useCallback(() => {
    if (activeSight >= originalCount * 2) {
      jumpTo(activeSight - originalCount);
    } else if (activeSight < originalCount) {
      jumpTo(activeSight + originalCount);
    }
  }, [activeSight, originalCount, jumpTo]);

  /* --- scroll + pointer engine --- */
  useEffect(() => {
    const section = sectionRef.current;
    const controls = controlsRef.current;
    if (!section || !controls) return;

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

      const frame2 = segmentInOut(smoothScroll, 560, 900, 1300, 1620);
      const frame3 = segmentInOut(smoothScroll, 1760, 2140, 2540, 2700);
      const progress = clamp(smoothScroll / 2700);
      const introExit = smoothstep(90, 650, smoothScroll);
      const sightsEnterRaw = smoothstep(2760, 3560, smoothScroll);
      const sightsEnter = Math.pow(sightsEnterRaw, 1.55);
      const sightsControlsEnter = smoothstep(3360, 3660, smoothScroll);
      const blurActive = clamp(frame2.active + frame3.active);
      const frame2Opacity = frame2.active * (1 - frame3.enter);
      const splitDrift = Math.pow(frame2.enter, 1.5);
      const panel2Opacity = frame2.active * (1 - frame2.exit);
      const panel3Opacity = frame3.active * (1 - frame3.exit);
      const backScale =
        0.76 + progress * 0.2 + frame2.enter * 0.18 + frame3.enter * 0.16;
      const sharedHeroY = progress * -74;
      const sharedHeroScale = progress * 0.23;
      const sightsScreenTop =
        Math.min(220, Math.max(112, window.innerHeight * 0.19)) - 50;
      const sightsParentTop =
        window.innerHeight - (window.innerHeight - sightsScreenTop) / backScale;

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

      setVar("--sights-opacity", sightsEnter);
      setVar("--sights-controls-opacity", sightsControlsEnter);
      controls.classList.toggle("is-ready", sightsControlsEnter > 0.98);
      setVar("--sights-visibility", sightsEnter > 0.01 ? "visible" : "hidden");
      setVar("--sights-y", "0px");
      setVar("--sights-enter-x", `${(1 - sightsEnter) * 420}vw`);
      setVar("--sights-scale", 1 / backScale);
      setVar("--sights-top", `${sightsParentTop}px`);
      setVar("--sights-screen-top", `${sightsScreenTop}px`);

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
      requestAnimationFrame(update);
    };

    const onScroll = () => requestTick();
    const onResize = () => {
      updateSlider();
      requestTick();
    };
    const onPointerMove = (e: PointerEvent) => {
      targetMouseX = e.clientX / window.innerWidth - 0.5;
      targetMouseY = e.clientY / window.innerHeight - 0.5;
      requestTick();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    requestTick();

    return () => {
      disposed = true;
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, [updateSlider]);

  const cards = Array.from({ length: SET_COUNT }, (_, setIndex) =>
    featuredCities.map((c, cardIndex) => {
      const index = setIndex * originalCount + cardIndex;
      return (
        <Link
          key={index}
          href={`/destinations/${c.countrySlug}/${c.slug}`}
          className={`sight-card${index === activeSight ? " is-active" : ""}`}
          aria-label={`Open ${c.name} city guide`}
        >
          <span className="sight-kicker">{c.countryName}</span>
          <img
            className="sight-pin"
            src={PINS[cardIndex % PINS.length]}
            alt=""
            loading="lazy"
          />
          <h3>{c.name}</h3>
          <p>{c.tagline}</p>
        </Link>
      );
    })
  ).flat();

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
            <section
              className="sights-slider"
              aria-label="Featured city guides"
            >
              <div
                ref={trackRef}
                className={`sights-track${isJumping ? " is-jumping" : ""}`}
                onTransitionEnd={normalize}
              >
                {cards}
              </div>
            </section>
            <img
              className="scene-img back-img back-bazaar"
              src={ASSETS.bazaar}
              alt=""
            />
          </div>

          <div
            ref={controlsRef}
            className="sights-controls"
            aria-label="Slider controls"
          >
            <button
              className="sight-nav sight-prev"
              aria-label="Previous city"
              onClick={() => setActiveSight((i) => i - 1)}
            >
              ←
            </button>
            <button
              className="sight-nav sight-next"
              aria-label="Next city"
              onClick={() => setActiveSight((i) => i + 1)}
            >
              →
            </button>
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
      </div>
    </section>
  );
}
