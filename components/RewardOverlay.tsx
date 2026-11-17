import React, { useEffect, useState } from 'react';
import { RANKS } from '../data/gameData';
import { Crown, FastForward, Flame } from 'lucide-react';

interface RewardOverlayProps {
  gifUrl: string;
  quote: string;
  xp: number;
  rankIndex?: number;
  rewardDurationMs: number;
  onClose: () => void;
}

const RANKUP_SPARKS = [
  { id: 0, tx: '-130px', ty: '-75px', rot: '180deg', delay: '0.02s', color: 'bg-amber-500', size: 'w-3 h-2.5' },
  { id: 1, tx: '-95px', ty: '-115px', rot: '-210deg', delay: '0.06s', color: 'bg-red-600', size: 'w-2.5 h-3.5' },
  { id: 2, tx: '-35px', ty: '-125px', rot: '260deg', delay: '0.04s', color: 'bg-slate-800', size: 'w-3 h-2' },
  { id: 3, tx: '40px', ty: '-125px', rot: '-240deg', delay: '0.05s', color: 'bg-orange-600', size: 'w-2.5 h-3' },
  { id: 4, tx: '100px', ty: '-110px', rot: '220deg', delay: '0.08s', color: 'bg-amber-600', size: 'w-2.5 h-3.5' },
  { id: 5, tx: '135px', ty: '-70px', rot: '-190deg', delay: '0.03s', color: 'bg-red-700', size: 'w-3 h-2.5' },
  { id: 6, tx: '-145px', ty: '15px', rot: '280deg', delay: '0.09s', color: 'bg-slate-700', size: 'w-2.5 h-3' },
  { id: 7, tx: '145px', ty: '20px', rot: '-270deg', delay: '0.07s', color: 'bg-amber-500', size: 'w-3 h-2' },
];

type NormalSparkPreset =
  | 'ceiling-cascade'
  | 'two-way-street'
  | 'diagonal-sweep'
  | 'floor-ascension'
  | 'diagonal-cross'
  | 'radial-burst';

const NORMAL_SPARK_PRESETS: NormalSparkPreset[] = [
  'ceiling-cascade',
  'two-way-street',
  'diagonal-sweep',
  'floor-ascension',
  'diagonal-cross',
  'radial-burst',
];

let normalSparkBag: NormalSparkPreset[] = [];
let lastNormalSparkPreset: NormalSparkPreset | null = null;

function popNextNormalSparkPreset(): NormalSparkPreset {
  if (normalSparkBag.length === 0) {
    const nextBag = [...NORMAL_SPARK_PRESETS];
    for (let i = nextBag.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [nextBag[i], nextBag[j]] = [nextBag[j], nextBag[i]];
    }
    if (nextBag.length > 1 && nextBag[nextBag.length - 1] === lastNormalSparkPreset) {
      [nextBag[0], nextBag[nextBag.length - 1]] = [nextBag[nextBag.length - 1], nextBag[0]];
    }
    normalSparkBag = nextBag;
  }
  const picked = normalSparkBag.pop()!;
  lastNormalSparkPreset = picked;
  return picked;
}

type SparkShape = 'ember' | 'blade' | 'bolt' | 'chevron';

interface EnergySparkSpec {
  id: number;
  left: string;
  top: string;
  mx: string;
  my: string;
  dx: string;
  dy: string;
  srot: string;
  mrot: string;
  erot: string;
  peakScale: number;
  duration: string;
  delay: string;
  size: number;
  shape: SparkShape;
  colorIdx: number;
}

interface EnergyStreakSpec {
  id: number;
  left: string;
  top: string;
  angle: string;
  dist: string;
  width: string;
  duration: string;
  delay: string;
  colorIdx: number;
}

interface SparkChoreography {
  sparks: EnergySparkSpec[];
  streaks: EnergyStreakSpec[];
}

