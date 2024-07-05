import quantile from "./quantile.js"

export default function bMap(vx,vy,d,w,m,cx,cy,p) {
    const N = 200

    // N points for pn probabilities
    const pn = p.length
    const cn = cx.length
    const vn = vx.length
    const bm = {
        x:create3DArray(cn,pn,N),
        y:create3DArray(cn,pn,N)
    }

    for (let i = 0; i < N; i++) {
        const angle = i / N * Math.PI * 2
        const dx = Math.cos(angle)
        const dy = Math.sin(angle)
        const v = new Array(vn)
        
        // reuse projection for all cans
        for (let j = 0; j < vn; j++) {
            v[j] = dx * vx[j] + dy * vy[j]
        }
        for (let j = 0; j < pn; j++) {
            const q = quantile(v,w,d,m,p[j])
            for (let k = 0; k < cn; k++) {
                const c = dx * cx[k] + dy * cy[k]
                const dist = 2 * Math.min(0,q - c)
                bm.x[k][j][i] = cx[k] + dx * dist
                bm.y[k][j][i] = cy[k] + dy * dist
            }
        }
    }
    return bm
}

function create2DArray(m,n) {
    return Array.from(Array(m), () => new Array(n))
}

function create3DArray(m,n,p) {
    return Array.from(Array(m), () => create2DArray(n,p))
}