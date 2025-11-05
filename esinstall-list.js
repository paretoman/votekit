/* eslint-disable import/no-extraneous-dependencies */
import { install } from 'esinstall'

await install([
    // compute
    'd3-delaunay',
    'd3-polygon',
    'simplex-noise',
    'seedrandom',

    // all
    '@tweenjs/tween.js',
    '@mithrandirii/canvas2svg',
    'd3-contour',
    'd3-geo',
    'lz-string',
])
