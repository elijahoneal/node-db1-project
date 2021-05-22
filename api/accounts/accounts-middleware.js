const Accounts = require('../accounts/accounts-model')

exports.checkAccountPayload = (req, res, next) => {
  // DO YOUR MAGIC
  const account = req.body
  if(!account.name || !account.budget) {
    res.status(400).json({ message: "name and budget are required" })
  } else if(typeof account.name != 'string' ){
    res.json({ message: "name of account must be a string" })
  } else if(account.name.trim() < 3 || account.name.trim() > 100){
    res.json({ message: "name of account must be between 3 and 100" })
  } else if(typeof account.budget != 'number'){
    res.json({ message: "budget of account must be a number" })
  } else if(account.budget < 0 || account.budget > 1000000){
    res.json({ message: "budget of account is too large or too small" })
  } else {
    next()
  }
}

exports.checkAccountNameUnique = (req, res, next) => {
  // DO YOUR MAGIC
  const {name} = req.body
  if(name){
    res.status(400).json({ message: "that name is taken" })
  } else {
    req.name = name.trim()
    next()
  }
}

exports.checkAccountId = async (req, res, next) => {
  // DO YOUR MAGIC
  const account = await Accounts.getById(req.params.id)
  if(!account){
    res.status(404).json({ message: "account not found" })
  } else { 
    req.account = account 
    next()
  }
  
}
