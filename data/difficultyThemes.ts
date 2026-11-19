import type React from 'react';
import { Difficulty } from '../types';

export interface DifficultyTheme {
  // App shell & atmospheric backdrop
  pageBg: string;
  gridColor: string;
  radialBg: string;
  headerButtonHover: string;
  pausedText: string;

  // Rank Crest & Stats Bar
  cardSurface: string;
  cardBorder: string;
  rankImgBorder: string;
  rankBarGrad: string;
  rankAwaitColor: string;
  scoreIconText: string;
  totalIconText: string;

  // Footer, OPS & Solved Banner
  newGameBtn: string;
  opsCountText: string;
  linkBtn: string;
  solvedBannerBorder: string;
  solvedTrophyBg: string;
  playAgainBtn: string;
  logHeaderBg: string;
  logIconText: string;
  logRankUpText: string;

  // SudokuBoard
  boardFrame: string;
  cellHover: string;
  cellSelected: string;
  cellSameNumber: string;
  cellInUnit: string;
  cellErrorSelected: string;
  cellError: string;
  boxDividerRight: string;
  boxDividerBottom: string;
  digitPlayer: string;
  digitSameNumber: string;
  noteSelected: string;

  // Unit completion overlay FX
  unitBanner: string;
  unitBeamH: string;
  unitBeamV: string;
  unitBoxGlow: string;
  unitOriginRing: string;
  unitCssVars: React.CSSProperties;

  // Tools
  toolCardBorder: string;
  toolHoverText: string;
  toolHoverCard: string;
  toolHoverLabel: string;
  notesActiveText: string;
  notesActiveCard: string;
  notesActiveLabel: string;
  hintHoverText: string;
  hintHoverCard: string;
  hintHoverLabel: string;
  hintBadgeBg: string;

  // NumberPad
  numKeyActive: string;

  // GameTimer
  timerBoxBorder: string;
  timerBtnHover: string;
}