const NORMAL_PRESET_DATA: Record<NormalSparkPreset, SparkChoreography> = {
  // 1. Falling strictly from the ceiling downward (Artillery embers & downward blades)
  'ceiling-cascade': {
    sparks: [
      { id: 0, left: '8%', top: '-6%', mx: '12px', my: '56vh', dx: '-8px', dy: '114vh', srot: '165deg', mrot: '185deg', erot: '205deg', peakScale: 1.2, duration: '2.5s', delay: '0s', size: 17, shape: 'blade', colorIdx: 0 },
      { id: 1, left: '17%', top: '-6%', mx: '-14px', my: '56vh', dx: '10px', dy: '114vh', srot: '15deg', mrot: '125deg', erot: '235deg', peakScale: 1.15, duration: '2.9s', delay: '0.55s', size: 15, shape: 'ember', colorIdx: 2 },
      { id: 2, left: '26%', top: '-6%', mx: '16px', my: '56vh', dx: '-10px', dy: '114vh', srot: '0deg', mrot: '-35deg', erot: '-70deg', peakScale: 1.2, duration: '2.3s', delay: '1.1s', size: 17, shape: 'bolt', colorIdx: 1 },
      { id: 3, left: '36%', top: '-6%', mx: '-12px', my: '56vh', dx: '14px', dy: '114vh', srot: '20deg', mrot: '130deg', erot: '240deg', peakScale: 1.15, duration: '2.7s', delay: '0.25s', size: 15, shape: 'ember', colorIdx: 3 },
      { id: 4, left: '47%', top: '-6%', mx: '10px', my: '56vh', dx: '-12px', dy: '114vh', srot: '180deg', mrot: '180deg', erot: '180deg', peakScale: 1.25, duration: '2.4s', delay: '0.85s', size: 18, shape: 'blade', colorIdx: 0 },
      { id: 5, left: '58%', top: '-6%', mx: '-16px', my: '56vh', dx: '8px', dy: '114vh', srot: '10deg', mrot: '-110deg', erot: '-220deg', peakScale: 1.15, duration: '2.8s', delay: '1.4s', size: 15, shape: 'ember', colorIdx: 2 },
      { id: 6, left: '68%', top: '-6%', mx: '14px', my: '56vh', dx: '-10px', dy: '114vh', srot: '0deg', mrot: '40deg', erot: '85deg', peakScale: 1.2, duration: '2.35s', delay: '0.4s', size: 17, shape: 'bolt', colorIdx: 1 },
      { id: 7, left: '78%', top: '-6%', mx: '-10px', my: '56vh', dx: '12px', dy: '114vh', srot: '25deg', mrot: '145deg', erot: '260deg', peakScale: 1.1, duration: '2.65s', delay: '0.95s', size: 15, shape: 'ember', colorIdx: 3 },
      { id: 8, left: '87%', top: '-6%', mx: '12px', my: '56vh', dx: '-14px', dy: '114vh', srot: '175deg', mrot: '190deg', erot: '205deg', peakScale: 1.2, duration: '2.55s', delay: '0.15s', size: 16, shape: 'blade', colorIdx: 0 },
      { id: 9, left: '94%', top: '-6%', mx: '-14px', my: '56vh', dx: '8px', dy: '114vh', srot: '10deg', mrot: '115deg', erot: '220deg', peakScale: 1.15, duration: '2.95s', delay: '1.25s', size: 14, shape: 'ember', colorIdx: 2 },
    ],
    streaks: [
      { id: 0, left: '12%', top: '-8%', angle: '90deg', dist: '118vh', width: 'w-16', duration: '1.65s', delay: '0s', colorIdx: 0 },
      { id: 1, left: '29%', top: '-8%', angle: '90deg', dist: '118vh', width: 'w-14', duration: '1.8s', delay: '0.45s', colorIdx: 1 },
      { id: 2, left: '44%', top: '-8%', angle: '90deg', dist: '118vh', width: 'w-20', duration: '1.55s', delay: '0.9s', colorIdx: 2 },
      { id: 3, left: '63%', top: '-8%', angle: '90deg', dist: '118vh', width: 'w-16', duration: '1.75s', delay: '0.25s', colorIdx: 0 },
      { id: 4, left: '75%', top: '-8%', angle: '90deg', dist: '118vh', width: 'w-14', duration: '1.6s', delay: '0.7s', colorIdx: 1 },
      { id: 5, left: '90%', top: '-8%', angle: '90deg', dist: '118vh', width: 'w-16', duration: '1.85s', delay: '1.2s', colorIdx: 2 },
    ],
  },

  // 2. Two-Way "Street" Lanes: Opposing crossfire spear-blades & hot shrapnel
  'two-way-street': {
    sparks: [
      // Left -> Right lanes
      { id: 0, left: '-5%', top: '14%', mx: '56vw', my: '-8px', dx: '114vw', dy: '4px', srot: '90deg', mrot: '90deg', erot: '90deg', peakScale: 1.25, duration: '2.0s', delay: '0s', size: 18, shape: 'blade', colorIdx: 0 },
      { id: 1, left: '-5%', top: '28%', mx: '56vw', my: '10px', dx: '114vw', dy: '-4px', srot: '15deg', mrot: '145deg', erot: '275deg', peakScale: 1.15, duration: '2.3s', delay: '0.65s', size: 15, shape: 'ember', colorIdx: 2 },
      { id: 2, left: '-5%', top: '66%', mx: '56vw', my: '-8px', dx: '114vw', dy: '6px', srot: '90deg', mrot: '90deg', erot: '90deg', peakScale: 1.2, duration: '1.95s', delay: '0.3s', size: 17, shape: 'chevron', colorIdx: 1 },
      { id: 3, left: '-5%', top: '80%', mx: '56vw', my: '8px', dx: '114vw', dy: '-6px', srot: '10deg', mrot: '125deg', erot: '250deg', peakScale: 1.15, duration: '2.2s', delay: '1.1s', size: 15, shape: 'ember', colorIdx: 3 },
      { id: 4, left: '-5%', top: '48%', mx: '56vw', my: '-6px', dx: '114vw', dy: '4px', srot: '70deg', mrot: '95deg', erot: '115deg', peakScale: 1.15, duration: '2.35s', delay: '1.35s', size: 15, shape: 'bolt', colorIdx: 0 },
      // Right -> Left opposing lanes
      { id: 5, left: '105%', top: '21%', mx: '-56vw', my: '8px', dx: '-114vw', dy: '-4px', srot: '-90deg', mrot: '-90deg', erot: '-90deg', peakScale: 1.25, duration: '2.05s', delay: '0.2s', size: 18, shape: 'blade', colorIdx: 1 },
      { id: 6, left: '105%', top: '36%', mx: '-56vw', my: '-10px', dx: '-114vw', dy: '4px', srot: '15deg', mrot: '-140deg', erot: '-280deg', peakScale: 1.15, duration: '2.35s', delay: '0.9s', size: 15, shape: 'ember', colorIdx: 3 },
      { id: 7, left: '105%', top: '73%', mx: '-56vw', my: '10px', dx: '-114vw', dy: '-6px', srot: '-90deg', mrot: '-90deg', erot: '-90deg', peakScale: 1.2, duration: '1.95s', delay: '0.5s', size: 17, shape: 'chevron', colorIdx: 2 },
      { id: 8, left: '105%', top: '87%', mx: '-56vw', my: '-8px', dx: '-114vw', dy: '6px', srot: '10deg', mrot: '-120deg', erot: '-240deg', peakScale: 1.15, duration: '2.25s', delay: '1.25s', size: 15, shape: 'ember', colorIdx: 0 },
      { id: 9, left: '105%', top: '55%', mx: '-56vw', my: '6px', dx: '-114vw', dy: '-4px', srot: '-75deg', mrot: '-95deg', erot: '-115deg', peakScale: 1.15, duration: '2.4s', delay: '0.75s', size: 15, shape: 'bolt', colorIdx: 3 },
    ],
    streaks: [
      { id: 0, left: '-8%', top: '17%', angle: '0deg', dist: '118vw', width: 'w-24', duration: '1.5s', delay: '0.1s', colorIdx: 0 },
      { id: 1, left: '108%', top: '24%', angle: '180deg', dist: '118vw', width: 'w-24', duration: '1.6s', delay: '0.4s', colorIdx: 1 },
      { id: 2, left: '-8%', top: '33%', angle: '0deg', dist: '118vw', width: 'w-20', duration: '1.7s', delay: '0.85s', colorIdx: 2 },
      { id: 3, left: '108%', top: '70%', angle: '180deg', dist: '118vw', width: 'w-24', duration: '1.55s', delay: '0.25s', colorIdx: 0 },
      { id: 4, left: '-8%', top: '77%', angle: '0deg', dist: '118vw', width: 'w-24', duration: '1.65s', delay: '0.65s', colorIdx: 1 },
      { id: 5, left: '108%', top: '85%', angle: '180deg', dist: '118vw', width: 'w-20', duration: '1.75s', delay: '1.1s', colorIdx: 2 },
    ],
  },

  // 3. Parallel Diagonal Sweep (Angled steel & fire barrage Top-Left -> Bottom-Right)
  'diagonal-sweep': {
    sparks: [
      { id: 0, left: '-5%', top: '10%', mx: '54vw', my: '44vh', dx: '110vw', dy: '90vh', srot: '128deg', mrot: '128deg', erot: '128deg', peakScale: 1.25, duration: '2.3s', delay: '0s', size: 18, shape: 'blade', colorIdx: 0 },
      { id: 1, left: '-5%', top: '35%', mx: '46vw', my: '38vh', dx: '94vw', dy: '78vh', srot: '15deg', mrot: '135deg', erot: '250deg', peakScale: 1.15, duration: '2.2s', delay: '0.5s', size: 15, shape: 'ember', colorIdx: 2 },
      { id: 2, left: '-5%', top: '62%', mx: '34vw', my: '28vh', dx: '70vw', dy: '58vh', srot: '115deg', mrot: '130deg', erot: '145deg', peakScale: 1.15, duration: '2.0s', delay: '1.0s', size: 17, shape: 'bolt', colorIdx: 1 },
      { id: 3, left: '14%', top: '-5%', mx: '48vw', my: '52vh', dx: '98vw', dy: '108vh', srot: '128deg', mrot: '128deg', erot: '128deg', peakScale: 1.25, duration: '2.4s', delay: '0.25s', size: 19, shape: 'blade', colorIdx: 3 },
      { id: 4, left: '34%', top: '-5%', mx: '42vw', my: '52vh', dx: '86vw', dy: '108vh', srot: '0deg', mrot: '120deg', erot: '240deg', peakScale: 1.15, duration: '2.3s', delay: '0.75s', size: 15, shape: 'ember', colorIdx: 0 },
      { id: 5, left: '54%', top: '-5%', mx: '32vw', my: '50vh', dx: '66vw', dy: '104vh', srot: '128deg', mrot: '128deg', erot: '128deg', peakScale: 1.2, duration: '2.1s', delay: '1.25s', size: 17, shape: 'chevron', colorIdx: 2 },
      { id: 6, left: '72%', top: '-5%', mx: '22vw', my: '42vh', dx: '46vw', dy: '86vh', srot: '0deg', mrot: '110deg', erot: '220deg', peakScale: 1.15, duration: '1.9s', delay: '0.4s', size: 14, shape: 'ember', colorIdx: 1 },
      { id: 7, left: '4%', top: '-5%', mx: '52vw', my: '54vh', dx: '106vw', dy: '110vh', srot: '125deg', mrot: '135deg', erot: '145deg', peakScale: 1.25, duration: '2.5s', delay: '1.45s', size: 18, shape: 'bolt', colorIdx: 3 },
    ],
    streaks: [
      { id: 0, left: '-6%', top: '4%', angle: '38deg', dist: '135vmax', width: 'w-24', duration: '1.65s', delay: '0.1s', colorIdx: 0 },
      { id: 1, left: '-6%', top: '28%', angle: '38deg', dist: '120vmax', width: 'w-20', duration: '1.75s', delay: '0.6s', colorIdx: 1 },
      { id: 2, left: '-6%', top: '54%', angle: '38deg', dist: '95vmax', width: 'w-16', duration: '1.6s', delay: '1.05s', colorIdx: 2 },
      { id: 3, left: '22%', top: '-6%', angle: '38deg', dist: '130vmax', width: 'w-24', duration: '1.7s', delay: '0.35s', colorIdx: 0 },
      { id: 4, left: '48%', top: '-6%', angle: '38deg', dist: '110vmax', width: 'w-20', duration: '1.65s', delay: '0.85s', colorIdx: 1 },
      { id: 5, left: '70%', top: '-6%', angle: '38deg', dist: '85vmax', width: 'w-16', duration: '1.55s', delay: '1.3s', colorIdx: 2 },
    ],
  },

  // 4. Rising strictly from bottom floor upward (Forge embers & upward war-chevrons)
  'floor-ascension': {
    sparks: [
      { id: 0, left: '10%', top: '106%', mx: '16px', my: '-56vh', dx: '-12px', dy: '-114vh', srot: '0deg', mrot: '115deg', erot: '230deg', peakScale: 1.2, duration: '2.4s', delay: '0s', size: 17, shape: 'ember', colorIdx: 0 },
      { id: 1, left: '20%', top: '106%', mx: '-18px', my: '-56vh', dx: '10px', dy: '-114vh', srot: '0deg', mrot: '0deg', erot: '0deg', peakScale: 1.2, duration: '2.7s', delay: '0.5s', size: 17, shape: 'chevron', colorIdx: 2 },
      { id: 2, left: '30%', top: '106%', mx: '14px', my: '-56vh', dx: '-10px', dy: '-114vh', srot: '-12deg', mrot: '12deg', erot: '-8deg', peakScale: 1.2, duration: '2.25s', delay: '1.05s', size: 17, shape: 'bolt', colorIdx: 1 },
      { id: 3, left: '41%', top: '106%', mx: '-14px', my: '-56vh', dx: '12px', dy: '-114vh', srot: '20deg', mrot: '140deg', erot: '260deg', peakScale: 1.15, duration: '2.6s', delay: '0.25s', size: 15, shape: 'ember', colorIdx: 3 },
      { id: 4, left: '52%', top: '106%', mx: '18px', my: '-56vh', dx: '-14px', dy: '-114vh', srot: '0deg', mrot: '-8deg', erot: '8deg', peakScale: 1.25, duration: '2.35s', delay: '0.8s', size: 18, shape: 'blade', colorIdx: 0 },
      { id: 5, left: '62%', top: '106%', mx: '-16px', my: '-56vh', dx: '14px', dy: '-114vh', srot: '10deg', mrot: '-115deg', erot: '-230deg', peakScale: 1.15, duration: '2.7s', delay: '1.35s', size: 15, shape: 'ember', colorIdx: 2 },
      { id: 6, left: '72%', top: '106%', mx: '12px', my: '-56vh', dx: '-8px', dy: '-114vh', srot: '0deg', mrot: '0deg', erot: '0deg', peakScale: 1.2, duration: '2.3s', delay: '0.4s', size: 17, shape: 'chevron', colorIdx: 1 },
      { id: 7, left: '82%', top: '106%', mx: '-14px', my: '-56vh', dx: '16px', dy: '-114vh', srot: '25deg', mrot: '-130deg', erot: '-260deg', peakScale: 1.15, duration: '2.55s', delay: '0.95s', size: 15, shape: 'ember', colorIdx: 3 },
      { id: 8, left: '91%', top: '106%', mx: '12px', my: '-56vh', dx: '-10px', dy: '-114vh', srot: '8deg', mrot: '-10deg', erot: '12deg', peakScale: 1.2, duration: '2.45s', delay: '0.15s', size: 16, shape: 'bolt', colorIdx: 0 },
    ],
    streaks: [
      { id: 0, left: '14%', top: '108%', angle: '-90deg', dist: '118vh', width: 'w-16', duration: '1.65s', delay: '0s', colorIdx: 0 },
      { id: 1, left: '28%', top: '108%', angle: '-90deg', dist: '118vh', width: 'w-20', duration: '1.8s', delay: '0.5s', colorIdx: 1 },
      { id: 2, left: '46%', top: '108%', angle: '-90deg', dist: '118vh', width: 'w-16', duration: '1.6s', delay: '0.95s', colorIdx: 2 },
      { id: 3, left: '66%', top: '108%', angle: '-90deg', dist: '118vh', width: 'w-20', duration: '1.75s', delay: '0.3s', colorIdx: 0 },
      { id: 4, left: '80%', top: '108%', angle: '-90deg', dist: '118vh', width: 'w-16', duration: '1.7s', delay: '0.75s', colorIdx: 1 },
      { id: 5, left: '92%', top: '108%', angle: '-90deg', dist: '118vh', width: 'w-14', duration: '1.85s', delay: '1.2s', colorIdx: 2 },
    ],
  },

  // 5. X-Cross Diagonals (Four-corner blade & bolt clash across the arena)
  'diagonal-cross': {
    sparks: [
      { id: 0, left: '-4%', top: '-4%', mx: '54vw', my: '52vh', dx: '108vw', dy: '108vh', srot: '130deg', mrot: '130deg', erot: '130deg', peakScale: 1.25, duration: '2.25s', delay: '0s', size: 18, shape: 'blade', colorIdx: 0 },
      { id: 1, left: '-4%', top: '14%', mx: '54vw', my: '44vh', dx: '108vw', dy: '88vh', srot: '15deg', mrot: '135deg', erot: '255deg', peakScale: 1.15, duration: '2.45s', delay: '0.7s', size: 15, shape: 'ember', colorIdx: 2 },
      { id: 2, left: '104%', top: '-4%', mx: '-54vw', my: '52vh', dx: '-108vw', dy: '108vh', srot: '-130deg', mrot: '-130deg', erot: '-130deg', peakScale: 1.25, duration: '2.3s', delay: '0.3s', size: 18, shape: 'blade', colorIdx: 1 },
      { id: 3, left: '104%', top: '14%', mx: '-54vw', my: '44vh', dx: '-108vw', dy: '88vh', srot: '15deg', mrot: '-135deg', erot: '-255deg', peakScale: 1.15, duration: '2.5s', delay: '1.05s', size: 15, shape: 'ember', colorIdx: 3 },
      { id: 4, left: '-4%', top: '104%', mx: '54vw', my: '-52vh', dx: '108vw', dy: '-108vh', srot: '50deg', mrot: '50deg', erot: '50deg', peakScale: 1.25, duration: '2.2s', delay: '0.5s', size: 18, shape: 'chevron', colorIdx: 2 },
      { id: 5, left: '-4%', top: '86%', mx: '54vw', my: '-44vh', dx: '108vw', dy: '-88vh', srot: '35deg', mrot: '55deg', erot: '75deg', peakScale: 1.15, duration: '2.4s', delay: '1.25s', size: 16, shape: 'bolt', colorIdx: 0 },
      { id: 6, left: '104%', top: '104%', mx: '-54vw', my: '-52vh', dx: '-108vw', dy: '-108vh', srot: '-50deg', mrot: '-50deg', erot: '-50deg', peakScale: 1.25, duration: '2.35s', delay: '0.85s', size: 18, shape: 'chevron', colorIdx: 3 },
      { id: 7, left: '104%', top: '86%', mx: '-54vw', my: '-44vh', dx: '-108vw', dy: '-88vh', srot: '-35deg', mrot: '-55deg', erot: '-75deg', peakScale: 1.15, duration: '2.55s', delay: '0.15s', size: 16, shape: 'bolt', colorIdx: 1 },
    ],
    streaks: [
      { id: 0, left: '-6%', top: '-6%', angle: '38deg', dist: '138vmax', width: 'w-24', duration: '1.65s', delay: '0.1s', colorIdx: 0 },
      { id: 1, left: '106%', top: '-6%', angle: '142deg', dist: '138vmax', width: 'w-24', duration: '1.7s', delay: '0.45s', colorIdx: 1 },
      { id: 2, left: '-6%', top: '106%', angle: '-38deg', dist: '138vmax', width: 'w-24', duration: '1.6s', delay: '0.8s', colorIdx: 2 },
      { id: 3, left: '106%', top: '106%', angle: '-142deg', dist: '138vmax', width: 'w-24', duration: '1.75s', delay: '1.15s', colorIdx: 0 },
      { id: 4, left: '10%', top: '-6%', angle: '42deg', dist: '130vmax', width: 'w-16', duration: '1.8s', delay: '0.6s', colorIdx: 1 },
      { id: 5, left: '90%', top: '-6%', angle: '138deg', dist: '130vmax', width: 'w-16', duration: '1.85s', delay: '1.3s', colorIdx: 2 },
    ],
  },

  // 6. Radial 360° Shockwave Blast expanding outward from behind center
  'radial-burst': {
    sparks: [
      { id: 0, left: '50%', top: '50%', mx: '-170px', my: '-140px', dx: '-340px', dy: '-280px', srot: '-50deg', mrot: '-50deg', erot: '-50deg', peakScale: 1.25, duration: '1.85s', delay: '0s', size: 19, shape: 'blade', colorIdx: 0 },
      { id: 1, left: '50%', top: '50%', mx: '175px', my: '-135px', dx: '350px', dy: '-270px', srot: '52deg', mrot: '52deg', erot: '52deg', peakScale: 1.25, duration: '1.95s', delay: '0.25s', size: 19, shape: 'blade', colorIdx: 1 },
      { id: 2, left: '50%', top: '50%', mx: '-220px', my: '-10px', dx: '-430px', dy: '-25px', srot: '-95deg', mrot: '-95deg', erot: '-95deg', peakScale: 1.2, duration: '1.75s', delay: '0.5s', size: 17, shape: 'chevron', colorIdx: 2 },
      { id: 3, left: '50%', top: '50%', mx: '220px', my: '10px', dx: '430px', dy: '25px', srot: '95deg', mrot: '95deg', erot: '95deg', peakScale: 1.2, duration: '1.8s', delay: '0.75s', size: 17, shape: 'chevron', colorIdx: 3 },
      { id: 4, left: '50%', top: '50%', mx: '-165px', my: '145px', dx: '-330px', dy: '290px', srot: '10deg', mrot: '130deg', erot: '250deg', peakScale: 1.2, duration: '2.0s', delay: '0.35s', size: 16, shape: 'ember', colorIdx: 1 },
      { id: 5, left: '50%', top: '50%', mx: '165px', my: '145px', dx: '330px', dy: '290px', srot: '-10deg', mrot: '-130deg', erot: '-250deg', peakScale: 1.2, duration: '1.9s', delay: '0.9s', size: 16, shape: 'ember', colorIdx: 0 },
      { id: 6, left: '50%', top: '50%', mx: '-20px', my: '-190px', dx: '-40px', dy: '-360px', srot: '-8deg', mrot: '8deg', erot: '-5deg', peakScale: 1.25, duration: '1.7s', delay: '1.15s', size: 18, shape: 'bolt', colorIdx: 2 },
      { id: 7, left: '50%', top: '50%', mx: '25px', my: '185px', dx: '50px', dy: '350px', srot: '170deg', mrot: '185deg', erot: '175deg', peakScale: 1.2, duration: '2.05s', delay: '0.6s', size: 18, shape: 'bolt', colorIdx: 3 },
    ],
    streaks: [
      { id: 0, left: '50%', top: '50%', angle: '-150deg', dist: '420px', width: 'w-16', duration: '1.45s', delay: '0s', colorIdx: 0 },
      { id: 1, left: '50%', top: '50%', angle: '-95deg', dist: '380px', width: 'w-14', duration: '1.55s', delay: '0.3s', colorIdx: 1 },
      { id: 2, left: '50%', top: '50%', angle: '-32deg', dist: '420px', width: 'w-16', duration: '1.5s', delay: '0.6s', colorIdx: 2 },
      { id: 3, left: '50%', top: '50%', angle: '22deg', dist: '430px', width: 'w-16', duration: '1.6s', delay: '0.15s', colorIdx: 0 },
      { id: 4, left: '50%', top: '50%', angle: '86deg', dist: '370px', width: 'w-14', duration: '1.65s', delay: '0.85s', colorIdx: 1 },
      { id: 5, left: '50%', top: '50%', angle: '148deg', dist: '420px', width: 'w-16', duration: '1.5s', delay: '0.45s', colorIdx: 2 },
    ],
  },
};

