
lib = {
  host: process.env.HOST
  
  humanReadableCents: (amount) ->
    amount = amount.toString()
    first = amount.slice(0, amount.length-2)
    second = amount.slice amount.length-2
    return "$#{first}.#{second}"

}

module.exports = lib
