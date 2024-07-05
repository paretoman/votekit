
export default function binarySearch(f,value,low,high,tol) {

    if (value > f(high) ) {
        console.log('out of bounds')
        return high
    }
    if (value < f(low)) {
        console.log('out of bounds')
        return low
    }
    let c = 0
    let mid
    while (low <= high && c < 30) { // 10^9 ~= 2^30
        c = c + 1
        mid = (low + high) * .5
        const fmid = f(mid)
        if (value + tol < fmid) high = mid
        else if (value - tol > fmid) low = mid
        else break
    }
    return mid
}