// Rank-Up Exclusive Signature: Twin War-Forge Aura Columns + Ascending Spartan Chevrons, Blades & Embers
const RANKUP_SIGNATURE_DATA: SparkChoreography = {
  sparks: [
    // Left War-Aura Helical Ascension
    { id: 0, left: '7%', top: '106%', mx: '38px', my: '-55vh', dx: '-16px', dy: '-114vh', srot: '0deg', mrot: '0deg', erot: '0deg', peakScale: 1.35, duration: '1.75s', delay: '0s', size: 20, shape: 'chevron', colorIdx: 0 },
    { id: 1, left: '14%', top: '106%', mx: '-34px', my: '-56vh', dx: '22px', dy: '-114vh', srot: '15deg', mrot: '135deg', erot: '265deg', peakScale: 1.25, duration: '2.0s', delay: '0.45s', size: 16, shape: 'ember', colorIdx: 2 },
    { id: 2, left: '21%', top: '106%', mx: '26px', my: '-55vh', dx: '-12px', dy: '-114vh', srot: '-10deg', mrot: '12deg', erot: '-6deg', peakScale: 1.3, duration: '1.85s', delay: '0.9s', size: 19, shape: 'bolt', colorIdx: 1 },
    // Right War-Aura Helical Ascension
    { id: 3, left: '93%', top: '106%', mx: '-38px', my: '-55vh', dx: '16px', dy: '-114vh', srot: '0deg', mrot: '0deg', erot: '0deg', peakScale: 1.35, duration: '1.8s', delay: '0.15s', size: 20, shape: 'chevron', colorIdx: 0 },
    { id: 4, left: '86%', top: '106%', mx: '34px', my: '-56vh', dx: '-22px', dy: '-114vh', srot: '-15deg', mrot: '-135deg', erot: '-265deg', peakScale: 1.25, duration: '2.05s', delay: '0.6s', size: 16, shape: 'ember', colorIdx: 3 },
    { id: 5, left: '79%', top: '106%', mx: '-26px', my: '-55vh', dx: '12px', dy: '-114vh', srot: '10deg', mrot: '-12deg', erot: '6deg', peakScale: 1.3, duration: '1.9s', delay: '1.05s', size: 19, shape: 'bolt', colorIdx: 1 },
    // Center-Flank Spear Blades
    { id: 6, left: '34%', top: '106%', mx: '-22px', my: '-56vh', dx: '14px', dy: '-114vh', srot: '-6deg', mrot: '6deg', erot: '0deg', peakScale: 1.25, duration: '1.7s', delay: '0.3s', size: 18, shape: 'blade', colorIdx: 0 },
    { id: 7, left: '66%', top: '106%', mx: '22px', my: '-56vh', dx: '-14px', dy: '-114vh', srot: '6deg', mrot: '-6deg', erot: '0deg', peakScale: 1.25, duration: '1.7s', delay: '0.8s', size: 18, shape: 'blade', colorIdx: 2 },
    // Horizontal Crimson-Gold Clash Across Rank Crest
    { id: 8, left: '-4%', top: '20%', mx: '54vw', my: '-10px', dx: '108vw', dy: '-20px', srot: '90deg', mrot: '90deg', erot: '90deg', peakScale: 1.2, duration: '1.75s', delay: '0.5s', size: 17, shape: 'blade', colorIdx: 0 },
    { id: 9, left: '104%', top: '24%', mx: '-54vw', my: '-10px', dx: '-108vw', dy: '-20px', srot: '-90deg', mrot: '-90deg', erot: '-90deg', peakScale: 1.2, duration: '1.8s', delay: '1.15s', size: 17, shape: 'blade', colorIdx: 1 },
  ],
  streaks: [
    { id: 0, left: '6%', top: '108%', angle: '-90deg', dist: '118vh', width: 'w-24', duration: '1.2s', delay: '0s', colorIdx: 0 },
    { id: 1, left: '13%', top: '108%', angle: '-87deg', dist: '118vh', width: 'w-20', duration: '1.35s', delay: '0.4s', colorIdx: 1 },
    { id: 2, left: '21%', top: '108%', angle: '-92deg', dist: '118vh', width: 'w-16', duration: '1.3s', delay: '0.8s', colorIdx: 2 },
    { id: 3, left: '94%', top: '108%', angle: '-90deg', dist: '118vh', width: 'w-24', duration: '1.25s', delay: '0.2s', colorIdx: 0 },
    { id: 4, left: '87%', top: '108%', angle: '-93deg', dist: '118vh', width: 'w-20', duration: '1.4s', delay: '0.6s', colorIdx: 1 },
    { id: 5, left: '79%', top: '108%', angle: '-88deg', dist: '118vh', width: 'w-16', duration: '1.3s', delay: '1.0s', colorIdx: 2 },
    { id: 6, left: '-6%', top: '104%', angle: '-36deg', dist: '135vmax', width: 'w-24', duration: '1.5s', delay: '0.35s', colorIdx: 0 },
    { id: 7, left: '106%', top: '104%', angle: '-144deg', dist: '135vmax', width: 'w-24', duration: '1.55s', delay: '0.75s', colorIdx: 1 },
  ],
};

