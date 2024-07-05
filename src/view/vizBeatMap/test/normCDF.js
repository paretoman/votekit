import { erf } from "mathjs";

const invSqrt2 = Math.sqrt(2)

export default function normCDF(x,xs,ws) {
    const z = (x - xs) / ws
    return (1 + erf(z * invSqrt2)) * .5
}