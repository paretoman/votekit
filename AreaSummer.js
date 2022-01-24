

export default function AreaSummer(cans) {
    // Sum area of voter distributions to tally the votes
	
    let self = this

    let lines = findLines(cans)

	// todo: figure out if this is really just a function rather than a class.

    self.sumArea = function(voterGroup) {
        // draw lines across shape of voterGroup
        
		let n = lines.length
		let area = Array(n)
		for (let i = 0; i < n; i++) {
			let lineSet = lines[i]
			// return area for each candidate
			area[i] = sumCircle(voterGroup,lineSet)
		}
		return area
    }
}

function findLines(cans) {
        
	// find all lines
	let n = cans.length
	let lines = new Array(n) // each candidate has a set of lines for themselves
	for (let i = 0; i < n; i++) {
		lines[i] = []
		for (let k = 0; k < n; k++) {
			// skip sames
			if (i===k) continue
			// find equation for a line
			let c1 = cans[i].square
			let c2 = cans[k].square
			// lines[i][k] = equidistantLine(c1,c2) // problem when i === k
			lines[i].push(equidistantLine(c1,c2))
		}
	}

	return lines
}

function testEquidistantLine() {
	console.log(equidistantLine({x:0,y:0},{x:1,y:1})) // should be such that A * [0,0] < b
}

function equidistantLine(c1,c2) {
	
	// Ac < b
	// this is the condition that x counts for a candidate.

	// line equidistant from two points
	// https://math.stackexchange.com/a/771773

	// difference between points
	let dx = c2.x - c1.x
	let dy = c2.y - c1.y

	// midpoint between points
	let mx = (c1.x + c2.x) * .5
	let my = (c1.y + c2.y) * .5

	// equation for line
	// (y-my) / (x-mx) = - dx / dy
	// implies y * dy - my * dy = - x * dx + mx * dx
	// implies dx * x + dy * y = mx * dx + my * dy
	// rename to A = [dx;dy]
	//           b = mx * dx + my * dy
	let A = { x:dx , y:dy }
	let b = mx * dx + my * dy
	

	// is c1 or c2 closer?
	// c1 is closer is equivalent to Ac < b

	return {A,b}
}

function sumCircle(circle,lineSet) {


	// integrate inside 
	//   Need a direction for "inside" for each line.
	//   Then do a 1D consideration of what is inside.

	// for each x coordinate,
	let dx = 2
	let sum = 0
	let x1 = circle.handle.x
	let y1 = circle.handle.y
	let r = circle.r
	for (let x = -1000; x < 2000; x += dx) {

		// find bounds


		// find equation for circle

		// (y - y1)**2 + (x-x1)**2 < r**2
		let diff2 = r**2 - (x-x1)**2
		let half
		if (diff2 > 0) {
			half = Math.sqrt(diff2)
		} else {
			half = 0
		}
		let high = y1 + half
		let low = y1 - half

		// for each of the constraints, figure out if it is an upper or lower bound, then adjust the bound.
		// The y coefficient tells us whether this is an upper or lower bound.
		// Imagine infinite +y. 
		// If the y coefficient is negative, then Ac < b, and Ac = b is a lower bound.
		// A.x * x + A.y * y = b
		// y = (b - A.x * x) / A.y
		for (let line of lineSet) {
			let ay = line.A.y
			let ax = line.A.x
			let b = line.b
			if (ay === 0) {
				if (ax * x < b) {
					continue // no bounds
				} else {
					low = Infinity // bounded by x
				}
				// not handling 0,0 case
			} else {
				let y2 = (b - ax * x ) / ay
				if (ay < 0) {
					low = Math.max(low,y2)
				} else {
					high = Math.min(high,y2)
				}
			}
		}

		// count area inside lines
		let dy = high - low
		if (dy > 0) {
			let area = dy * dx
			sum += area
		}
	}
	return sum
}