// Grounded War-Forge & Testosterone-Boost Palettes (Crimson, Molten Amber, Gunmetal Steel)
const RANKUP_SPARK_COLORS = ['text-amber-600', 'text-red-700', 'text-slate-900', 'text-orange-600'];
const NORMAL_SPARK_COLORS = ['text-red-700', 'text-amber-600', 'text-slate-800', 'text-orange-700'];

const RANKUP_STREAK_GRADIENTS = [
  'bg-gradient-to-r from-transparent via-amber-500/90 to-red-600',
  'bg-gradient-to-r from-transparent via-slate-700/80 to-amber-500',
  'bg-gradient-to-r from-transparent via-red-600/85 to-amber-400',
];
const NORMAL_STREAK_GRADIENTS = [
  'bg-gradient-to-r from-transparent via-red-600/85 to-orange-500',
  'bg-gradient-to-r from-transparent via-slate-600/80 to-slate-900',
  'bg-gradient-to-r from-transparent via-amber-600/85 to-red-700',
];

const renderSparkShape = (shape: SparkShape, size: number) => {
  switch (shape) {
    case 'blade':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="currentColor"
          className="drop-shadow-[0_0_4px_currentColor]"
        >
          <path d="M12 1L16.5 13L12 23L7.5 13L12 1Z" />
        </svg>
      );
    case 'bolt':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="currentColor"
          className="drop-shadow-[0_0_5px_currentColor]"
        >
          <path d="M14 1L4 13.5H11L9.5 23L20 10H13L14 1Z" />
        </svg>
      );
    case 'chevron':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="currentColor"
          className="drop-shadow-[0_0_4px_currentColor]"
        >
          <path d="M12 3L21 12.5L17.5 16L12 10.5L6.5 16L3 12.5L12 3ZM12 12L19 19L16 21.5L12 17.5L8 21.5L5 19L12 12Z" />
        </svg>
      );
    case 'ember':
    default:
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="currentColor"
          className="drop-shadow-[0_0_4px_currentColor]"
        >
          <path d="M13.5 1.5L18.5 7.5L16 14.5L20 18.5L11 22.5L6.5 16L3.5 11.5L8.5 5.5L13.5 1.5Z" />
        </svg>
      );
  }
};

