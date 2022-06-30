const BarData = [
  {
    day: "mon",
    amount: 17.45,
  },
  {
    day: "tue",
    amount: 34.91,
  },
  {
    day: "wed",
    amount: 52.36,
  },
  {
    day: "thu",
    amount: 31.07,
  },
  {
    day: "fri",
    amount: 23.39,
  },
  {
    day: "sat",
    amount: 43.28,
  },
  {
    day: "sun",
    amount: 25.48,
  },
]

var svgWidth = 350,
  svgHeight = 200
var barPadding = 20
// var barWidth = svgWidth / BarData.length
var barWidth = 50

var svg = document.getElementById("bar-js")
svg.setAttribute("width", svgWidth)
svg.setAttribute("height", svgHeight)

const max = BarData.reduce(function (prev, current, index) {
  return prev.amount > current.amount ? prev : current
})

const checkMax = () => {
  if (BarData.amount === max.amount) {
    return rect.setAttribute("fill", "#020202")
  }
}

BarData.filter(checkMax)

BarData.map((bar, ind) => {
  // text display
  let text = document.createElementNS("http://www.w3.org/2000/svg", "text")
  let hovertext = document.createElementNS("http://www.w3.org/2000/svg", "text")
  text.setAttribute("y", svgHeight - bar.amount - 20)
  text.setAttribute("fill", "#000")
  var textTrans = bar.amount + 20
  var translate1 = [barWidth * ind, textTrans]
  text.setAttribute("transform", "translate(" + translate1 + ")")
  text.textContent = bar.day
  text.setAttribute("class", "dayText")

  // rect bars
  let rect = document.createElementNS("http://www.w3.org/2000/svg", "rect")
  rect.setAttribute("y", svgHeight - bar.amount - 20)
  rect.setAttribute("height", bar.amount + 20)
  rect.setAttribute("width", barWidth - barPadding)
  if (max.amount === bar.amount) {
    rect.setAttribute("fill", "hsl(186, 34%, 60%)")
  } else {
    rect.setAttribute("fill", "hsl(10, 79%, 65%)")
  }
  rect.setAttribute("rx", "5px")
  rect.setAttribute("class", "barHover")
  var translate = [barWidth * ind, -15]
  rect.setAttribute("transform", "translate(" + translate + ")")
  rect.setAttribute("data-ammount", bar.amount)

  // hover text creation
  hovertext.setAttribute("y", svgHeight - bar.amount - 20)
  hovertext.setAttribute("fill", "#000")
  hovertext.setAttribute("class", "hoverText")
  var translate1 = [barWidth * ind, -35]
  hovertext.setAttribute("transform", "translate(" + translate1 + ")")
  hovertext.textContent = bar.amount

  svg.appendChild(rect)
  svg.appendChild(text)
  svg.appendChild(hovertext)
})

const bars = document.querySelectorAll(".barHover")

bars.forEach((bar, index) => {
  bar.addEventListener("mouseover", amountHover)
  bar.addEventListener("mouseout", amountOut)
})

function amountHover(e) {
  e.currentTarget.setAttribute("fill", "hsl(10, 100%, 76%)")
}

function amountOut(e) {
  if (max.amount == e.target.attributes[7].value) {
    e.currentTarget.setAttribute("fill", "hsl(186, 34%, 60%)")
  } else {
    e.currentTarget.setAttribute("fill", "hsl(10, 79%, 65%)")
  }
}