export const DIFFICULTY_THEMES: Record<Difficulty, DifficultyTheme> = {
  // EASY: Sanctuary Teal & Alpine Sky (Matches border-emerald-200)
  [Difficulty.EASY]: {
    pageBg: 'from-[#dce8ea] via-[#e8f0f2] to-[#d2e1e6]',
    gridColor: 'rgba(15,118,110,0.055)',
    radialBg:
      'radial-gradient(circle at 50% 24%, rgba(255,255,255,0.58), rgba(13,148,136,0.06) 52%, rgba(15,23,42,0.05) 100%)',
    headerButtonHover: 'hover:text-teal-800 hover:bg-white/80',
    pausedText: 'text-teal-900/75',

    cardSurface:
      'bg-white/95 border-teal-200/80 shadow-[0_6px_20px_rgba(15,23,42,0.07),inset_0_1px_0_rgba(255,255,255,0.9)]',
    cardBorder: 'border-teal-200/85',
    rankImgBorder: 'border-teal-200',
    rankBarGrad: 'bg-gradient-to-r from-teal-600 via-emerald-500 to-sky-600',
    rankAwaitColor: 'bg-teal-600',
    scoreIconText: 'text-teal-600',
    totalIconText: 'text-sky-600',

    newGameBtn:
      'bg-teal-600 hover:bg-teal-700 border border-teal-700/20 text-white shadow-md shadow-teal-600/20',
    opsCountText: 'text-teal-600',
    linkBtn: 'bg-teal-50 hover:bg-teal-100 text-teal-700 hover:text-teal-800',
    solvedBannerBorder: 'border-teal-300',
    solvedTrophyBg: 'bg-teal-600 text-white',
    playAgainBtn: 'bg-teal-600 hover:bg-teal-700 text-white',
    logHeaderBg: 'bg-teal-50/70 border-teal-100',
    logIconText: 'text-teal-600',
    logRankUpText: 'text-teal-700 font-black tracking-wide',

    boardFrame: 'border-teal-800 bg-teal-800 shadow-[0_18px_40px_rgba(13,148,136,0.16)]',
    cellHover: 'bg-white hover:bg-teal-50/70',
    cellSelected: 'bg-teal-100 ring-2 ring-inset ring-teal-600',
    cellSameNumber: 'bg-sky-100/90',
    cellInUnit: 'bg-slate-100/90',
    cellErrorSelected: 'bg-rose-200 ring-2 ring-inset ring-rose-600',
    cellError: 'bg-rose-50/95',
    boxDividerRight: 'border-r-2 border-r-teal-700/75',
    boxDividerBottom: 'border-b-2 border-b-teal-700/75',
    digitPlayer: 'text-teal-700 font-extrabold',
    digitSameNumber: 'text-sky-800 font-black',
    noteSelected: 'text-teal-800',

    unitBanner:
      'bg-gradient-to-r from-teal-700 via-emerald-600 to-sky-700 text-white shadow-[0_8px_24px_rgba(13,148,136,0.38)] border-teal-200/80',
    unitBeamH:
      'bg-gradient-to-r from-teal-500/20 via-emerald-400/40 to-sky-500/20 border-y-2 border-teal-500/85 shadow-[0_0_20px_rgba(13,148,136,0.35)]',
    unitBeamV:
      'bg-gradient-to-b from-teal-500/20 via-emerald-400/40 to-sky-500/20 border-x-2 border-teal-500/85 shadow-[0_0_20px_rgba(13,148,136,0.35)]',
    unitBoxGlow:
      'border-teal-500 bg-teal-400/15 shadow-[inset_0_0_22px_rgba(13,148,136,0.32),0_0_20px_rgba(2,132,199,0.28)]',
    unitOriginRing: 'border-teal-600 shadow-[0_0_14px_rgba(13,148,136,0.65)]',
    unitCssVars: {
      '--unit-r1': '#99f6e4',
      '--unit-r2': '#bae6fd',
      '--unit-r1-glow': 'rgba(13,148,136,0.5)',
      '--unit-r2-glow': 'rgba(2,132,199,0.45)',
      '--unit-f1': '#a7f3d0',
      '--unit-f2': '#99f6e4',
      '--unit-f1-glow': 'rgba(16,185,129,0.55)',
      '--unit-f2-glow': 'rgba(13,148,136,0.42)',
      '--unit-n1': '#bae6fd',
      '--unit-n2': '#fde68a',
      '--unit-n1-glow': 'rgba(2,132,199,0.5)',
      '--unit-n2-glow': 'rgba(217,119,6,0.48)',
      '--unit-d1': '#0f766e',
      '--unit-d2': '#0369a1',
      '--unit-d-spin': '#047857',
      '--unit-d1-glow': 'rgba(13,148,136,0.4)',
      '--unit-d2-glow': 'rgba(2,132,199,0.38)',
      '--unit-d-spin-glow': 'rgba(16,185,129,0.45)',
    } as React.CSSProperties,

    toolCardBorder: 'border-teal-200/85',
    toolHoverText: 'hover:text-teal-700',
    toolHoverCard: 'group-hover:border-teal-500 group-hover:bg-teal-50',
    toolHoverLabel: 'group-hover:text-teal-700',
    notesActiveText: 'text-teal-800',
    notesActiveCard: 'border-teal-600 bg-teal-100/80 ring-2 ring-teal-500/35',
    notesActiveLabel: 'text-teal-800',
    hintHoverText: 'hover:text-sky-700',
    hintHoverCard: 'group-hover:border-sky-500 group-hover:bg-sky-50',
    hintHoverLabel: 'group-hover:text-sky-700',
    hintBadgeBg: 'bg-teal-600 text-white',

    numKeyActive:
      'text-slate-900 bg-white/95 border border-teal-200/90 shadow-[0_2px_6px_rgba(15,23,42,0.06),inset_0_1px_0_rgba(255,255,255,0.9)] hover:bg-teal-50 hover:border-teal-500 hover:text-teal-700 hover:scale-105 active:scale-95 cursor-pointer',

    timerBoxBorder: 'border-teal-200/85',
    timerBtnHover: 'hover:text-teal-700',
  },

  // MEDIUM: Cobalt Azure & Steel Ice (Matches border-blue-200)
  [Difficulty.MEDIUM]: {
    pageBg: 'from-[#c3d5ec] via-[#d5e3f4] to-[#b5cae6]',
    gridColor: 'rgba(29,78,216,0.06)',
    radialBg:
      'radial-gradient(circle at 50% 24%, rgba(255,255,255,0.44), rgba(37,99,235,0.08) 54%, rgba(15,23,42,0.06) 100%)',
    headerButtonHover: 'hover:text-blue-800 hover:bg-white/80',
    pausedText: 'text-blue-950/75',

    cardSurface:
      'bg-white/95 border-blue-200/85 shadow-[0_6px_20px_rgba(15,23,42,0.07),inset_0_1px_0_rgba(255,255,255,0.9)]',
    cardBorder: 'border-blue-200/85',
    rankImgBorder: 'border-blue-200',
    rankBarGrad: 'bg-gradient-to-r from-blue-600 via-sky-500 to-indigo-600',
    rankAwaitColor: 'bg-blue-600',
    scoreIconText: 'text-blue-600',
    totalIconText: 'text-indigo-600',

    newGameBtn:
      'bg-blue-600 hover:bg-blue-700 border border-blue-700/20 text-white shadow-md shadow-blue-600/20',
    opsCountText: 'text-blue-600',
    linkBtn: 'bg-blue-50 hover:bg-blue-100 text-blue-700 hover:text-blue-800',
    solvedBannerBorder: 'border-blue-300',
    solvedTrophyBg: 'bg-blue-600 text-white',
    playAgainBtn: 'bg-blue-600 hover:bg-blue-700 text-white',
    logHeaderBg: 'bg-blue-50/70 border-blue-100',
    logIconText: 'text-blue-600',
    logRankUpText: 'text-blue-700 font-black tracking-wide',

    boardFrame: 'border-blue-900 bg-blue-900 shadow-[0_18px_40px_rgba(37,99,235,0.18)]',
    cellHover: 'bg-white hover:bg-blue-50/70',
    cellSelected: 'bg-blue-100 ring-2 ring-inset ring-blue-600',
    cellSameNumber: 'bg-indigo-100/90',
    cellInUnit: 'bg-slate-100/90',
    cellErrorSelected: 'bg-rose-200 ring-2 ring-inset ring-rose-600',
    cellError: 'bg-rose-50/95',
    boxDividerRight: 'border-r-2 border-r-blue-700/75',
    boxDividerBottom: 'border-b-2 border-b-blue-700/75',
    digitPlayer: 'text-blue-700 font-extrabold',
    digitSameNumber: 'text-indigo-800 font-black',
    noteSelected: 'text-blue-800',

    unitBanner:
      'bg-gradient-to-r from-blue-700 via-sky-600 to-indigo-700 text-white shadow-[0_8px_24px_rgba(37,99,235,0.38)] border-blue-200/80',
    unitBeamH:
      'bg-gradient-to-r from-blue-500/20 via-sky-400/40 to-indigo-500/20 border-y-2 border-blue-500/85 shadow-[0_0_20px_rgba(37,99,235,0.35)]',
    unitBeamV:
      'bg-gradient-to-b from-blue-500/20 via-sky-400/40 to-indigo-500/20 border-x-2 border-blue-500/85 shadow-[0_0_20px_rgba(37,99,235,0.35)]',
    unitBoxGlow:
      'border-blue-500 bg-blue-400/15 shadow-[inset_0_0_22px_rgba(37,99,235,0.32),0_0_20px_rgba(79,70,229,0.28)]',
    unitOriginRing: 'border-blue-600 shadow-[0_0_14px_rgba(37,99,235,0.65)]',
    unitCssVars: {
      '--unit-r1': '#bfdbfe',
      '--unit-r2': '#c7d2fe',
      '--unit-r1-glow': 'rgba(37,99,235,0.5)',
      '--unit-r2-glow': 'rgba(79,70,229,0.45)',
      '--unit-f1': '#bae6fd',
      '--unit-f2': '#bfdbfe',
      '--unit-f1-glow': 'rgba(14,165,233,0.55)',
      '--unit-f2-glow': 'rgba(37,99,235,0.42)',
      '--unit-n1': '#c7d2fe',
      '--unit-n2': '#fde68a',
      '--unit-n1-glow': 'rgba(79,70,229,0.5)',
      '--unit-n2-glow': 'rgba(217,119,6,0.48)',
      '--unit-d1': '#1d4ed8',
      '--unit-d2': '#4338ca',
      '--unit-d-spin': '#0369a1',
      '--unit-d1-glow': 'rgba(37,99,235,0.4)',
      '--unit-d2-glow': 'rgba(79,70,229,0.38)',
      '--unit-d-spin-glow': 'rgba(14,165,233,0.45)',
    } as React.CSSProperties,

    toolCardBorder: 'border-blue-200/85',
    toolHoverText: 'hover:text-blue-700',
    toolHoverCard: 'group-hover:border-blue-500 group-hover:bg-blue-50',
    toolHoverLabel: 'group-hover:text-blue-700',
    notesActiveText: 'text-blue-800',
    notesActiveCard: 'border-blue-600 bg-blue-100/80 ring-2 ring-blue-500/35',
    notesActiveLabel: 'text-blue-800',
    hintHoverText: 'hover:text-indigo-700',
    hintHoverCard: 'group-hover:border-indigo-500 group-hover:bg-indigo-50',
    hintHoverLabel: 'group-hover:text-indigo-700',
    hintBadgeBg: 'bg-blue-600 text-white',

    numKeyActive:
      'text-slate-900 bg-white/95 border border-blue-200/90 shadow-[0_2px_6px_rgba(15,23,42,0.06),inset_0_1px_0_rgba(255,255,255,0.9)] hover:bg-blue-50 hover:border-blue-500 hover:text-blue-700 hover:scale-105 active:scale-95 cursor-pointer',

    timerBoxBorder: 'border-blue-200/85',
    timerBtnHover: 'hover:text-blue-700',
  },

  // HARD: Solar Ember & Warm Sandstone (Matches border-orange-200)
  [Difficulty.HARD]: {
    pageBg: 'from-[#f0dfd1] via-[#f7ece2] to-[#e7d1be]',
    gridColor: 'rgba(194,65,12,0.055)',
    radialBg:
      'radial-gradient(circle at 50% 24%, rgba(255,255,255,0.58), rgba(234,88,12,0.06) 52%, rgba(28,25,23,0.05) 100%)',
    headerButtonHover: 'hover:text-orange-700 hover:bg-white/80',
    pausedText: 'text-orange-950/75',

    cardSurface:
      'bg-white/95 border-orange-200/90 shadow-[0_6px_20px_rgba(28,25,23,0.07),inset_0_1px_0_rgba(255,255,255,0.9)]',
    cardBorder: 'border-orange-200/90',
    rankImgBorder: 'border-orange-200',
    rankBarGrad: 'bg-gradient-to-r from-orange-600 via-amber-500 to-red-600',
    rankAwaitColor: 'bg-orange-600',
    scoreIconText: 'text-orange-600',
    totalIconText: 'text-amber-700',

    newGameBtn:
      'bg-orange-600 hover:bg-orange-700 border border-orange-700/20 text-white shadow-md shadow-orange-600/20',
    opsCountText: 'text-orange-600',
    linkBtn: 'bg-orange-50 hover:bg-orange-100 text-orange-700 hover:text-orange-800',
    solvedBannerBorder: 'border-orange-300',
    solvedTrophyBg: 'bg-orange-600 text-white',
    playAgainBtn: 'bg-orange-600 hover:bg-orange-700 text-white',
    logHeaderBg: 'bg-orange-50/75 border-orange-100',
    logIconText: 'text-orange-600',
    logRankUpText: 'text-orange-700 font-black tracking-wide',

    boardFrame: 'border-orange-900 bg-orange-900 shadow-[0_18px_40px_rgba(234,88,12,0.18)]',
    cellHover: 'bg-white hover:bg-orange-50/75',
    cellSelected: 'bg-orange-100 ring-2 ring-inset ring-orange-600',
    cellSameNumber: 'bg-amber-100/95',
    cellInUnit: 'bg-stone-100/90',
    cellErrorSelected: 'bg-red-200 ring-2 ring-inset ring-red-600',
    cellError: 'bg-red-50/95',
    boxDividerRight: 'border-r-2 border-r-orange-700/75',
    boxDividerBottom: 'border-b-2 border-b-orange-700/75',
    digitPlayer: 'text-orange-700 font-extrabold',
    digitSameNumber: 'text-amber-900 font-black',
    noteSelected: 'text-orange-800',

    unitBanner:
      'bg-gradient-to-r from-orange-700 via-amber-600 to-red-700 text-white shadow-[0_8px_24px_rgba(234,88,12,0.38)] border-orange-200/80',
    unitBeamH:
      'bg-gradient-to-r from-orange-500/20 via-amber-400/40 to-red-500/20 border-y-2 border-orange-500/85 shadow-[0_0_20px_rgba(234,88,12,0.35)]',
    unitBeamV:
      'bg-gradient-to-b from-orange-500/20 via-amber-400/40 to-red-500/20 border-x-2 border-orange-500/85 shadow-[0_0_20px_rgba(234,88,12,0.35)]',
    unitBoxGlow:
      'border-orange-500 bg-orange-400/15 shadow-[inset_0_0_22px_rgba(234,88,12,0.32),0_0_20px_rgba(217,119,6,0.28)]',
    unitOriginRing: 'border-orange-600 shadow-[0_0_14px_rgba(234,88,12,0.65)]',
    unitCssVars: {
      '--unit-r1': '#fed7aa',
      '--unit-r2': '#fde68a',
      '--unit-r1-glow': 'rgba(234,88,12,0.5)',
      '--unit-r2-glow': 'rgba(217,119,6,0.45)',
      '--unit-f1': '#fde68a',
      '--unit-f2': '#fed7aa',
      '--unit-f1-glow': 'rgba(245,158,11,0.55)',
      '--unit-f2-glow': 'rgba(234,88,12,0.42)',
      '--unit-n1': '#fed7aa',
      '--unit-n2': '#fecaca',
      '--unit-n1-glow': 'rgba(234,88,12,0.5)',
      '--unit-n2-glow': 'rgba(220,38,38,0.42)',
      '--unit-d1': '#c2410c',
      '--unit-d2': '#b45309',
      '--unit-d-spin': '#b91c1c',
      '--unit-d1-glow': 'rgba(234,88,12,0.4)',
      '--unit-d2-glow': 'rgba(217,119,6,0.38)',
      '--unit-d-spin-glow': 'rgba(220,38,38,0.4)',
    } as React.CSSProperties,

    toolCardBorder: 'border-orange-200/90',
    toolHoverText: 'hover:text-orange-700',
    toolHoverCard: 'group-hover:border-orange-500 group-hover:bg-orange-50',
    toolHoverLabel: 'group-hover:text-orange-700',
    notesActiveText: 'text-orange-800',
    notesActiveCard: 'border-orange-600 bg-orange-100/80 ring-2 ring-orange-500/35',
    notesActiveLabel: 'text-orange-800',
    hintHoverText: 'hover:text-amber-700',
    hintHoverCard: 'group-hover:border-amber-500 group-hover:bg-amber-50',
    hintHoverLabel: 'group-hover:text-amber-700',
    hintBadgeBg: 'bg-orange-600 text-white',

    numKeyActive:
      'text-slate-900 bg-white/95 border border-orange-200/90 shadow-[0_2px_6px_rgba(28,25,23,0.06),inset_0_1px_0_rgba(255,255,255,0.9)] hover:bg-orange-50 hover:border-orange-500 hover:text-orange-700 hover:scale-105 active:scale-95 cursor-pointer',

    timerBoxBorder: 'border-orange-200/90',
    timerBtnHover: 'hover:text-orange-700',
  },

  // LEGENDARY: Imperial Amethyst & Lavender Mist (Matches border-purple-200)
  [Difficulty.LEGENDARY]: {
    pageBg: 'from-[#d2c5e6] via-[#e1d7f0] to-[#c4b4de]',
    gridColor: 'rgba(126,34,206,0.06)',
    radialBg:
      'radial-gradient(circle at 50% 24%, rgba(255,255,255,0.44), rgba(147,51,234,0.08) 54%, rgba(15,23,42,0.06) 100%)',
    headerButtonHover: 'hover:text-purple-800 hover:bg-white/80',
    pausedText: 'text-purple-950/75',

    cardSurface:
      'bg-white/95 border-purple-200/90 shadow-[0_6px_20px_rgba(15,23,42,0.07),inset_0_1px_0_rgba(255,255,255,0.9)]',
    cardBorder: 'border-purple-200/90',
    rankImgBorder: 'border-purple-200',
    rankBarGrad: 'bg-gradient-to-r from-purple-600 via-violet-500 to-fuchsia-600',
    rankAwaitColor: 'bg-purple-600',
    scoreIconText: 'text-purple-600',
    totalIconText: 'text-violet-600',

    newGameBtn:
      'bg-purple-600 hover:bg-purple-700 border border-purple-700/20 text-white shadow-md shadow-purple-600/20',
    opsCountText: 'text-purple-600',
    linkBtn: 'bg-purple-50 hover:bg-purple-100 text-purple-700 hover:text-purple-800',
    solvedBannerBorder: 'border-purple-300',
    solvedTrophyBg: 'bg-purple-600 text-white',
    playAgainBtn: 'bg-purple-600 hover:bg-purple-700 text-white',
    logHeaderBg: 'bg-purple-50/75 border-purple-100',
    logIconText: 'text-purple-600',
    logRankUpText: 'text-purple-700 font-black tracking-wide',

    boardFrame: 'border-purple-900 bg-purple-900 shadow-[0_18px_40px_rgba(147,51,234,0.18)]',
    cellHover: 'bg-white hover:bg-purple-50/75',
    cellSelected: 'bg-purple-100 ring-2 ring-inset ring-purple-600',
    cellSameNumber: 'bg-fuchsia-100/85',
    cellInUnit: 'bg-slate-100/90',
    cellErrorSelected: 'bg-rose-200 ring-2 ring-inset ring-rose-600',
    cellError: 'bg-rose-50/95',
    boxDividerRight: 'border-r-2 border-r-purple-700/75',
    boxDividerBottom: 'border-b-2 border-b-purple-700/75',
    digitPlayer: 'text-purple-700 font-extrabold',
    digitSameNumber: 'text-purple-950 font-black',
    noteSelected: 'text-purple-800',

    unitBanner:
      'bg-gradient-to-r from-purple-700 via-violet-600 to-fuchsia-700 text-white shadow-[0_8px_24px_rgba(147,51,234,0.38)] border-purple-200/80',
    unitBeamH:
      'bg-gradient-to-r from-purple-500/20 via-violet-400/40 to-fuchsia-500/20 border-y-2 border-purple-500/85 shadow-[0_0_20px_rgba(147,51,234,0.35)]',
    unitBeamV:
      'bg-gradient-to-b from-purple-500/20 via-violet-400/40 to-fuchsia-500/20 border-x-2 border-purple-500/85 shadow-[0_0_20px_rgba(147,51,234,0.35)]',
    unitBoxGlow:
      'border-purple-500 bg-purple-400/15 shadow-[inset_0_0_22px_rgba(147,51,234,0.32),0_0_20px_rgba(192,38,211,0.28)]',
    unitOriginRing: 'border-purple-600 shadow-[0_0_14px_rgba(147,51,234,0.65)]',
    unitCssVars: {
      '--unit-r1': '#e9d5ff',
      '--unit-r2': '#ddd6fe',
      '--unit-r1-glow': 'rgba(147,51,234,0.5)',
      '--unit-r2-glow': 'rgba(124,58,237,0.45)',
      '--unit-f1': '#f5d0fe',
      '--unit-f2': '#e9d5ff',
      '--unit-f1-glow': 'rgba(192,38,211,0.5)',
      '--unit-f2-glow': 'rgba(147,51,234,0.42)',
      '--unit-n1': '#ddd6fe',
      '--unit-n2': '#fde68a',
      '--unit-n1-glow': 'rgba(124,58,237,0.5)',
      '--unit-n2-glow': 'rgba(217,119,6,0.45)',
      '--unit-d1': '#7e22ce',
      '--unit-d2': '#6d28d9',
      '--unit-d-spin': '#a21caf',
      '--unit-d1-glow': 'rgba(147,51,234,0.4)',
      '--unit-d2-glow': 'rgba(124,58,237,0.38)',
      '--unit-d-spin-glow': 'rgba(192,38,211,0.42)',
    } as React.CSSProperties,

    toolCardBorder: 'border-purple-200/90',
    toolHoverText: 'hover:text-purple-700',
    toolHoverCard: 'group-hover:border-purple-500 group-hover:bg-purple-50',
    toolHoverLabel: 'group-hover:text-purple-700',
    notesActiveText: 'text-purple-800',
    notesActiveCard: 'border-purple-600 bg-purple-100/80 ring-2 ring-purple-500/35',
    notesActiveLabel: 'text-purple-800',
    hintHoverText: 'hover:text-violet-700',
    hintHoverCard: 'group-hover:border-violet-500 group-hover:bg-violet-50',
    hintHoverLabel: 'group-hover:text-violet-700',
    hintBadgeBg: 'bg-purple-600 text-white',

    numKeyActive:
      'text-slate-900 bg-white/95 border border-purple-200/90 shadow-[0_2px_6px_rgba(15,23,42,0.06),inset_0_1px_0_rgba(255,255,255,0.9)] hover:bg-purple-50 hover:border-purple-500 hover:text-purple-700 hover:scale-105 active:scale-95 cursor-pointer',

    timerBoxBorder: 'border-purple-200/90',
    timerBtnHover: 'hover:text-purple-700',
  },

  // INSANE: Crimson Vanguard & Scarlet Mist (Matches border-rose-200)
  [Difficulty.INSANE]: {
    pageBg: 'from-[#e4c2ca] via-[#eed4da] to-[#d8b1ba]',
    gridColor: 'rgba(190,18,60,0.06)',
    radialBg:
      'radial-gradient(circle at 50% 24%, rgba(255,255,255,0.42), rgba(225,29,72,0.08) 54%, rgba(15,23,42,0.07) 100%)',
    headerButtonHover: 'hover:text-rose-800 hover:bg-white/80',
    pausedText: 'text-rose-950/75',

    cardSurface:
      'bg-white/95 border-rose-200/90 shadow-[0_6px_20px_rgba(15,23,42,0.07),inset_0_1px_0_rgba(255,255,255,0.9)]',
    cardBorder: 'border-rose-200/90',
    rankImgBorder: 'border-rose-200',
    rankBarGrad: 'bg-gradient-to-r from-rose-600 via-red-500 to-amber-500',
    rankAwaitColor: 'bg-rose-600',
    scoreIconText: 'text-rose-600',
    totalIconText: 'text-slate-600',

    newGameBtn:
      'bg-rose-600 hover:bg-rose-700 border border-rose-700/20 text-white shadow-md shadow-rose-600/20',
    opsCountText: 'text-rose-600',
    linkBtn: 'bg-rose-50 hover:bg-rose-100 text-rose-700 hover:text-rose-800',
    solvedBannerBorder: 'border-rose-300',
    solvedTrophyBg: 'bg-rose-600 text-white',
    playAgainBtn: 'bg-rose-600 hover:bg-rose-700 text-white',
    logHeaderBg: 'bg-rose-50/75 border-rose-100',
    logIconText: 'text-rose-600',
    logRankUpText: 'text-rose-700 font-black tracking-wide',

    boardFrame: 'border-rose-900 bg-rose-900 shadow-[0_18px_40px_rgba(225,29,72,0.18)]',
    cellHover: 'bg-white hover:bg-rose-50/75',
    cellSelected: 'bg-rose-100 ring-2 ring-inset ring-rose-600',
    cellSameNumber: 'bg-amber-100/90',
    cellInUnit: 'bg-slate-100/90',
    cellErrorSelected: 'bg-red-200 ring-2 ring-inset ring-red-700',
    cellError: 'bg-red-100 ring-1 ring-inset ring-red-300',
    boxDividerRight: 'border-r-2 border-r-rose-700/75',
    boxDividerBottom: 'border-b-2 border-b-rose-700/75',
    digitPlayer: 'text-rose-700 font-extrabold',
    digitSameNumber: 'text-amber-900 font-black',
    noteSelected: 'text-rose-800',

    unitBanner:
      'bg-gradient-to-r from-rose-700 via-red-600 to-amber-600 text-white shadow-[0_8px_24px_rgba(225,29,72,0.38)] border-rose-200/80',
    unitBeamH:
      'bg-gradient-to-r from-rose-500/20 via-red-400/40 to-amber-500/20 border-y-2 border-rose-500/85 shadow-[0_0_20px_rgba(225,29,72,0.35)]',
    unitBeamV:
      'bg-gradient-to-b from-rose-500/20 via-red-400/40 to-amber-500/20 border-x-2 border-rose-500/85 shadow-[0_0_20px_rgba(225,29,72,0.35)]',
    unitBoxGlow:
      'border-rose-500 bg-rose-400/15 shadow-[inset_0_0_22px_rgba(225,29,72,0.32),0_0_20px_rgba(220,38,38,0.28)]',
    unitOriginRing: 'border-rose-600 shadow-[0_0_14px_rgba(225,29,72,0.65)]',
    unitCssVars: {
      '--unit-r1': '#fecdd3',
      '--unit-r2': '#fde68a',
      '--unit-r1-glow': 'rgba(225,29,72,0.5)',
      '--unit-r2-glow': 'rgba(217,119,6,0.45)',
      '--unit-f1': '#fecaca',
      '--unit-f2': '#fecdd3',
      '--unit-f1-glow': 'rgba(220,38,38,0.52)',
      '--unit-f2-glow': 'rgba(225,29,72,0.42)',
      '--unit-n1': '#fecdd3',
      '--unit-n2': '#fde68a',
      '--unit-n1-glow': 'rgba(225,29,72,0.5)',
      '--unit-n2-glow': 'rgba(245,158,11,0.48)',
      '--unit-d1': '#be123c',
      '--unit-d2': '#b45309',
      '--unit-d-spin': '#b91c1c',
      '--unit-d1-glow': 'rgba(225,29,72,0.4)',
      '--unit-d2-glow': 'rgba(217,119,6,0.38)',
      '--unit-d-spin-glow': 'rgba(220,38,38,0.42)',
    } as React.CSSProperties,

    toolCardBorder: 'border-rose-200/90',
    toolHoverText: 'hover:text-rose-700',
    toolHoverCard: 'group-hover:border-rose-500 group-hover:bg-rose-50',
    toolHoverLabel: 'group-hover:text-rose-700',
    notesActiveText: 'text-rose-800',
    notesActiveCard: 'border-rose-600 bg-rose-100/80 ring-2 ring-rose-500/35',
    notesActiveLabel: 'text-rose-800',
    hintHoverText: 'hover:text-amber-700',
    hintHoverCard: 'group-hover:border-amber-500 group-hover:bg-amber-50',
    hintHoverLabel: 'group-hover:text-amber-700',
    hintBadgeBg: 'bg-rose-600 text-white',

    numKeyActive:
      'text-slate-900 bg-white/95 border border-rose-200/90 shadow-[0_2px_6px_rgba(15,23,42,0.06),inset_0_1px_0_rgba(255,255,255,0.9)] hover:bg-rose-50 hover:border-rose-500 hover:text-rose-700 hover:scale-105 active:scale-95 cursor-pointer',

    timerBoxBorder: 'border-rose-200/90',
    timerBtnHover: 'hover:text-rose-700',
  },
};