const EnergySparksLayer: React.FC<{
  variant: 'rankup' | 'normal';
  normalPreset?: NormalSparkPreset;
}> = React.memo(({ variant, normalPreset = 'ceiling-cascade' }) => {
  const isRankUp = variant === 'rankup';
  const choreography = isRankUp ? RANKUP_SIGNATURE_DATA : NORMAL_PRESET_DATA[normalPreset];
  const sparkColors = isRankUp ? RANKUP_SPARK_COLORS : NORMAL_SPARK_COLORS;
  const streakGradients = isRankUp ? RANKUP_STREAK_GRADIENTS : NORMAL_STREAK_GRADIENTS;

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden z-[5]"
      aria-hidden="true"
    >
      {/* Signature Rank-Up Rising Forge-Aura Columns */}
      {isRankUp && (
        <>
          <div className="absolute inset-y-0 left-0 w-24 sm:w-40 bg-gradient-to-r from-amber-500/25 via-red-500/10 to-transparent animate-rankup-pillar" />
          <div
            className="absolute inset-y-0 right-0 w-24 sm:w-40 bg-gradient-to-l from-red-600/20 via-amber-500/10 to-transparent animate-rankup-pillar"
            style={{ animationDelay: '1.1s' }}
          />
        </>
      )}

      {/* Tapered Ballistic/Slash Energy Streaks for Selected Preset */}
      {choreography.streaks.map((streak) => (
        <span
          key={`streak-${streak.id}`}
          className={`block absolute h-[3px] animate-energy-streak ${streak.width} ${
            streakGradients[streak.colorIdx % streakGradients.length]
          }`}
          style={
            {
              left: streak.left,
              top: streak.top,
              clipPath: 'polygon(0% 50%, 82% 0%, 100% 50%, 82% 100%)',
              '--angle': streak.angle,
              '--dist': streak.dist,
              animationDuration: streak.duration,
              animationDelay: streak.delay,
            } as React.CSSProperties
          }
        />
      ))}

      {/* Combat-Forged Ember, Blade, Bolt & Chevron Sparks for Selected Preset */}
      {choreography.sparks.map((spark) => {
        const colorClass = sparkColors[spark.colorIdx % sparkColors.length];
        return (
          <div
            key={`spark-${spark.id}`}
            className={`absolute animate-energy-spark ${colorClass}`}
            style={
              {
                left: spark.left,
                top: spark.top,
                '--mx': spark.mx,
                '--my': spark.my,
                '--dx': spark.dx,
                '--dy': spark.dy,
                '--srot': spark.srot,
                '--mrot': spark.mrot,
                '--erot': spark.erot,
                '--peak-scale': spark.peakScale,
                animationDuration: spark.duration,
                animationDelay: spark.delay,
              } as React.CSSProperties
            }
          >
            {renderSparkShape(spark.shape, spark.size)}
          </div>
        );
      })}
    </div>
  );
});

