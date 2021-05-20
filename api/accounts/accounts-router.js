const router = require('express').Router()
const Accounts = require('./accounts-model')
const { checkAccountPayload , checkAccountId, checkAccountNameUnique } = require('./accounts-middleware')
router.get('/', (req, res, next) => {
  // DO YOUR MAGIC
  Accounts.getAll()
  .then( allAccounts => res.status(200).json(allAccounts) )
  .catch(next(err))
})

router.get('/:id', checkAccountId, (req, res, next) => {
  // DO YOUR MAGIC
  Accounts.getById(req.params.id)
  .then( account => res.status(200).json(account) )
  .catch(next(err))
})

router.post('/', checkAccountPayload, checkAccountNameUnique, (req, res, next) => {
  // DO YOUR MAGIC
  Accounts.create(req.body)
  .then(newAccount => res.status(201).json(newAccount))
  .catch(next(err))
})

router.put('/:id', checkAccountId, (req, res, next) => {
  // DO YOUR MAGIC
  Accounts.updateById(req.params.id , req.body)
  .then( () => {
    return Accounts.getById(req.params.id)
  } )
  .catch(next(err))
});

router.delete('/:id', checkAccountId, (req, res, next) => {
  // DO YOUR MAGIC
  Accounts.deleteById(req.params.id)
  .then(account => res.status(200).json(account))
  .catch(next(err))
})

router.use((err, req, res, next) => { // eslint-disable-line
  // DO YOUR MAGIC
  res.status( err.status || 500 ).json({message: 'Something went wrong'})
})

module.exports = router;
