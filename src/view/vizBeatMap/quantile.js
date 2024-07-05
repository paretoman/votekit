import binarySearch from "./binarySearch.js"
import circleCDF from "./circleCDF.js"
import { normCDF } from "@paretoman/votekit-utilities"

const invSqrt8 = 1 / Math.sqrt(8)

/**
 * Take a list of distributions and find the quantile for a probability.
 * @param {number[]} ms - Means
 * @param {number[]} w - widths of distributions
 * @param {number[]} d - distribution types, 1 or 2
 * @param {number[]} ma - max density of distribution, scales the distribution
 * @param {number} p - probability, between 0 and 1
 * @returns {number} q - quantile
 */
export default function quantile(ms,w,d,ma,p) {
    // const q = quantile2(v,w,d,m,p) {

    // console.log({ms,rs,d,ma,q})
    const n = ms.length
    const sma = sum(ma)
    const cdf = (x) => {
        let s = 0
        for (let i = 0; i < n; i++) {
            if (d[i] === 2){
                s = s + normCDF(x,ms[i],w[i] * invSqrt8) * ma[i]
            } else {
                s = s + circleCDF(x,ms[i],w[i] * .5) * ma[i]
            }
        }
        return s/sma
    }
    const highs = range(n).map((i)=>ms[i] + w[i] * invSqrt8 * 3)
    const lows = range(n).map((i)=>ms[i] - w[i] * invSqrt8 * 3)
    const high = Math.max(...highs)
    const low = Math.min(...lows)
    // console.log({low,high})
    const tol = .001
    const q = binarySearch(cdf,p,low,high,tol)
    // console.log(p,cdf(q))
    return q
}

function range(n) {
    return [...Array(n).keys()]
}

function sum(a) {
    const n = a.length
    let s = 0
    for (let i = 0; i < n; i++) {
        s = s + a[i]
    }
    return s
}