EnergySparksLayer.displayName = 'EnergySparksLayer';

const RewardOverlay: React.FC<RewardOverlayProps> = React.memo(
  ({ gifUrl, quote, xp, rankIndex, rewardDurationMs, onClose }) => {
    const isRankUp = rankIndex !== undefined;
    const rankDef = isRankUp ? RANKS[rankIndex] : null;
    const [crestImgFailed, setCrestImgFailed] = useState(false);
    const [normalSparkPreset] = useState<NormalSparkPreset>(() =>
      isRankUp ? 'ceiling-cascade' : popNextNormalSparkPreset()
    );

    useEffect(() => {
      setCrestImgFailed(false);
    }, [rankDef?.img]);

    if (isRankUp && rankDef) {
      return (
        <div
          className="fixed inset-0 z-[60] flex flex-col items-center justify-center bg-gradient-to-br from-stone-50/95 via-amber-50/85 to-slate-100/95 backdrop-blur-md p-4 overflow-hidden animate-rankup-backdrop"
          role="dialog"
          aria-modal="true"
          aria-label="Rank up reward notification"
        >
          {/* War-Forge Sunburst Rays & Expanding Impact Rings */}
          <div
            className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden"
            aria-hidden="true"
          >
            <div className="absolute -top-24 -left-24 w-[440px] h-[440px] rounded-full bg-amber-300/35 blur-3xl animate-normal-orb" />
            <div className="absolute -bottom-24 -right-24 w-[460px] h-[460px] rounded-full bg-red-300/25 blur-3xl animate-normal-orb-alt" />
            <div
              className="w-[760px] h-[760px] rounded-full opacity-55 animate-rankup-sunburst"
              style={{
                background:
                  'conic-gradient(from 0deg, rgba(217,119,6,0.22) 0deg 15deg, transparent 15deg 45deg, rgba(220,38,38,0.14) 45deg 60deg, transparent 60deg 90deg, rgba(217,119,6,0.22) 90deg 105deg, transparent 105deg 135deg, rgba(51,65,85,0.12) 135deg 150deg, transparent 150deg 180deg, rgba(217,119,6,0.22) 180deg 195deg, transparent 195deg 225deg, rgba(220,38,38,0.14) 225deg 240deg, transparent 240deg 270deg, rgba(217,119,6,0.22) 270deg 285deg, transparent 285deg 315deg, rgba(51,65,85,0.12) 315deg 330deg, transparent 330deg 360deg)',
                maskImage: 'radial-gradient(circle, rgba(0,0,0,0.9) 15%, transparent 68%)',
                WebkitMaskImage: 'radial-gradient(circle, rgba(0,0,0,0.9) 15%, transparent 68%)',
              }}
            />
            <div className="absolute w-72 h-72 rounded-full border-2 border-amber-500/55 animate-rankup-ring" />
            <div className="absolute w-72 h-72 rounded-full border-2 border-red-600/40 animate-rankup-ring-delayed" />
          </div>

          {/* Rank-Up Signature Energy Sparks */}
          <EnergySparksLayer variant="rankup" />

          {/* Prestige Showcase Header */}
          <div className="mb-5 sm:mb-7 text-center z-10 relative max-w-2xl w-full px-2 flex flex-col items-center">
            {/* Shrapnel Sparks + New Rank Crest Portrait */}
            <div className="relative mb-3 flex items-center justify-center">
              <div
                className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                aria-hidden="true"
              >
                {RANKUP_SPARKS.map((spark) => (
                  <span
                    key={spark.id}
                    className={`block absolute animate-victory-confetti ${spark.color} ${spark.size}`}
                    style={
                      {
                        clipPath: 'polygon(50% 0%, 100% 45%, 65% 100%, 0% 60%)',
                        '--tx': spark.tx,
                        '--ty': spark.ty,
                        '--rot': spark.rot,
                        animationDelay: spark.delay,
                      } as React.CSSProperties
                    }
                  />
                ))}
              </div>

              <div className="relative animate-rankup-crest">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden bg-white p-1 border-2 border-amber-500 shadow-[0_10px_28px_rgba(180,83,9,0.28)] flex items-center justify-center">
                  <div className="w-full h-full rounded-xl overflow-hidden bg-slate-100 flex items-center justify-center">
                    {!crestImgFailed ? (
                      <img
                        src={rankDef.img}
                        alt={rankDef.name}
                        referrerPolicy="no-referrer"
                        onError={() => setCrestImgFailed(true)}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Crown size={28} className="text-amber-600" />
                    )}
                  </div>
                </div>
                <div
                  className="absolute -top-2.5 -right-2.5 w-8 h-8 rounded-full bg-amber-500 text-slate-950 border-2 border-white shadow-md flex items-center justify-center animate-victory-trophy"
                  aria-hidden="true"
                >
                  <Crown size={15} strokeWidth={2.5} />
                </div>
              </div>
            </div>

            {/* Ascending XP Callout */}
            <div className="animate-normal-xp-float mb-2.5 sm:mb-3">
              <div className="animate-rankup-xp inline-flex items-center justify-center">
                {xp > 0 ? (
                  <span className="text-5xl sm:text-7xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-red-600 to-slate-900 animate-rankup-gradient drop-shadow-[0_6px_18px_rgba(185,28,28,0.2)] tabular-nums">
                    +{xp} XP
                  </span>
                ) : (
                  <span className="text-4xl sm:text-6xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-red-600 to-slate-900 animate-rankup-gradient drop-shadow-[0_6px_18px_rgba(185,28,28,0.2)]">
                    BOARD COMPLETE
                  </span>
                )}
              </div>
            </div>

            {/* Forged Stone & Gold Rank Banner */}
            <div className="animate-rankup-banner">
              <div className="relative inline-flex items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-r from-white via-amber-50/85 to-white border border-amber-400/85 px-6 py-3 shadow-[0_14px_38px_rgba(180,83,9,0.16),0_4px_14px_rgba(15,23,42,0.08)]">
                <div
                  className="pointer-events-none absolute inset-0 opacity-50"
                  aria-hidden="true"
                >
                  <div className="w-1/2 h-full bg-gradient-to-r from-transparent via-amber-200/50 to-transparent animate-victory-shimmer" />
                </div>

                <div className="relative z-10 flex items-center gap-2.5 text-lg sm:text-2xl font-black uppercase tracking-wide text-slate-900">
                  <span className="text-slate-600">NEW RANK:</span>
                  <span className={`${rankDef.color} drop-shadow-[0_1px_1px_rgba(15,23,42,0.18)]`}>
                    {rankDef.name}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Framed Prestige GIF Stage */}
          <div className="relative z-10 w-auto max-w-5xl max-h-[56vh] rounded-3xl bg-white p-1.5 sm:p-2 border-2 border-amber-400/85 shadow-[0_24px_60px_rgba(180,83,9,0.18),0_10px_28px_rgba(15,23,42,0.12)] animate-rankup-media">
            <div className="relative w-full h-full rounded-2xl overflow-hidden bg-slate-100">
              <div className="relative w-full h-full flex justify-center items-center">
                {gifUrl && (
                  <img
                    src={gifUrl}
                    alt="Rank Up Reward"
                    referrerPolicy="no-referrer"
                    className="w-auto h-auto max-h-[50vh] object-contain"
                  />
                )}
              </div>

              <div className="w-full h-1.5 bg-slate-200 overflow-hidden" aria-hidden="true">
                <div
                  className="h-full animate-reward-countdown bg-gradient-to-r from-amber-500 via-red-600 to-slate-800"
                  style={{ animationDuration: `${rewardDurationMs}ms` }}
                />
              </div>
            </div>
          </div>

          {/* Skip Button */}
          <button
            onClick={onClose}
            className="relative z-10 mt-5 sm:mt-7 min-h-[44px] px-6 py-2.5 rounded-xl bg-white hover:bg-amber-50 text-slate-800 hover:text-slate-950 font-bold uppercase tracking-widest text-xs sm:text-sm border border-amber-400/90 shadow-sm transition-all active:scale-95 flex items-center gap-2 whitespace-nowrap animate-rankup-btn"
          >
            <span>Skip Reward</span>
            <FastForward size={15} />
          </button>
        </div>
      );
    }

    // Normal Reward: Steel, Crimson & Forge-Ember Aesthetic with Shuffled Directional Sparks
    return (
      <div
        className="fixed inset-0 z-[60] flex flex-col items-center justify-center bg-gradient-to-br from-slate-100/95 via-stone-100/95 to-zinc-200/95 backdrop-blur-md p-4 overflow-hidden animate-normal-backdrop"
        role="dialog"
        aria-modal="true"
        aria-label="Reward notification"
      >
        {/* Subtle Iron & Forge Ember Atmospheric Washes */}
        <div
          className="pointer-events-none absolute inset-0 overflow-hidden"
          aria-hidden="true"
        >
          <div className="absolute -top-24 -left-20 w-[420px] h-[420px] rounded-full bg-slate-300/45 blur-3xl animate-normal-orb" />
          <div className="absolute -bottom-24 -right-20 w-[440px] h-[440px] rounded-full bg-red-200/35 blur-3xl animate-normal-orb-alt" />
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full bg-amber-200/35 blur-3xl animate-normal-orb" />
        </div>

        {/* Shuffled War-Forge Energy Sparks Animation Version */}
        <EnergySparksLayer variant="normal" normalPreset={normalSparkPreset} />

        {/* Text Showcase */}
        <div className="mb-6 sm:mb-8 text-center z-10 relative max-w-2xl w-full px-2">
          <div className="animate-normal-xp-float mb-3 sm:mb-4">
            <div className="animate-normal-xp-bounce inline-flex items-center justify-center">
              {xp > 0 ? (
                <span className="text-6xl sm:text-8xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-red-700 to-amber-600 drop-shadow-[0_6px_18px_rgba(185,28,28,0.2)] tabular-nums">
                  +{xp} XP
                </span>
              ) : (
                <span className="text-5xl sm:text-7xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-red-700 to-amber-600 drop-shadow-[0_6px_18px_rgba(185,28,28,0.2)]">
                  BOARD COMPLETE
                </span>
              )}
            </div>
          </div>

          {/* Crisp Steel-Trimmed Quote Card */}
          <div className="animate-normal-quote">
            <div className="relative inline-flex items-center justify-center overflow-hidden rounded-2xl bg-white/95 border border-slate-300/90 px-6 py-3 shadow-[0_12px_32px_rgba(15,23,42,0.1)]">
              <div className="relative z-10 flex items-center gap-2.5 text-lg sm:text-2xl font-extrabold uppercase tracking-wide text-slate-900">
                <Flame size={20} className="text-red-600 shrink-0" />
                <span>{quote}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Clean Steel-Framed GIF Card */}
        <div className="relative z-10 w-auto max-w-5xl max-h-[62vh] rounded-3xl bg-white p-1.5 sm:p-2 border border-slate-300/90 shadow-[0_22px_55px_rgba(15,23,42,0.16)] animate-normal-media">
          <div className="relative w-full h-full rounded-2xl overflow-hidden bg-slate-100">
            <div className="relative w-full h-full flex justify-center items-center">
              {gifUrl && (
                <img
                  src={gifUrl}
                  alt="Reward"
                  referrerPolicy="no-referrer"
                  className="w-auto h-auto max-h-[58vh] object-contain"
                />
              )}
            </div>

            {/* Auto-close Progress Bar */}
            <div className="w-full h-1.5 bg-slate-200 overflow-hidden" aria-hidden="true">
              <div
                className="h-full animate-reward-countdown bg-gradient-to-r from-slate-800 via-red-600 to-amber-500"
                style={{ animationDuration: `${rewardDurationMs}ms` }}
              />
            </div>
          </div>
        </div>

        {/* Skip Button */}
        <button
          onClick={onClose}
          className="relative z-10 mt-6 sm:mt-8 min-h-[44px] px-6 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-800 hover:text-slate-950 font-bold uppercase tracking-widest text-xs sm:text-sm border border-slate-300 shadow-sm transition-all active:scale-95 flex items-center gap-2 whitespace-nowrap animate-normal-btn"
        >
          <span>Skip Reward</span>
          <FastForward size={15} />
        </button>
      </div>
    );
  }
);

RewardOverlay.displayName = 'RewardOverlay';

export default RewardOverlay;
